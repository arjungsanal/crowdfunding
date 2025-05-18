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
          proof_image_urls: string[] ;
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

      reports: {
        Row: {
          id: string; // UUID
          campaign_id: string; // UUID, foreign key to campaigns table
          reason: 'suspicious_activity' | 'inappropriate_content' | 'false_information' | 'harmful_behavior' | 'privacy_violation' | 'other';
          details: string | null;
          reported_by: string; // UUID of the user who reported
          created_at: string; // Timestamp
          updated_at: string; // Timestamp
          resolved: boolean;
          resolved_at: string | null; // Timestamp when resolved
          resolved_by: string | null; // UUID of admin who resolved
          resolution_notes: string | null;
        };
        Insert: {
          id?: string; // Auto-generated UUID
          campaign_id: string;
          reason: 'suspicious_activity' | 'inappropriate_content' | 'false_information' | 'harmful_behavior' | 'privacy_violation' | 'other';
          details?: string | null;
          reported_by: string;
          created_at?: string; // Auto-generated timestamp
          updated_at?: string; // Auto-generated timestamp
          resolved?: boolean; // Defaults to false
          resolved_at?: string | null;
          resolved_by?: string | null;
          resolution_notes?: string | null;
        };
        Update: {
          campaign_id?: string;
          reason?: 'suspicious_activity' | 'inappropriate_content' | 'false_information' | 'harmful_behavior' | 'privacy_violation' | 'other';
          details?: string | null;
          reported_by?: string;
          resolved?: boolean;
          resolved_at?: string | null;
          resolved_by?: string | null;
          resolution_notes?: string | null;
          // Note: updated_at is handled automatically by the trigger
        };
      };
      
      // ... other tables
    };
  };
};