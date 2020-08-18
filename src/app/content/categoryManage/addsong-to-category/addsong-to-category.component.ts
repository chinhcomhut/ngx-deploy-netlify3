import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../service/category.service';
import {CategoryInfo} from '../../../model/category-info';
import {SongInfo} from '../../../model/song-info';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-addsong-to-category',
  templateUrl: './addsong-to-category.component.html',
  styleUrls: ['./addsong-to-category.component.css']
})
export class AddsongToCategoryComponent implements OnInit {
  category: CategoryInfo;
  songs: SongInfo[];
  loading = false;
  totalElements: number = 0;
  searchText;
  isCheck = false;
  errorMessage = ''
  constructor(private songService: SongService,
              private routes: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId=>{
      const id = +categoryId.get('id');
      this.categoryService.getCategoryById(id).subscribe(result=>{
        this.category = result;
        console.log('categoryaaa',result)
      })
    })
    this.getListResquest({page: '', size: ''});
  }
  addSongtoCategory(song: SongInfo) {
    console.log('leng', this.category.songList.length)
    this.isCheck = false;
    if (this.category.songList.length == 0) {
      this.isCheck = false;
    } else {
      for (let i = 0; i < this.category.songList.length; i++) {
        console.log('song.id', song.id)
        console.log('songlist.id', this.category.songList[i].id)
        if (song.id != this.category.songList[i].id) {
          continue;
        } else {
          this.isCheck = true;
          break;
        }
      }
    }
    if (this.isCheck) {
      // alert('The Song already exists in your play list')
      this.errorMessage = 'The Song already exists in Music Genre!'
    } else {
      this.category.songList.push(song);
      this.errorMessage = 'add successful Song!'
      alert('add song success!')
    }
    // console.log('song',song)
    // this.category.songList.push(song);

    this.categoryService.updateCategory(this.category).subscribe(next => {
      console.log('next', next);
      // alert('co vao day khong')
      // this.router.navigate([url]);
      // alert('add song success!')
    });
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSong(request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('category', data);
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
