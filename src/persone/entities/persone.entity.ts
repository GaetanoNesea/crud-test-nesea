import { v4 as uuidv4 } from 'uuid';
import { Address, Company, IPersona} from '../models/personeResponse.model';
export class Persone implements IPersona {
    id: string;

    constructor(
        public name: string,
        public username: string,
        public email: string,
        public phone: string = null,
        public website: string = null,
        public address: Address = null,
        public company: Company = null
    ) {
        this.id = uuidv4();
        this.address = address || this._new_adress();
        this.company = company || this.new_comp();
    }

    private _new_adress(): Address{
        return {
            city: '',
            street: '',
            suite: '',
            zipcode: '',
            geo: {
                lng: '',
                lat: ''
            }
        }
    }

    private new_comp(): Company {
        return {
            name: '',
            catchPhrase: '',
            bs: ''
        }
    }

    static createId(data: IPersona[]){
        return data.map(persona => ({...persona, id: uuidv4()}))
    }
}
