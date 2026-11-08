import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'
import { DE_CURRICULUM } from '@/data/de-curriculum'

interface Example { file: string; line: number; code: string }
const examples: Example[] = []

function literal(node: ts.Node | undefined): string | undefined {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isJsxExpression(node)) return literal(node.expression)
  return undefined
}

for (const lesson of DE_CURRICULUM.flatMap(section => section.modules)) {
  const file = `content/data-engineering/${lesson.slug}.tsx`
  const source = fs.readFileSync(file, 'utf8')
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const visit = (node: ts.Node) => {
    const opening = ts.isJsxElement(node) ? node.openingElement : ts.isJsxSelfClosingElement(node) ? node : null
    if (opening && ['CodeBox', 'CodeBlock', 'WorkshopCode'].includes(opening.tagName.getText(tree))) {
      const attr = (key: string) => {
        const item = opening.attributes.properties.find(prop => ts.isJsxAttribute(prop) && prop.name.getText(tree) === key)
        return item && ts.isJsxAttribute(item) ? literal(item.initializer) : undefined
      }
      const code = ts.isJsxElement(node)
        ? node.children.map(literal).filter(value => value !== undefined).join('')
        : attr('code')
      const language = attr('language') ?? attr('lang')
      const first = code?.split('\n').map(line => line.trim()).find(line => line && !line.startsWith('#')) ?? ''
      // Unlabeled snippets are included when their first statement clearly is Python.
      // Shell, SQL, console transcripts and non-literal template expressions are excluded.
      if (code && (language === 'python' || (!language && /^(?:import |from |def |class |@)/.test(first)))) {
        examples.push({ file, line: tree.getLineAndCharacterOfPosition(node.getStart()).line + 1, code })
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(tree)
}

// Parse without executing: these snippets can reference cloud services and optional packages.
const result = JSON.parse(execFileSync('python3', ['-I', '-c', [
  'import ast, json, sys',
  'examples = json.load(sys.stdin)',
  'errors = []',
  'for example in examples:',
  '    try:',
  '        ast.parse(example["code"])',
  '    except SyntaxError as error:',
  '        errors.append({"file": example["file"], "line": example["line"], "error": str(error)})',
  'print(json.dumps(errors))',
].join('\n')], { input: JSON.stringify(examples), encoding: 'utf8', maxBuffer: 1024 * 1024 })) as { file: string; line: number; error: string }[]

console.log(`Data Engineering code: ${examples.length} Python blocks checked for syntax`)
if (result.length) {
  for (const issue of result) console.error(`${issue.file}:${issue.line}: ${issue.error}`)
  process.exitCode = 1
} else {
  console.log('Python syntax checks passed; remote service behavior and optional dependencies were not executed.')
}
