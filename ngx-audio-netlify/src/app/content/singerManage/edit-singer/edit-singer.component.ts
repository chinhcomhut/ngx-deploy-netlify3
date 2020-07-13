import { Component, OnInit } from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {SingerService} from "../../../service/singer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-singer',
  templateUrl: './edit-singer.component.html',
  styleUrls: ['./edit-singer.component.css']
})
export class EditSingerComponent implements OnInit {
id: number;
singer: SingerInfo;
  submitted = false;
  constructor(private singerService: SingerService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.singer = new SingerInfo();

    this.id = this.route.snapshot.params['id'];

    this.singerService.getEmployee(this.id)
        .subscribe(data => {
          console.log(data)
          this.singer = data;
        }, error => console.log(error));
  }

  updateEmployee() {
    this.singerService.updateEmployee(this.id, this.singer)
        .subscribe(data => console.log(data), error => console.log(error));
    this.singer = new SingerInfo();
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();
    alert('update success!!')
    window.location.reload()
  }

  gotoList() {

    this.router.navigate(['/singer']);

  }
  onAvatar($event) {
    this.singer.avatar = $event;
  }
}
