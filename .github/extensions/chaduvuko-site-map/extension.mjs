import http from 'node:http'
import { createCanvas, CanvasError, joinSession } from '@github/copilot-sdk/extension'
import { loadInventory, findRows } from './inventory.mjs'
import { PAGE_HTML } from './page.mjs'

const instances = new Map()

function startServer(state) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1')
      try {
        if (req.method !== 'GET') { res.writeHead(405).end(); return }
        if (url.pathname === '/') {
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }).end(PAGE_HTML)
        } else if (url.pathname === '/api/inventory') {
          res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify(await loadInventory()))
        } else if (url.pathname === '/api/focus') {
          res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }).end(JSON.stringify(state.focus))
        } else {
          res.writeHead(404).end('Not found')
        }
      } catch (error) {
        res.writeHead(500, { 'content-type': 'text/plain' }).end(String(error.message ?? error))
      }
    })
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolve(server))
  })
}

async function inventoryOrThrow() {
  try { return await loadInventory() } catch (error) { throw new CanvasError('inventory_unavailable', String(error.message ?? error)) }
}

const filterProps = {
  query: { type: 'string', description: 'Text matched against URL, track, module, and source file.' },
  kind: { type: 'string', description: 'Row kind, e.g. lesson, track-index, planned-track, roadmap, blog, career, hub.' },
  status: { type: 'string', description: 'Row status: live, hidden, soon, planned, preview, unregistered.' },
  track: { type: 'string', description: 'Track slug, e.g. cybersecurity.' },
}

const session = await joinSession({
  canvases: [
    createCanvas({
      id: 'chaduvuko-site-map',
      displayName: 'Chaduvuko Site Map',
      description: 'Interactive map of every Chaduvuko track, module, lesson, and page from the site inventory.',
      actions: [
        {
          name: 'get_summary',
          description: 'Return site totals and health-check issue counts from docs/chaduvuko/site-inventory.json.',
          handler: async () => {
            const { summary } = await inventoryOrThrow()
            return { generatedAt: summary.generatedAt, totals: summary.totals, issues: Object.fromEntries(Object.entries(summary.issues).map(([k, v]) => [k, v.length])) }
          },
        },
        {
          name: 'find_pages',
          description: 'List inventory rows matching filters (max 200).',
          inputSchema: { type: 'object', properties: filterProps, additionalProperties: false },
          handler: async ({ input }) => {
            const { rows } = await inventoryOrThrow()
            const matches = findRows(rows, input ?? {})
            return { count: matches.length, rows: matches.slice(0, 200).map(({ url, kind, track, section, status, words, sourceFile }) => ({ url, kind, track, section, status, words, sourceFile })) }
          },
        },
        {
          name: 'focus',
          description: 'Set the filters shown in the open canvas panel.',
          inputSchema: { type: 'object', properties: { query: filterProps.query, kind: filterProps.kind, status: filterProps.status, thinOnly: { type: 'boolean', description: 'Show only lessons under 400 words.' } }, additionalProperties: false },
          handler: async ({ instanceId, input: raw }) => {
            const input = raw ?? {}
            const state = instances.get(instanceId)
            if (!state) throw new CanvasError('not_open', 'Open the chaduvuko-site-map canvas first.')
            for (const key of ['query', 'kind', 'status']) if (input[key] !== undefined && typeof input[key] !== 'string') throw new CanvasError('invalid_input', `${key} must be a string`)
            state.focus = { version: state.focus.version + 1, query: input.query ?? '', kind: input.kind ?? '', status: input.status ?? '', thinOnly: Boolean(input.thinOnly) }
            return { ok: true, focus: state.focus }
          },
        },
      ],
      open: async ({ instanceId }) => {
        await inventoryOrThrow()
        let state = instances.get(instanceId)
        if (!state || !state.server.listening) {
          state = { focus: state?.focus ?? { version: 0, query: '', kind: '', status: '', thinOnly: false } }
          state.server = await startServer(state)
          instances.set(instanceId, state)
        }
        return { url: `http://127.0.0.1:${state.server.address().port}/`, title: 'Chaduvuko site map' }
      },
      onClose: async ({ instanceId }) => {
        const state = instances.get(instanceId)
        if (state) { instances.delete(instanceId); await new Promise(resolve => state.server.close(resolve)) }
      },
    }),
  ],
})

session.log?.('chaduvuko-site-map canvas ready')
