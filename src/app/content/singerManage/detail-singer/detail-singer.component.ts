import {Component, OnInit} from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {ActivatedRoute, Router} from "@angular/router";
import {SingerService} from "../../../service/singer.service";
import {Observable} from "rxjs";


@Component({
    selector: 'app-detail-singer',
    templateUrl: './detail-singer.component.html',
    styleUrls: ['./detail-singer.component.css']
})
export class DetailSingerComponent implements OnInit {
id: number;
singer: SingerInfo;

isLoadingResults = true;
    constructor(private singerService: SingerService,
                private router: Router,
                private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.singer = new SingerInfo();
      this.id = this.route.snapshot.params['id']
        console.log("id"+this.singer.id)
        this.singerService.getEmployee(this.id).subscribe(data => {
            console.log(data)
            this.singer = data;
        }, error => {
            console.log(error)
        })
    }
  list(){
        this.router.navigate(['singer'])
  }
}
