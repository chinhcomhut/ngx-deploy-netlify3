import {Component, OnInit} from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {SingerService} from "../../../service/singer.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-singer',
    templateUrl: './singer.component.html',
    styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  singerList: SingerInfo[] = []


    constructor(private singerService: SingerService,
                private router: Router) {
    }

    ngOnInit() {
      this.singerService.getEmployeesList().subscribe(next => {
        // @ts-ignore
        this.singerList = next;
            console.log(next)
          }, error => {
            console.log(error)
          }
      )
    }
    singerDetails(id: number) {
        this.router.navigate(['detailSinger', id])
    }
    deleteEmployee(id: number) {
        this.singerService.deleteEmployee(id)
            .subscribe(
                data => {
                    console.log(data);
                    alert('delete success!!')
                   window.location.reload();
                },
                error => console.log(error));
    }
}
