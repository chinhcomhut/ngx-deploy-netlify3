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
    form: any = {}
    changeAvatar: ChangeAvatar;
    data: any = {
        message: "no"
    }
    message = '';
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
        )
        this.authService.changeAvatar(this.changeAvatar).subscribe(data => {
            if (JSON.stringify(data) == JSON.stringify(this.data)) {
                // alert('Bạn hãy upload 1 tấm ảnh yêu thích của bạn')
                this.message = 'Please wait for the image to be uploaded and click on Change Avatar';
                this.isChange = true;
            } else {
                alert('change avatar success!!')
                this.message = 'change avatar success!!'
                this.tokenStorageService.saveAvatar(this.form.avatar)
                // this.router.navigate(['user'])
                window.location.reload()
            }
        }, error => {
            alert('change avatar failled!')

        })
    }

    onAvatar($event) {
        this.form.avatar = $event;
    }
}
