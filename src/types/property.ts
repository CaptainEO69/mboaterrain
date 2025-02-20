
export type PropertyImage = {
  id: string;
  image_url: string;
  is_main: boolean | null;
  property_id: string;
  created_at: string;
};

export type ProfileData = {
  full_name: string | null;
  phone_number: string | null;
};

export type Property = {
  id: string;
  title: string;
  description: string | null;
  property_type: string;
  transaction_type: string;
  price: number;
  city: string;
  neighborhood: string;
  area_size: number;
  bedrooms: number | null;
  bathrooms: number | null;
  is_furnished: boolean | null;
  distance_from_road: number | null;
  owner_id: string;
  owner_profile_id: string;
  property_images: PropertyImage[];
  profiles: ProfileData;
  created_at: string;
  updated_at: string;
};
