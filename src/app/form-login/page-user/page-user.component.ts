import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {UserService} from '../../service/user.service';
import {UserAccount} from '../../model/userAccount/userAccount';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  searchText;
  isCheck = false;
  users: UserAccount[]=[];
  data: any = {
    message: "yes"
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data=>{
      console.log('data',data)
      if(JSON.stringify(data)==JSON.stringify(this.data)){
        alert('Delete Successful Song!')
      }
      // this.songService.updateSong(this.song.id, this.song).subscribe(()=>{
      // alert('delete successful Song!')
      //   window.location.reload()
      // })
      window.location.reload();
    }, error => {
      alert('Can phai xoa o cho khac truoc')
    })
  }
  private getListResquest(request) {
    this.loading = true;
    this.userService.getPageUser(request)
      .subscribe(data => {
        this.users = data['content'];
        console.log('songList', data);
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
}
