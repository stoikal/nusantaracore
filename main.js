import 'dotenv/config'
import fs from 'fs/promises'
import { createClient } from '@supabase/supabase-js'

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY
} = process.env

const OUTPUT_FILENAME = 'README.md'
const TITLE = 'Nusantaracore'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

await fs.writeFile(OUTPUT_FILENAME, `# ${TITLE}\n\n`)

const { data: groups, error } = await supabase
  .from('groups')
  .select('title, albums (title, year, youtube, spotify, artists (name))')

if (!error) {
  for (const group of groups) {
    await fs.appendFile(OUTPUT_FILENAME, `## ${group.title}\n`)

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

      await fs.appendFile(OUTPUT_FILENAME, entry + '\n')
    }

    await fs.appendFile(OUTPUT_FILENAME, '\n')
  }
}
