import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../model/song';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  @Input() song: Song;

  constructor() { }

  ngOnInit() {
  }

}
