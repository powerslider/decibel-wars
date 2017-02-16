import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../model/song';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.css']
})
export class SearchSongComponent implements OnInit {

  private songs: Array<Song> = [];
  @Input() private searchText: string;
  constructor(private songsService: SongsService) { }

  ngOnInit() {
  }

  private onSearchClicked() {
    this.songsService.getSongs(this.searchText);
    this.songs = [
      { title: "When I'm gone", artist: "Eminem", year: 2005 },
      { title: "Not afraid", artist: "Eminem", year: 2010 }
    ];
  }
}
