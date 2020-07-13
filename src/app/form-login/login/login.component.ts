import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteSnapshot} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: '/user';
    hide = true;
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = 'Login failled! Please Check username or Password';
    roles: string[] = [];
    userName: String;
    private loginInfo: AuthLoginInfo;

    constructor(private authService: AuthService, private route: Router,
                private tokenStorage: TokenStorageService,
                private routes: ActivatedRoute,
                ) {
    }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            console.log("isLoggedIn"+this.isLoggedIn)
            this.roles = this.tokenStorage.getAuthorities();
            this.userName = this.tokenStorage.getUsername()
        }

    }

    onSubmit() {
        console.log(this.form);

        this.loginInfo = new AuthLoginInfo(
            this.form.username,
            this.form.password);

        this.authService.attemptAuth(this.loginInfo).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);
                this.tokenStorage.saveUserPassword(data.password)
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getAuthorities()
                alert('Login success!!')
                window.location.reload()
                this.route.navigate(['/user'])


                // this.route.navigate(['/user']);
                // console.log("chinh1"+this.route + "url"+this.route.url)
                // this.reloadPage();
                // if (this.route.url === '/login') {
                // this.route.navigate(['/user']);
                // this.reloadPage();
                // } else {

                // }
            },
            error => {
                console.log(error);
                this.errorMessage = error.error.message;
                // this.isLoggedIn = true;
                // this.isLoggedIn = false;
                this.isLoginFailed = true;
                alert('Login Failed!!! Please login again! ');

            }
        );
    }


}
