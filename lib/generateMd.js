import fs from 'fs/promises'
import config from '../config.js'

const { MD_OUPUT_PATH, DOCUMENT_TITLE } = config

export default async function generateMd (data) {
  const groups = data

  await fs.writeFile(MD_OUPUT_PATH, `# ${DOCUMENT_TITLE}\n\n`)

  for (const group of groups) {
    await fs.appendFile(MD_OUPUT_PATH, `## ${group.title}\n`)

    for (const album of group.albums) {
      let entry = '* '

      if (album.is_highlighted) entry += '**'
      entry += `${album.title} `

      for (const [index, artist] of album.artists.entries()) {
        if (index === 0) entry += '- '
        entry += artist.name
        if (index < album.artists.length - 1) entry += ','
      }

      if (album.year) entry += ` (${album.year})`
      if (album.is_highlighted) entry += '**'
      entry += ' '

      if (album.youtube) entry += `[youtube](${album.youtube}) `
      if (album.spotify) entry += `[spotify](${album.spotify}) `

      await fs.appendFile(MD_OUPUT_PATH, entry + '\n')
    }

    await fs.appendFile(MD_OUPUT_PATH, '\n')
  }

  let colophone = '&nbsp;\n&nbsp;\n&nbsp;\n'
  colophone += '### Curated by\n'
  colophone += 'Twitter: @fthrrhmn31  \n'
  colophone += 'Spotify: Aditya Fathurrahman \n'

  await fs.appendFile(MD_OUPUT_PATH, colophone)

  return MD_OUPUT_PATH
}
