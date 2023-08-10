import fs from 'fs/promises'
import { rimraf } from 'rimraf'
import { read } from 'to-vfile'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeStringify from 'rehype-stringify'

const OUTPUT_DIR = 'build'

export default async function (mdPath) {
  await rimraf(OUTPUT_DIR)
  await fs.mkdir(OUTPUT_DIR)

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, {
      title: 'Nusantaracore',
      style: 'body { background: #0c0a09; color: white } '
    })
    .use(rehypeStringify)
    .process(await read(mdPath))

  fs.writeFile(OUTPUT_DIR + '/index.html', file.value)
}
