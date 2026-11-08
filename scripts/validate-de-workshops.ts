import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'
import { DE_CURRICULUM } from '@/data/de-curriculum'

// Checks the authored workshops and executes only their explicitly marked,
// self-contained Python examples. Existing infrastructure snippets are not run.
const errors: string[] = []
const allowPartial = process.argv.includes('--allow-partial')
const lessons = DE_CURRICULUM.flatMap(section => section.modules)
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'chaduvuko-de-workshops-'))
const titles = new Set<string>()
let workshops = 0
let examples = 0

function literal(node: ts.Node | undefined): string | undefined {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isJsxExpression(node)) return literal(node.expression)
  return undefined
}

for (const lesson of lessons) {
  const file = `content/data-engineering/${lesson.slug}.tsx`
  const source = fs.readFileSync(file, 'utf8')
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let count = 0
  let answers = 0
  const visit = (node: ts.Node) => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName.getText(tree)
      const attr = (key: string) => {
        const item = node.openingElement.attributes.properties.find(prop => ts.isJsxAttribute(prop) && prop.name.getText(tree) === key)
        return item && ts.isJsxAttribute(item) ? literal(item.initializer) : undefined
      }
      if (tag === 'DEWorkshop') {
        count++
        for (const key of ['title', 'objective', 'prerequisites']) {
          if (!attr(key)?.trim()) errors.push(`${lesson.slug}: missing authored ${key}`)
        }
        const title = attr('title') ?? ''
        if (titles.has(title)) errors.push(`${lesson.slug}: duplicate workshop title`)
        titles.add(title)
      }
      if (tag === 'WorkshopAnswer') answers++
      if (tag === 'WorkshopCode' && attr('expectedOutput') !== undefined) {
        const code = node.children.map(literal).filter(value => value !== undefined).join('')
        if (attr('language') !== 'python' || !code.trim()) {
          errors.push(`${lesson.slug}: executable example must contain literal Python`)
        } else {
          examples++
          try {
            const actual = execFileSync('python3', ['-I', '-c', code], {
              cwd: scratch, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024,
            }).trimEnd()
            const expected = attr('expectedOutput')!.trimEnd()
            if (actual !== expected) errors.push(`${lesson.slug}: output differs\nexpected: ${expected}\nactual: ${actual}`)
            if (lesson.slug === 'batch-pipeline-from-scratch') {
              const checks = execFileSync('python3', ['-I', path.join(process.cwd(), 'scripts/test-de-pipeline.py')], {
                input: code, cwd: scratch, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024,
              })
              process.stdout.write(checks)
            }
          } catch (error) {
            errors.push(`${lesson.slug}: example failed: ${error instanceof Error ? error.message : String(error)}`)
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(tree)
  if (count > 0) workshops++
  if ((!allowPartial || count > 0) && (count !== 1 || answers < 1)) {
    errors.push(`${lesson.slug}: expected one workshop and at least one worked answer; found ${count}/${answers}`)
  }
}

console.log(`Data Engineering: ${workshops}/${lessons.length} authored workshops; ${examples} Python examples executed`)
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log('Workshop checks passed. These checks validate structure and demonstrated outputs, not all prose or external infrastructure examples.')
}
