import fs from 'fs/promises'

const OUTPUT_PATH = 'README.md'
const TITLE = 'Nusantaracore'

export default async function generateMd (data) {
  const groups = data

  await fs.writeFile(OUTPUT_PATH, `# ${TITLE}\n\n`)

  for (const group of groups) {
    await fs.appendFile(OUTPUT_PATH, `## ${group.title}\n`)

    for (const album of group.albums) {
      let entry = `* ${album.title} `

      for (const [index, artist] of album.artists.entries()) {
        if (index === 0) {
          entry += '- '
        }

        entry += artist.name

        if (index < album.artists.length - 1) {
          entry += ','
        }

        entry += ' '
      }

      if (album.year) {
        entry += `(${album.year}) `
      }

      if (album.youtube) {
        entry += `[youtube](${album.youtube}) `
      }

      if (album.spotify) {
        entry += `[spotify](${album.spotify}) `
      }

      await fs.appendFile(OUTPUT_PATH, entry + '\n')
    }

    await fs.appendFile(OUTPUT_PATH, '\n')
  }

  return OUTPUT_PATH
}
