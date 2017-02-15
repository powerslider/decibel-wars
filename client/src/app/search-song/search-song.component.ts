import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.css']
})
export class SearchSongComponent implements OnInit {

  private songs: Array<Song> = [];
  constructor() { }

  ngOnInit() {
  }

  private onSearchClicked() {
    this.songs = [
      { title: "When I'm gone", artist: "Eminem", year: 2005 },
      { title: "Not afraid", artist: "Eminem", year: 2010 }
    ];
  }
}
