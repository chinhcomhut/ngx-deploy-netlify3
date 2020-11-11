import {Component, OnInit, ViewChild} from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {SingerService} from "../../../service/singer.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {newArray} from "@angular/compiler/src/util";
import {Singer, SingerListRespone} from "../../../model/singerListRespone";

import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {count, tap} from "rxjs/operators";
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
    selector: 'app-singer',
    templateUrl: './page-singer.component.html',
    styleUrls: ['./page-singer.component.css']
})
export class PageSingerComponent implements OnInit {
    totalElements: number = 0;
    singers: Singer[] = [];
    loading: boolean;
    searchText;
    isCheck = false;
    data : any = ["ADMIN"];
    constructor(private singerService: SingerService,
                private router: Router,
                private tokenService: TokenStorageService) {
    }

    ngOnInit() {
        // this.singerService.getEmployeesList().subscribe(next => {
        //         // @ts-ignore
        //         this.singerList = next;
        //         console.log(next)
        //     }, error => {
        //         console.log(error)
        //     }
        // )
       this.getListResquest({page: 0, size: 12})
        if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.data)){
            this.isCheck = true;
        }
    }
    private getListResquest(request) {
        this.loading = true;
        this.singerService.getPageSinger(request)
            .subscribe(data => {
                this.singers = data['content'];
                this.totalElements = data['totalElements'];
                this.loading = false;
            }, error => {
                this.loading = false;
            });
    }

    nextPage(event: PageEvent) {
        const request = {};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
        this.getListResquest(request);
    }
    deleteSinger(id: number){
        this.singerService.deleteSinger(id).subscribe(()=>{
            alert('Delete success!')
            window.location.reload();
        })
    }
    // ngAfterViewInit(){
    //     this.todoDatasource.counter$.pipe(
    //         tap((count)=>{
    //             this.paginator.length = count;
    //         })
    //     ).subscribe();
    //     this.paginator.page.pipe(
    //         tap(()=> this.loadSinger())
    //     ).subscribe();
    // }
    // loadSinger(){
    //     this.todoDatasource.loadSingers(this.paginator.pageIndex, this.paginator.pageSize)
    // }
    // getListSingerPagination(){
    //     this.singerService.getSingerList(this.page).subscribe(data =>{
    //         console.log(data)
    //         this.singerListPagination = data['content'];
    //         this.pages = new Array(data['totalPages'])
    //     }, error => {
    //         console.log(error.error.message)
    //     })
    // }
    // setPages(i, event: any){
    //     event.preventDefault;
    //     this.pages = i;
    //     this.getListSingerPagination();
    // }
    // singerDetails(id: number) {
    //     this.router.navigate(['detailSinger', id])
    // }
    //
    // deleteEmployee(id: number) {
    //     this.singerService.deleteEmployee(id)
    //         .subscribe(
    //             data => {
    //                 console.log(data);
    //                 alert('delete success!!')
    //                 window.location.reload();
    //             },
    //             error => console.log(error));
    // }
}
