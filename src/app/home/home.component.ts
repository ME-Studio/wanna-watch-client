import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataStoreService } from '../services/data-store.service';
import * as _ from 'lodash'
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  dataFetched: boolean = false
  allMovies: {}[] = []
  allShows: {}[] = []

  constructor(
    private __apiService: ApiService,
    private __dataStoreService: DataStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMoviesAndShows()
  }

  async getMoviesAndShows(){
    this.__dataStoreService.allMovies = await this.__apiService.get('movie')
    this.__dataStoreService.allShows = await this.__apiService.get('show')
    this.allMovies  = this.__dataStoreService.allMovies
    this.allShows = this.__dataStoreService.allShows
    this.dataFetched = true
  }

  async addToWatchlist(event: Event, type: String, id: Number) {
    event.stopPropagation();
    let body = {  }
    body[`${type}_id`] = id
    body['watched'] = false

    const result = await this.__apiService.add(type, body)

    console.log('Result from addTowatchList', result)
  }

  expand(type: String, data: {id: Number}){
    this.__dataStoreService[`highlighted${_.upperFirst(type)}`] = data
    this.router.navigate([type, data.id])
  }

  async onLogout(){
    const result = await this.__apiService.logout()
    console.log(result)
  }

  onSearch(){
    this.router.navigate(['search'])
  }

}
