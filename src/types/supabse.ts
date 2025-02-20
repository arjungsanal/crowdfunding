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
          beneficiary_name: string;
          hosted_by: string;
          relationship: string;
          approval_status: 'pending' | 'approved' | 'rejected';
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
          beneficiary_name: string;
          hosted_by: string;
          relationship: string;
          approval_status?: 'pending' | 'approved' | 'rejected';
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
          beneficiary_name?: string;
          hosted_by?: string;
          relationship?: string;
          approval_status?: 'pending' | 'approved' | 'rejected';
        };
      };
      
      // ... other tables
    };
  };
};