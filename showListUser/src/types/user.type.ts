import { ChangeEvent, FormEvent } from "react";

export interface IUser {
  cell: string;
  dob: { date: string; age: number };
  email: string;
  gender: string;
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: number;
    state: string;
    street: { number: number; name: string };
    timezone: { offset: string; description: string };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: { date: string; age: number };
}

export interface ICheckBoxList {
  name: string;
  id: string;
  checked: boolean;
  sortType: string;
  propertyName: string;
}

export type FormSubmit = FormEvent<HTMLFormElement>;

export type InputChangedEvent = ChangeEvent<
  (HTMLInputElement & EventTarget) | HTMLTextAreaElement | HTMLSelectElement
>;
