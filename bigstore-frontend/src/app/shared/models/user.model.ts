export class User {
    constructor(public  fullname?:string,
                public  email?: string,
                public  mobile?: string,
                public  password?:string,
                public  confirmpass?:string,
                public  id?:string,
                public  items?:any
                ) {}
}