export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string; // UUID
          title: string;
          goal: number;
          deadline: string; // Date as string
          wallet_id: string;
          story: string;
          description: string;
          cover_image_url: string | null;
          proof_image_urls: string[] | null;
          created_at: string; // Timestamp
        };
        Insert: {
          id?: string; // Auto-generated UUID
          title: string;
          goal: number;
          deadline: string;
          wallet_id: string;
          story: string;
          description: string;
          cover_image_url?: string | null;
          proof_image_urls?: string[] | null;
          created_at?: string; // Auto-generated timestamp
        };
        Update: {
          title?: string;
          goal?: number;
          deadline?: string;
          wallet_id?: string;
          story?: string;
          description?: string;
          cover_image_url?: string | null;
          proof_image_urls?: string[] | null;
        };
      };
      
      // ... other tables
    };
  };
};