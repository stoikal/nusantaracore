import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY
} = process.env

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const result = await supabase.from('groups').select('*')
console.log('===~result~===', result)
