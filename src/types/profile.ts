
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
  
  // Nouveaux champs pour les différents types de profils
  agency_name?: string;
  commercial_register?: string;
  operation_zone?: string;
  property_type?: string;
  estimated_budget?: number;
  desired_location?: string;
  approval_number?: string;
  intervention_zone?: string;
  experience_qualifications?: string;
  company_name?: string;
  legal_status?: string;
  investment_type?: string;
  estimated_funding_capacity?: string;
  service_type?: string;
  transport_capacity?: string;
  insurance_included?: boolean;
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
  
  // Nouveaux champs pour les différents types de profils
  agency_name?: string;
  commercial_register?: string;
  operation_zone?: string;
  property_type?: string;
  estimated_budget?: number;
  desired_location?: string;
  approval_number?: string;
  intervention_zone?: string;
  experience_qualifications?: string;
  company_name?: string;
  legal_status?: string;
  investment_type?: string;
  estimated_funding_capacity?: string;
  service_type?: string;
  transport_capacity?: string;
  insurance_included?: boolean;
  notary_office?: string;
}
