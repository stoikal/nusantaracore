import fs from 'fs/promises'
import { read } from 'to-vfile'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeStringify from 'rehype-stringify'
import config from '../config.js'

const { BUILD_DIR } = config

export default async function (mdPath) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, {
      title: 'Nusantaracore',
      style: 'body { background: #0c0a09; color: white } li { margin-bottom: 8px; } '
    })
    .use(rehypeStringify)
    .process(await read(mdPath))

  fs.writeFile(BUILD_DIR + '/index.html', file.value)
}
