export class UserCookie {
    constructor(data) {
        console.log('data', data);
        this.id = data.id;
        this.userType = data.userType;
        this.name = data.name;
        this.email = data.email;

        if (this.userType === 'user') {
            this.pmb = data.pmb;
            this.profileStatus = data.perfil_status;
        }
    }
}
