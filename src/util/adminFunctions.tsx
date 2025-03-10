import { supabase } from "./supabse"

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