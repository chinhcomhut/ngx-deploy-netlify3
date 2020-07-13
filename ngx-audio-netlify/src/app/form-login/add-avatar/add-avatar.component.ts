import {Component, OnInit} from '@angular/core';
import {UserAccount} from "../../model/userAccount/userAccount";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {error} from "ng-packagr/lib/utils/log";

@Component({
    selector: 'app-add-avatar',
    templateUrl: './add-avatar.component.html',
    styleUrls: ['./add-avatar.component.css']
})
export class AddAvatarComponent implements OnInit {
    userForm: FormGroup;
    user: Partial<UserAccount>
    avatar: string;

    constructor(private route: Router,
                private authService: AuthService,
                private routes: ActivatedRoute) {
        this.userForm = new FormGroup({
            avatar: new FormControl(''),
            name: new FormControl('')
        })
        this.user = {
            // avatar: '',
            name: ''
        }
    }

    ngOnInit() {
        this.routes.paramMap.subscribe(paramMap => {
            const id = +paramMap.get('id');
            console.log(paramMap)
            this.authService.getUserById(id).subscribe(data => {
                    console.log(id)
                    this.user = data
                },
                error => {
                console.log("chinh"+error)
                    this.user = null;
                }
            );
        });
    }


    // onAvatar($event) {
    //     this.user.avatar = $event;
    // }

    // createAvatar() {
    //
    //     this.authService.updateAvatar(this.user).subscribe(() => {
    //             alert('Add avatar success!!');
    //             this.route.navigate(['/user']);
    //         }, error => {
    //             console.log(error),
    //                 alert('Bạn chưa thêm thành công');
    //         }
    //     );
    // }

}
