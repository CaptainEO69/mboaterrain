
export interface Profile {
  id?: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  birth_place?: string;
  id_number?: string;
  profession?: string;
  residence_place?: string;
  birth_date?: Date | null;
  user_type: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  birth_year?: number;
  is_certified?: boolean;
  full_name?: string;
  sale_reason?: string;
  sale_proof_url?: string;
  notary_office?: string;
}

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_place: string;
  id_number: string;
  profession: string;
  residence_place: string;
  birth_date: Date | null;
  user_type: string;
}
