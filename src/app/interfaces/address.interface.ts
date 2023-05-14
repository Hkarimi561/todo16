export interface Geo {
  lat: string
  lng: string
}
export interface Address {
  street: string
  suite: string
  city: string,
  zipcode: string,
  get: Geo
}
