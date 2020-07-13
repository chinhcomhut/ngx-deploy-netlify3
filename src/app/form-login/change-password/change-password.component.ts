import {Component, Injectable, OnInit} from '@angular/core';
import {ChangePassword} from "../../auth/change-password";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    ValidationErrors, ValidatorFn,
    Validators
} from "@angular/forms";
import {SignUpInfo} from "../../auth/signup-info";
import {UserService} from "../../service/user.service";
import {UserAccount} from "../../model/userAccount/userAccount";
import {ErrorStateMatcher} from "@angular/material/core";
import {Subscription} from "rxjs";
import {stringify} from "querystring";
import {toString} from "tsickle/src/jsdoc";
import {finalize} from "rxjs/operators";
import {group} from "@angular/animations";
import {faAngular} from "@fortawesome/free-brands-svg-icons";
import {equal} from "assert";
import validate = WebAssembly.validate;


// export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
//     return formGroup.get('newPassword').value === formGroup.get('confirmPassword').value ?
//         null : { 'passwordMismatch': true };
// }
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//         const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
//
//         return (invalidCtrl || invalidParent);
//     }
// }
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

// export class MyErrorStateMatcher2 implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//         const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
//
//         return (invalidCtrl || invalidParent);
//     }
// }

@Component({
    selector: 'app-change-profile',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
    //
    // title = 'Thay Đổi Mật Khẩu';
    // form: any = {};
    // changePassword: ChangePassword;
    // isChangePassed = false;
    // errorMessage = '';
    // hide = true;
    // changeForm: FormGroup;
    // constructor(
    //     private authService: AuthService,
    //     private router: Router) {
    //     this.changeForm = new FormGroup({
    //         currentPassword: new FormControl(''),
    //         newPassword: new FormControl(''),
    //         confirmPassword: new FormControl('')
    //     })
    // }
    //
    // ngOnInit() {
    //     this.changeForm = new FormGroup({
    //         currentPassword: new FormControl(''),
    //         newPassword: new FormControl(''),
    //         confirmPassword: new FormControl('')
    //     }, { validators: passwordMatchValidator })
    //
    //     this.changePassword = new ChangePassword(
    //         this.form.currentPassword,
    //         this.form.newPassword,
    //         this.form.confirmPassword);
    // }
    //
    // ngSubmit() {
    //     // this.changePassword = new ChangePassword(
    //     //     this.form.currentPassword,
    //     //     this.form.newPassword,
    //     //     this.form.confirmPassword);
    //     // console.log("1" , this.changePassword)
    //     // console.log("2"+this.form.currentPassword)
    //     this.authService
    //         .changePasswordAuth(this.changePassword)
    //         .subscribe(
    //             data => {
    //                 console.log('data' , data);
    //                 this.isChangePassed = true;
    //                 alert('Bạn đã thay đổi Mật Khẩu thành công');
    //                 this.router.navigate(['/home']);
    //             },
    //             error => {
    //                 console.log(error);
    //                 this.errorMessage = error.error.message,
    //                     alert('Bạn chưa thay đổi thành công');
    //             });
    // }

    form: any = {};
    myForm: FormGroup;
    // myForm1: FormGroup;
    // myForm2: FormGroup;
    changePassWord: ChangePassword;
    matcher = new MyErrorStateMatcher();
    // matcher2 = new MyErrorStateMatcher2();
    isChangePassed = false;
    errorMessage = '';
    hide = true;
    data: any = {
        message: "yes"
    };
    // data2: any = {
    //     message: "no"
    // };
    // data2: any = {};


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private tokenService: TokenStorageService) {
        // this.myForm = this.formBuilder.group({
        //         currentPassword: [''],
        //         newPassword: [''],
        //         confirmPassword: ['']
        //     }
        // );
        this.myForm = this.formBuilder.group({
                currentPassword: ['', [Validators.required]],
                newPassword: ['', [Validators.required]],
                confirmPassword: ['']
            }, {validator: this.checkPasswords},
        );

        // this.myForm1 = this.formBuilder.group({
        //         // currentPassword: ['', [Validators.required]],
        //         newPassword: [''],
        //         confirmPassword: ['', [Validators.required]]
        //
        //     }, {validator: this.checkPasswords}
        // );
    }

    ngOnInit() {
        this.changePassWord = new ChangePassword(
            this.form.currentPassword,
            this.form.newPassword,
            this.form.confirmPassword
        )
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group


        let newpass = group.controls.newPassword.value;
        let confirmPass = group.controls.confirmPassword.value;

        return newpass === confirmPass ? null : {notSame: true}
    }

    // checkNewAndCurrentPassword(group: FormGroup) { // here we have the 'passwords' group
    //     let currentPass = group.controls.currentPassword.value;
    //     let oldPass = group.controls.newPassword.value;
    //
    //     return currentPass !== oldPass ? null : {notSameOld: true}
    // }


    ngSubmit() {
        this.authService
            .changePasswordAuth(this.changePassWord)
            .subscribe(
                data => {
                    console.log('data', data)

                    if (JSON.stringify(data) == JSON.stringify(this.data)) {
                        this.isChangePassed = false;
                        console.log('data trong if', data)
                        console.log('ischangePass', this.isChangePassed)
                        alert('Bạn đã thay đổi Mật Khẩu thành công');
                        this.router.navigate(['user'])
                    } else {
                        this.isChangePassed = true;
                        console.log('xuong else')
                        // alert('Mật khẩu không khớp')
                    }


                    // this.router.navigate(['/home']);
                }, error => {
                    alert('khong duoc')
                }
            );
    }
}

// Angular
// import { Component, OnInit, Injectable } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// // Lib
// import * as _ from 'lodash';
// import { MessageService } from 'primeng/api';
// import { finalize } from 'rxjs/operators';
// // My project
// import { ChangePasswordService } from '../../../shared/services';
// import { ValidateUtil } from '../../../shared/utils/Validate.util';
// import { ErrorUtil } from '../../../shared/utils/error.util';

// @Component({
//     selector: 'app-change-password',
//     templateUrl: './change-password.component.html',
//     styleUrls: ['./change-password.component.scss']
// })
// @Injectable()
// export class ChangePasswordComponent implements OnInit {
//     public msgs;
//     // form validate
//     public formGroup: FormGroup;
//     public flags: any = {
//         isSubmit: false,
//         notDublicateSubmit: false,
//         currentPasswordNotMatch: false
//     };
//
//     public show_button: Boolean[] = [false, false, false];
//     public show_eye: Boolean[] = [false, false, false];
//
//     public showPassword(id): void {
//         this.show_button[id] = !this.show_button[id];
//         this.show_eye[id] = !this.show_eye[id];
//     }
//
//     public async onSubmit(): Promise<any> {
//         this.flags.isSubmit = true;
//         // if (localStorage.getItem('AuthToken') === null) {
//         //     this.router.navigateByUrl('login');
//         // }
//         if (this.f.currentPassword.value) {
//             // await this.checkPass();
//             if (this.formGroup.valid && !this.flags.currentPasswordNotMatch) {
//                 this.flags.notDublicateSubmit = true;
//                 // Update Password
//                 const params = {
//                     oldPassword: this.f.currentPassword.value,
//                     newPassword: this.f.newPassword.value
//                 };
//                 this.changePasswordService.changePasswordAuth(params)
//                     .subscribe({
//                         next: (value: any) => {
//                             // check status success
//                             if (value.ok) {
//                                 // this.messageService.add({
//                                 //     severity: 'success',
//                                 //     summary: 'Success Message',
//                                 //     detail: 'Password updated successfully'
//                                 // });
//                                 localStorage.clear();
//                                 this.flags.isSubmit = false;
//                                 setTimeout(() => {
//                                     this.router.navigateByUrl('login');
//                                 }, 1000);
//                             } else {
//                                 this.flags.notDublicateSubmit = false;
//                             }
//                         },
//                         error: (error) => {
//                             this.flags.notDublicateSubmit = false;
//
//                         }
//                     });
//             }
//         }
//     }
//
//     constructor(
//         private fb: FormBuilder,
//         private changePasswordService: AuthService,
//         private router: Router
//     ) { }
//
//     ngOnInit() {
//         this.validate();
//     }
//
//     private validate(): void {
//         this.formGroup = this.fb.group(
//             {
//                 currentPassword: ['', Validators.required],
//                 newPassword: ['', [Validators.required, Validators.minLength(8)]],
//                 confirmNewPassword: ['', Validators.required]
//             },
//             {
//                 validator: this.mustMatch('newPassword', 'confirmNewPassword')
//             }
//         );
//     }
//
//     get f() {
//         return this.formGroup.controls;
//     }
//
//     private mustMatch(controlName: string, matchingControlName: string) {
//         return (formGroup: FormGroup) => {
//             const control = formGroup.controls[controlName];
//             const matchingControl = formGroup.controls[matchingControlName];
//
//             if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//                 return;
//             }
//             if (control.value !== matchingControl.value) {
//                 matchingControl.setErrors({ mustMatch: true });
//             } else {
//                 matchingControl.setErrors(null);
//             }
//         };
//     }
//
//     // private async checkPass(): Promise<any> {
//     //     this.flags.notDublicateSubmit = true;
//     //     ValidateUtil.trimFormGroup(this.formGroup);
//     //     const params = { password: _.trim(this.f.currentPassword.value) };
//     //     await this.changePasswordService.checkPassword(params)
//     //         .pipe(finalize(() => {
//     //             this.flags.notDublicateSubmit = false;
//     //         }))
//     //         .toPromise().then(
//     //             (next: any) => {
//     //                 // check status success
//     //                 if (next.ok) {
//     //                     this.flags.currentPasswordNotMatch = false;
//     //                 } else {
//     //                     // TODO error
//     //                     this.flags.currentPasswordNotMatch = true;
//     //                     this.flags.notDublicateSubmit = false;
//     //                 }
//     //             },
//     //             error => {
//     //                 this.flags.currentPasswordNotMatch = true;
//     //                 // ErrorUtil.errorMessage(this.messageService, error);
//     //             }
//     //         );
//     // }
//
// }
