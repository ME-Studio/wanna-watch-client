import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataStoreService } from '../services/data-store.service';
import * as _ from 'lodash'
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchType: String

  movieSearch = new FormControl();
  movies: any = this.__dataStoreService.allMovies
  filteredMovies: Observable<any>;
  
  showSearch = new FormControl();
  shows: any = this.__dataStoreService.allShows
  filteredShows: Observable<any>;



  constructor(
    private __dataStoreService: DataStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filteredMovies = this.movieSearch.valueChanges
      .pipe(
        startWith(''),
        map(value => this._movieFilter(value))
      );
    this.filteredShows = this.showSearch.valueChanges
      .pipe(
        startWith(''),
        map(value => this._showFilter(value))
      );
  }

  private _movieFilter(value: any): string[] {
    let filterValue
    if(_.isString(value)){
      filterValue = value.toLowerCase();
    }else{
      filterValue = value.name.toLowerCase();
    }
      
    return this.movies.filter(movie => movie.name.toLowerCase().includes(filterValue));
  }

  private _showFilter(value: any): string[] {
    let filterValue
    if(_.isString(value)){
      filterValue = value.toLowerCase();
    }else{
      filterValue = value.name.toLowerCase();
    }

    return this.shows.filter(show => show.name.toLowerCase().includes(filterValue));
  }

  expand(type: String, data: {id: Number}){
    this.__dataStoreService[`highlighted${_.upperFirst(type)}`] = data
    this.router.navigate([type, data.id])
  }

}
