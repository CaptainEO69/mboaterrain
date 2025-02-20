
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
      }
      verification_codes: {
        Row: {
          id: string
          user_id: string
          email_code: string
          sms_code: string
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email_code: string
          sms_code: string
          expires_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email_code?: string
          sms_code?: string
          expires_at?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          phone_number: string | null
          birth_year: number | null
          is_certified: boolean | null
          service_prices: Json | null
          notary_office: string | null
          birth_place: string | null
          id_number: string | null
          profession: string | null
          residence_place: string | null
          sale_reason: string | null
          user_type: string
          created_at: string
          updated_at: string
          sale_proof_url: string | null
          is_email_verified: boolean
          is_phone_verified: boolean
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          phone_number?: string | null
          birth_year?: number | null
          is_certified?: boolean | null
          service_prices?: Json | null
          notary_office?: string | null
          birth_place?: string | null
          id_number?: string | null
          profession?: string | null
          residence_place?: string | null
          sale_reason?: string | null
          user_type: string
          created_at?: string
          updated_at?: string
          sale_proof_url?: string | null
          is_email_verified?: boolean
          is_phone_verified?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          phone_number?: string | null
          birth_year?: number | null
          is_certified?: boolean | null
          service_prices?: Json | null
          notary_office?: string | null
          birth_place?: string | null
          id_number?: string | null
          profession?: string | null
          residence_place?: string | null
          sale_reason?: string | null
          user_type?: string
          created_at?: string
          updated_at?: string
          sale_proof_url?: string | null
          is_email_verified?: boolean
          is_phone_verified?: boolean
        }
      }
    }
  }
}
