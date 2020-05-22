export class Usuario {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public image?: string,
        public phone?: string,
        public role?: string,
        public status?: string,
        public id?: string
    ) {}
}
