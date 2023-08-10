import 'dotenv/config'
import copyPublicFiles from './lib/copyPublicFiles.js'
import getData from './lib/getData.js'
import generateMd from './lib/generateMd.js'
import generateHtml from './lib/generateHtml.js'

await copyPublicFiles()
const data = await getData()
const mdPath = await generateMd(data)
generateHtml(mdPath)
