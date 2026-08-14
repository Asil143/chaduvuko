// Curated keyword/snippet completions for the Code Playground.
//
// Monaco ships a real language service (IntelliSense) only for JavaScript
// and TypeScript out of the box. For every other language the playground
// supports, this registers a lightweight completion provider — common
// keywords plus a handful of idiomatic snippets with tab-stops — the same
// approach lightweight online judges (HackerRank, LeetCode) use, since
// running real language servers server-side is out of scope here.

import type { Monaco } from '@monaco-editor/react'
import type { editor, languages, Position } from 'monaco-editor'

interface Item {
  label: string
  insertText: string
  detail?: string
  snippet?: boolean
}

const LANG_ITEMS: Record<string, Item[]> = {
  python: [
    { label: 'print', insertText: 'print(${1:value})', detail: 'print(value)', snippet: true },
    { label: 'def', insertText: 'def ${1:name}(${2:args}):\n\t$0', detail: 'function definition', snippet: true },
    { label: 'class', insertText: 'class ${1:Name}:\n\tdef __init__(self${2:, args}):\n\t\t$0', detail: 'class definition', snippet: true },
    { label: 'for', insertText: 'for ${1:item} in ${2:iterable}:\n\t$0', detail: 'for loop', snippet: true },
    { label: 'while', insertText: 'while ${1:condition}:\n\t$0', detail: 'while loop', snippet: true },
    { label: 'if', insertText: 'if ${1:condition}:\n\t$0', detail: 'if statement', snippet: true },
    { label: 'ifmain', insertText: 'if __name__ == "__main__":\n\t$0', detail: 'main guard', snippet: true },
    { label: 'try', insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as e:\n\t$0', detail: 'try/except', snippet: true },
    { label: 'import', insertText: 'import ${1:module}', snippet: true },
    { label: 'from', insertText: 'from ${1:module} import ${2:name}', snippet: true },
    { label: 'lambda', insertText: 'lambda ${1:args}: ${2:expr}', snippet: true },
    { label: 'listcomp', insertText: '[${1:expr} for ${2:item} in ${3:iterable}]', detail: 'list comprehension', snippet: true },
    { label: 'range', insertText: 'range(${1:stop})', snippet: true },
    { label: 'len', insertText: 'len(${1:obj})', snippet: true },
    { label: 'return', insertText: 'return ' },
    { label: 'elif', insertText: 'elif ' },
    { label: 'else', insertText: 'else:\n\t' },
  ],
  java: [
    { label: 'psvm', insertText: 'public static void main(String[] args) {\n\t$0\n}', detail: 'main method', snippet: true },
    { label: 'sout', insertText: 'System.out.println(${1});', detail: 'System.out.println', snippet: true },
    { label: 'class', insertText: 'public class ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', snippet: true },
    { label: 'foreach', insertText: 'for (${1:Type} ${2:item} : ${3:collection}) {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'trycatch', insertText: 'try {\n\t${1}\n} catch (${2:Exception} e) {\n\t$0\n}', snippet: true },
    { label: 'public', insertText: 'public ' },
    { label: 'private', insertText: 'private ' },
    { label: 'static', insertText: 'static ' },
    { label: 'ArrayList', insertText: 'ArrayList<${1:Type}> ${2:list} = new ArrayList<>();', snippet: true },
    { label: 'HashMap', insertText: 'HashMap<${1:K}, ${2:V}> ${3:map} = new HashMap<>();', snippet: true },
    { label: 'return', insertText: 'return ' },
    { label: 'import', insertText: 'import ' },
    { label: 'new', insertText: 'new ' },
  ],
  cpp: [
    { label: 'main', insertText: 'int main() {\n\t$0\n\treturn 0;\n}', detail: 'main function', snippet: true },
    { label: 'include', insertText: '#include <${1:iostream}>', snippet: true },
    { label: 'cout', insertText: 'std::cout << ${1} << std::endl;', snippet: true },
    { label: 'cin', insertText: 'std::cin >> ${1};', snippet: true },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'vector', insertText: 'std::vector<${1:int}> ${2:v};', snippet: true },
    { label: 'struct', insertText: 'struct ${1:Name} {\n\t$0\n};', snippet: true },
    { label: 'class', insertText: 'class ${1:Name} {\npublic:\n\t$0\n};', snippet: true },
    { label: 'using namespace std', insertText: 'using namespace std;' },
    { label: 'return', insertText: 'return ' },
    { label: 'const', insertText: 'const ' },
    { label: 'nullptr', insertText: 'nullptr' },
  ],
  c: [
    { label: 'main', insertText: 'int main() {\n\t$0\n\treturn 0;\n}', detail: 'main function', snippet: true },
    { label: 'include', insertText: '#include <${1:stdio.h}>', snippet: true },
    { label: 'printf', insertText: 'printf("${1:%d\\n}", ${2:value});', snippet: true },
    { label: 'scanf', insertText: 'scanf("${1:%d}", &${2:var});', snippet: true },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'struct', insertText: 'struct ${1:Name} {\n\t$0\n};', snippet: true },
    { label: 'malloc', insertText: 'malloc(${1:size})', snippet: true },
    { label: 'return', insertText: 'return ' },
    { label: 'const', insertText: 'const ' },
    { label: 'sizeof', insertText: 'sizeof(${1})', snippet: true },
  ],
  go: [
    { label: 'main', insertText: 'func main() {\n\t$0\n}', detail: 'main function', snippet: true },
    { label: 'func', insertText: 'func ${1:name}(${2:args}) ${3:returnType} {\n\t$0\n}', snippet: true },
    { label: 'fmt.Println', insertText: 'fmt.Println(${1})', snippet: true },
    { label: 'fmt.Printf', insertText: 'fmt.Printf("${1:%v\\n}", ${2:value})', snippet: true },
    { label: 'for', insertText: 'for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\t$0\n}', snippet: true },
    { label: 'forrange', insertText: 'for ${1:i}, ${2:v} := range ${3:collection} {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if ${1:condition} {\n\t$0\n}', snippet: true },
    { label: 'iferr', insertText: 'if err != nil {\n\t$0\n}', detail: 'error check', snippet: true },
    { label: 'struct', insertText: 'type ${1:Name} struct {\n\t$0\n}', snippet: true },
    { label: 'package', insertText: 'package ' },
    { label: 'import', insertText: 'import "${1:fmt}"', snippet: true },
    { label: 'var', insertText: 'var ${1:name} ${2:type}', snippet: true },
    { label: 'return', insertText: 'return ' },
    { label: 'make', insertText: 'make(${1:[]int}, ${2:0})', snippet: true },
  ],
  rust: [
    { label: 'main', insertText: 'fn main() {\n\t$0\n}', detail: 'main function', snippet: true },
    { label: 'fn', insertText: 'fn ${1:name}(${2:args}) ${3:-> ReturnType} {\n\t$0\n}', snippet: true },
    { label: 'println', insertText: 'println!("${1}");', snippet: true },
    { label: 'for', insertText: 'for ${1:item} in ${2:iterable} {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while ${1:condition} {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if ${1:condition} {\n\t$0\n}', snippet: true },
    { label: 'match', insertText: 'match ${1:value} {\n\t${2:pattern} => ${3:expr},\n\t_ => ${0:default},\n}', snippet: true },
    { label: 'struct', insertText: 'struct ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'impl', insertText: 'impl ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'let', insertText: 'let ${1:name} = ${2:value};', snippet: true },
    { label: 'letmut', insertText: 'let mut ${1:name} = ${2:value};', snippet: true },
    { label: 'vec', insertText: 'let ${1:v} = vec![${2}];', snippet: true },
    { label: 'return', insertText: 'return ' },
  ],
  shell: [
    { label: 'echo', insertText: 'echo "${1}"', snippet: true },
    { label: 'for', insertText: 'for ${1:i} in ${2:list}; do\n\t$0\ndone', snippet: true },
    { label: 'while', insertText: 'while ${1:condition}; do\n\t$0\ndone', snippet: true },
    { label: 'if', insertText: 'if [ ${1:condition} ]; then\n\t$0\nfi', snippet: true },
    { label: 'ifelse', insertText: 'if [ ${1:condition} ]; then\n\t${2}\nelse\n\t$0\nfi', snippet: true },
    { label: 'function', insertText: '${1:name}() {\n\t$0\n}', snippet: true },
    { label: 'shebang', insertText: '#!/bin/bash', detail: 'shebang line' },
    { label: 'read', insertText: 'read ${1:var}', snippet: true },
    { label: 'case', insertText: 'case ${1:var} in\n\t${2:pattern})\n\t\t$0\n\t\t;;\nesac', snippet: true },
    { label: 'export', insertText: 'export ' },
  ],
  ruby: [
    { label: 'puts', insertText: 'puts ${1}', snippet: true },
    { label: 'def', insertText: 'def ${1:name}(${2:args})\n\t$0\nend', snippet: true },
    { label: 'class', insertText: 'class ${1:Name}\n\t$0\nend', snippet: true },
    { label: 'for', insertText: 'for ${1:item} in ${2:collection}\n\t$0\nend', snippet: true },
    { label: 'each', insertText: '${1:collection}.each do |${2:item}|\n\t$0\nend', snippet: true },
    { label: 'while', insertText: 'while ${1:condition}\n\t$0\nend', snippet: true },
    { label: 'if', insertText: 'if ${1:condition}\n\t$0\nend', snippet: true },
    { label: 'unless', insertText: 'unless ${1:condition}\n\t$0\nend', snippet: true },
    { label: 'require', insertText: "require '${1}'", snippet: true },
    { label: 'return', insertText: 'return ' },
    { label: 'attr_accessor', insertText: 'attr_accessor :${1:name}', snippet: true },
  ],
  php: [
    { label: 'echo', insertText: 'echo "${1}";', snippet: true },
    { label: 'function', insertText: 'function ${1:name}(${2:args}) {\n\t$0\n}', snippet: true },
    { label: 'class', insertText: 'class ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'for', insertText: 'for ($${1:i} = 0; $${1:i} < ${2:n}; $${1:i}++) {\n\t$0\n}', snippet: true },
    { label: 'foreach', insertText: 'foreach ($${1:array} as $${2:item}) {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'array', insertText: '$${1:arr} = [${2}];', snippet: true },
    { label: 'require', insertText: "require '${1}';", snippet: true },
    { label: 'return', insertText: 'return ' },
    { label: 'phpopen', insertText: '<?php', detail: 'opening tag' },
  ],
  swift: [
    { label: 'print', insertText: 'print(${1})', snippet: true },
    { label: 'func', insertText: 'func ${1:name}(${2:args}) ${3:-> ReturnType} {\n\t$0\n}', snippet: true },
    { label: 'class', insertText: 'class ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'struct', insertText: 'struct ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'for', insertText: 'for ${1:item} in ${2:collection} {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while ${1:condition} {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if ${1:condition} {\n\t$0\n}', snippet: true },
    { label: 'guard', insertText: 'guard ${1:condition} else {\n\t$0\n}', snippet: true },
    { label: 'let', insertText: 'let ${1:name} = ${2:value}', snippet: true },
    { label: 'var', insertText: 'var ${1:name} = ${2:value}', snippet: true },
    { label: 'import', insertText: 'import ' },
    { label: 'return', insertText: 'return ' },
  ],
  kotlin: [
    { label: 'main', insertText: 'fun main() {\n\t$0\n}', detail: 'main function', snippet: true },
    { label: 'fun', insertText: 'fun ${1:name}(${2:args}): ${3:ReturnType} {\n\t$0\n}', snippet: true },
    { label: 'println', insertText: 'println(${1})', snippet: true },
    { label: 'class', insertText: 'class ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'for', insertText: 'for (${1:item} in ${2:collection}) {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'val', insertText: 'val ${1:name} = ${2:value}', snippet: true },
    { label: 'var', insertText: 'var ${1:name} = ${2:value}', snippet: true },
    { label: 'when', insertText: 'when (${1:value}) {\n\t${2:pattern} -> ${3:expr}\n\telse -> ${0:default}\n}', snippet: true },
    { label: 'return', insertText: 'return ' },
  ],
  csharp: [
    { label: 'main', insertText: 'static void Main() {\n\t$0\n}', detail: 'main method', snippet: true },
    { label: 'class', insertText: 'class ${1:Name} {\n\t$0\n}', snippet: true },
    { label: 'console', insertText: 'Console.WriteLine(${1});', snippet: true },
    { label: 'for', insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', snippet: true },
    { label: 'foreach', insertText: 'foreach (var ${1:item} in ${2:collection}) {\n\t$0\n}', snippet: true },
    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', snippet: true },
    { label: 'trycatch', insertText: 'try {\n\t${1}\n} catch (${2:Exception} e) {\n\t$0\n}', snippet: true },
    { label: 'List', insertText: 'List<${1:Type}> ${2:list} = new List<${1:Type}>();', snippet: true },
    { label: 'using', insertText: 'using ' },
    { label: 'public', insertText: 'public ' },
    { label: 'return', insertText: 'return ' },
  ],
  sql: [
    { label: 'sel', insertText: 'SELECT ${1:*} FROM ${2:table}', detail: 'SELECT statement', snippet: true },
    { label: 'selwhere', insertText: 'SELECT ${1:*} FROM ${2:table}\nWHERE ${3:condition}', snippet: true },
    { label: 'insert', insertText: 'INSERT INTO ${1:table} (${2:columns})\nVALUES (${3:values})', snippet: true },
    { label: 'update', insertText: 'UPDATE ${1:table}\nSET ${2:column} = ${3:value}\nWHERE ${4:condition}', snippet: true },
    { label: 'delete', insertText: 'DELETE FROM ${1:table}\nWHERE ${2:condition}', snippet: true },
    { label: 'create', insertText: 'CREATE TABLE ${1:table} (\n\t${2:column} ${3:TYPE}\n)', snippet: true },
    { label: 'join', insertText: 'JOIN ${1:table} ON ${2:condition}', snippet: true },
    { label: 'groupby', insertText: 'GROUP BY ${1:column}', snippet: true },
    { label: 'orderby', insertText: 'ORDER BY ${1:column} ${2:ASC}', snippet: true },
    { label: 'SELECT', insertText: 'SELECT ' },
    { label: 'FROM', insertText: 'FROM ' },
    { label: 'WHERE', insertText: 'WHERE ' },
  ],
}

const registered = new Set<Monaco>()

export function registerPlaygroundCompletions(monaco: Monaco): void {
  if (registered.has(monaco)) return
  registered.add(monaco)

  for (const [lang, items] of Object.entries(LANG_ITEMS)) {
    monaco.languages.registerCompletionItemProvider(lang, {
      provideCompletionItems(model: editor.ITextModel, position: Position) {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }
        const suggestions: languages.CompletionItem[] = items.map(item => ({
          label: item.label,
          kind: item.snippet
            ? monaco.languages.CompletionItemKind.Snippet
            : monaco.languages.CompletionItemKind.Keyword,
          detail: item.detail,
          insertText: item.insertText,
          insertTextRules: item.snippet
            ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            : undefined,
          range,
        }))
        return { suggestions }
      },
    })
  }
}
