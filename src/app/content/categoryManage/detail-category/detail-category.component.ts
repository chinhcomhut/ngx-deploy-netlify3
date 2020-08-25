import { Component, OnInit } from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {SongInfo} from '../../../model/song-info';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {
  category: CategoryInfo = new CategoryInfo()
  totalElements: number = 0;
  loading: boolean;
  searchText;
  constructor(private categoryService: CategoryService,
              private routes: ActivatedRoute,
              private songService: SongService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId =>{
      const id = +categoryId.get('id');
      this.categoryService.getCategoryById(id).subscribe(rusult=>{
        this.category = rusult;
      })
    })
    this.getListResquest({page: '', size: ''});
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSongByCategory(request)
      .subscribe(data => {
        this.category = data['content'];
        console.log('listSong', data);
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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

  deleteSongByCategory(id: number) {
    console.log('lenth', this.category.songList);
    for (let i = 0; i < this.category.songList.length; i++) {
      if (this.category.songList[i].id === id) {
        this.category.songList.splice(i, 1);
        console.log('leng in if', this.category.songList.length);
      }
      // console.log(this.song.length);
    }
    this.categoryService.updateCategory(this.category).subscribe(()=>{
      alert('delete successful Song!')
    })
  }
  // addSongToCategory(song: SongInfo){
  //   console.log("vao day");
  //   console.log('xuong song',song)
  //   this.category.songList.push(song);
  //   // console.log('category',this.category)
  //   this.categoryService.updateCategorys(this.category).subscribe(result=>{
  //     // console.log(result)
  //     alert('success!')
  //   })
  // }

  // deleteSongByCategory(id: number) {
  //   this.categoryService.deleteCategory(id).subscribe(data => {
  //     console.log(data);
  //     this.categoryService.updateCategory(this.category).subscribe(()=>{
  //
  //     })
  //     window.location.reload();
  //   });

}
