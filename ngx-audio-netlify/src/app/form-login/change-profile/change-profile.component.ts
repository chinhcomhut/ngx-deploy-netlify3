import {Component, OnInit} from '@angular/core';
import {ChangePassword} from "../../auth/change-password";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {SignUpInfo} from "../../auth/signup-info";
import {UserService} from "../../service/user.service";
import {UserAccount} from "../../model/userAccount/userAccount";
import {ErrorStateMatcher} from "@angular/material/core";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-change-profile',
    templateUrl: './change-profile.component.html',
    styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
    title = 'Thay Đổi Mật Khẩu';
    form: any = {};
    changePassword: ChangePassword;
    isChangePassed = false;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
    }

    ngSubmit() {
        this.changePassword = new ChangePassword(
            this.form.currentPassword,
            this.form.newPassword,
            this.form.confirmPassword);

        this.authService
            .changePasswordAuth(this.changePassword)
            .subscribe(
                data => {
                    console.log('data' + data);
                    this.isChangePassed = true;
                    alert('Bạn đã thay đổi Mật Khẩu thành công');
                    this.router.navigate(['/home']);
                },
                error => {
                    console.log(error);
                    this.errorMessage = error.error.message,
                        alert('Bạn chưa thay đổi thành công');
                });
    }
}
