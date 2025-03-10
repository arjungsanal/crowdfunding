import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabse'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export // Function to fetch all data from a table
async function fetchAllFromTable(tableName: any) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
  
  if (error) {
    console.error('Error fetching data:', error)
    return null
  }
  
  return data
}