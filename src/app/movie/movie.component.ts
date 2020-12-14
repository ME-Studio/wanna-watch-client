import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieData: any = this.__dataStoreService.highlightedMovie

  constructor(
    private __dataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    console.log(this.movieData)
  }

}
