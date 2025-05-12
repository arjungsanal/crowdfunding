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
          user_id: string; // Added user_id field
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
          user_id: string; // Added user_id field as required
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
          user_id?: string; // Added user_id field as optional for updates
        };
      };

      approved_campaigns: {
        Row: {
          id: string; // UUID
          campaign_id: string; // UUID
          withdrawal_status: string;
          amount_raised: number;
          created_at: string; // Timestamp
        };
        Insert: {
          id?: string; // Auto-generated UUID
          campaign_id: string; // UUID
          withdrawal_status: string;
          amount_raised: number;
          created_at?: string; // Auto-generated timestamp
        };
        Update: {
          campaign_id?: string; // UUID
          withdrawal_status: string;
          amount_raised?: number;
        };
      };
      
      // ... other tables
    };
  };
};