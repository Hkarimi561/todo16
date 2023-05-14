import {Address} from "./address.interface";

export interface User {
  id: number
  username: string
  name: string
  email: string
  address: Address
}
