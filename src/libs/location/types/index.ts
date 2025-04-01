export interface CanonicalLocation {
  id: number;
  name: string;
  type: 'country' | 'state' | 'city';
  parentId?: number;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface Address {
  id: number;
  label?: string;
  country: CanonicalLocation;
  state?: CanonicalLocation;
  city?: CanonicalLocation;
  fullText?: string;
  streetLine1: string;
  streetLine2?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  type?: 'user' | 'store' | 'shipping' | 'billing' | 'pickup';
  isDefault?: boolean;
  createdAt: Date;
}

export interface RegionFilter {
  countryId?: number;
  stateId?: number;
  cityId?: number;
}

export interface GeoFilter {
  center: {
    latitude: number;
    longitude: number;
  };
  radiusKm: number;
}

export interface NearestLocationResponse {
  country: CanonicalLocation;
  state?: CanonicalLocation;
  city?: CanonicalLocation;
}
