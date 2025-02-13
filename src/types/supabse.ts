export type Database = {
    public: {
      Tables: {
        todos: {
          Row: {
            id: number
            title: string
            is_complete: boolean
            // ... other fields
          }
          // ... other todo table properties like Insert, Update
        }
        // ... other tables
      }
    }
  }