import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY
} = process.env

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function getData () {
  const { data: groups, error } = await supabase
    .from('groups')
    .select('title, albums (title, year, youtube, spotify, artists (name))')

  if (error) {
    throw error
  }

  return groups
}
