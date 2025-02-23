export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          created_at: string
          id: string
          name: string
          region_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          region_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          property_id: string | null
          read: boolean | null
          receiver_id: string
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          property_id?: string | null
          read?: boolean | null
          receiver_id: string
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          property_id?: string | null
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          city_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          city_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          city_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "neighborhoods_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birth_place: string | null
          birth_year: number | null
          created_at: string
          full_name: string | null
          id: string
          id_number: string | null
          is_certified: boolean | null
          is_email_verified: boolean | null
          is_phone_verified: boolean | null
          notary_office: string | null
          phone_number: string | null
          profession: string | null
          residence_place: string | null
          sale_proof_url: string | null
          sale_reason: string | null
          service_prices: Json | null
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          birth_place?: string | null
          birth_year?: number | null
          created_at?: string
          full_name?: string | null
          id?: string
          id_number?: string | null
          is_certified?: boolean | null
          is_email_verified?: boolean | null
          is_phone_verified?: boolean | null
          notary_office?: string | null
          phone_number?: string | null
          profession?: string | null
          residence_place?: string | null
          sale_proof_url?: string | null
          sale_reason?: string | null
          service_prices?: Json | null
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          birth_place?: string | null
          birth_year?: number | null
          created_at?: string
          full_name?: string | null
          id?: string
          id_number?: string | null
          is_certified?: boolean | null
          is_email_verified?: boolean | null
          is_phone_verified?: boolean | null
          notary_office?: string | null
          phone_number?: string | null
          profession?: string | null
          residence_place?: string | null
          sale_proof_url?: string | null
          sale_reason?: string | null
          service_prices?: Json | null
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          area_size: number
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string
          department: string | null
          description: string | null
          distance_from_road: number | null
          district: string | null
          id: string
          is_furnished: boolean | null
          neighborhood: string
          owner_id: string
          owner_profile_id: string | null
          price: number
          property_type: string
          title: string
          transaction_type: string
          updated_at: string
        }
        Insert: {
          area_size: number
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string
          department?: string | null
          description?: string | null
          distance_from_road?: number | null
          district?: string | null
          id?: string
          is_furnished?: boolean | null
          neighborhood: string
          owner_id: string
          owner_profile_id?: string | null
          price: number
          property_type: string
          title: string
          transaction_type: string
          updated_at?: string
        }
        Update: {
          area_size?: number
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string
          department?: string | null
          description?: string | null
          distance_from_road?: number | null
          district?: string | null
          id?: string
          is_furnished?: boolean | null
          neighborhood?: string
          owner_id?: string
          owner_profile_id?: string | null
          price?: number
          property_type?: string
          title?: string
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_profile_id_fkey"
            columns: ["owner_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_main: boolean | null
          property_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_main?: boolean | null
          property_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_main?: boolean | null
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          reviewer_id: string
          seller_id: string
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          reviewer_id: string
          seller_id: string
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          reviewer_id?: string
          seller_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      regions: {
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
        Relationships: []
      }
      service_prices: {
        Row: {
          created_at: string | null
          id: string
          price: number
          profile_id: string | null
          service_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          price: number
          profile_id?: string | null
          service_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          price?: number
          profile_id?: string | null
          service_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          created_at: string
          email_code: string
          expires_at: string
          id: string
          sms_code: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_code: string
          expires_at?: string
          id?: string
          sms_code: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_code?: string
          expires_at?: string
          id?: string
          sms_code?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_seller_rating: {
        Args: {
          seller_id: string
        }
        Returns: {
          average_rating: number
          total_ratings: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
