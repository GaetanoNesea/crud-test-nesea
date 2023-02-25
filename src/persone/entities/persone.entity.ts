import {v4 as uuidv4} from 'uuid';
import {Address, Company, IPersona} from '../models/personeResponse.model';
export class Persone implements IPersona {
  id: string;
  address: Address;
  company: Company;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;

  constructor({
    address,
    company,
    email,
    name,
    phone,
    username,
    website,
  }: Persone) {
    this.address = address ?? this._new_adress();
    this.company = company ?? this.new_comp();
    this.email = email;
    this.id = uuidv4();
    this.name = name;
    this.phone = phone;
    this.username = username;
    this.website = website;
  }

  private _new_adress(): Address {
    return {
      city: '',
      street: '',
      suite: '',
      zipcode: '',
      geo: {
        lng: '',
        lat: '',
      },
    };
  }

  private new_comp(): Company {
    return {
      name: '',
      catchPhrase: '',
      bs: '',
    };
  }
  //
  // static createId(data: IPersona[]) {
  //   return data.map((persona) => ({...persona, id: uuidv4()}));
  // }
}
