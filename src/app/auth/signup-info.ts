export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    // avatarUrl: string;
    role: string[];
    password: string;

    constructor(name: string, username: string, email: string, password: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        // this.avatarUrl = avatarUrl;
        this.password = password;

        this.role = ['user'];       //Neu de 'admin', 'pm' thi se dang ki form thanh ADMIN vs PM
        // this.role = ['admin'];
    }
}
