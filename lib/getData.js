import { createClient } from '@supabase/supabase-js'
import config from '../config.js'

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY
} = config

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function getData () {
  const { data: groups, error } = await supabase
    .from('groups')
    .select('title, albums (title, year, is_highlighted, youtube, spotify, yes_no_wave, artists (name))')

  if (error) {
    throw error
  }

  return groups
}
