import 'dotenv/config'
import getData from './lib/getData.js'
import generateMd from './lib/generateMd.js'
import generateHtml from './lib/generateHtml.js'

const data = await getData()
const mdPath = await generateMd(data)
generateHtml(mdPath)
