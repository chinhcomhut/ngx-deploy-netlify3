import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ChangeAvatar} from "../../auth/change-avatar";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
    selector: 'app-change-avatar',
    templateUrl: './change-avatar.component.html',
    styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {
    form: any = {};
    changeAvatar: ChangeAvatar;
    data1: any = {
        message: 'noavatar'
    };
    data2: any = {
        message: 'yes'
    };
    messageError = 'Please Choose an image and click Upload';
    isChange = false;
    constructor(private authService: AuthService,
                private router: Router,
                private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.changeAvatar = new ChangeAvatar(
          this.form.avatar
        );
        this.authService.changeAvatar(this.changeAvatar).subscribe(data => {
            if (JSON.stringify(data) == JSON.stringify(this.data1)) {
                this.messageError = 'please upload Avatar!';
            }
            if (JSON.stringify(data) == JSON.stringify(this.data2)) {
                this.messageError = 'Successful Avatar upload!';
                alert(this.messageError);
                this.tokenStorageService.saveAvatar(this.form.avatar);
                // this.router.navigate(['user'])
                window.location.reload();
            }
        }, error => {
            alert('change avatar failled!');

        });
    }

    onAvatar($event) {
        this.isChange = true;
        this.form.avatar = $event;
    }
}
