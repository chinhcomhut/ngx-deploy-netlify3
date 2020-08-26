import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {PlaylistService} from '../../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryInfo} from '../../../model/category-info';
import {SongInfo} from '../../../model/song-info';
import {PlaylistInfo} from '../../../model/playlist-info';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-add-play-list-to-category',
  templateUrl: './add-play-list-to-category.component.html',
  styleUrls: ['./add-play-list-to-category.component.css']
})
export class AddPlayListToCategoryComponent implements OnInit {
  category: CategoryInfo;
  playLists: PlaylistInfo[];
  isCheck = false;
  loading = false;
  totalElements: number = 0;
  searchText;
  errorMessage = '';

  constructor(private categoryService: CategoryService,
              private playListService: PlaylistService,
              private routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId => {
      const id = +categoryId.get('id');
      this.categoryService.getCategoryById(id).subscribe(result => {
        this.category = result;
      });
    });
    this.getListResquest({page:'', size:''})
  }

  addPlayListToCategory(playList: PlaylistInfo) {
    console.log('leng', this.category.playlists.length);
    this.isCheck = false;
    if (this.category.playlists.length == 0) {
      this.isCheck = false;
    } else {
      for (let i = 0; i < this.category.playlists.length; i++) {
        console.log('playlist.id', playList.id);
        console.log('playlist.id', this.category.playlists[i].id);
        if (playList.id != this.category.playlists[i].id) {
          continue;
        } else {
          this.isCheck = true;
          break;
        }
      }
    }
    if (this.isCheck) {
      // alert('The Song already exists in your play list')
      this.errorMessage = 'The PlayList already exists in Music Genre!';
    } else {
      this.category.playlists.push(playList);
      this.errorMessage = 'add successful Play List!';
      alert('add play list success!');
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
    this.playListService.getPagePlayList(request)
      .subscribe(data => {
        this.playLists = data['content'];
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
