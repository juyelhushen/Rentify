export interface Model {}

export interface Signup {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: number;
  role: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export enum Role {
  LANDLORD,
  TENANT,
}

export interface Property {
  type:string;
  place: string;
  area: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  nearbyHospitals: string;
  nearbyColleges: string;
}

export interface PropertyReponse {
  id:number;
  type:string;
  place:string;
  area:string;
  numberOfBedrooms:number;
  numberOfBathrooms:number;
  nearbyHospitals:string;
  nearbyColleges:string;
  imageUrl:string;
  userId:number;
  likes:number;
  createdDate:string;
  lastModifiedDate:string;
}

export interface User {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: Role;
  likedProperty:number[];
}

export interface AuthResponse {
  token: string;
  message: string;
  role: string;
}


export interface Mail {
  to:string;
  landlordId:number;
}

