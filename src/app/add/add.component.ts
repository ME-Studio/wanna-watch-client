import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  // Proper validation
  movieForm = this.formBuilder.group({
    name: ['',[ Validators.required ]],
    about: ['', [ Validators.required ]],
    duration: ['', [ Validators.required ]],
    genre: ['', [ Validators.required ]],
    cast: ['', [ Validators.required ]],
    release_date: [`2014-03-16`, [ Validators.required ]],
    image: ['']
  });

  showForm = this.formBuilder.group({
    name: ['',[ Validators.required ]],
    about: ['', [ Validators.required ]],
    genre: ['', [ Validators.required ]],
    cast: ['', [ Validators.required ]],
    release_date: [`2014-03-16`, [ Validators.required ]],
    image: ['']
  });
  
  seasonForm = this.formBuilder.group({
    name: ['', [ Validators.required ]],
    about: [''],
    cast: [''],
    release_date: [`2014-03-16`, [ Validators.required ]],
    image: ['']
  });
  
  episodeForm = this.formBuilder.group({
    name: ['',[ Validators.required ]],
    about: [''],
    duration: ['', [ Validators.required ]],
    cast: [''],
    release_date: [`2014-03-16`, [ Validators.required ]],
    image: ['']
  });

  // private base64textString: String = "";
  displaySeasonForm: Boolean = false
  displayEpisodeForm: Boolean = false
  seasons: {}[] = []
  // seasonData: {} 
  episodes: {}[] = []
  // episodeData: {}
  images: {} = {}

  lodash = _;



  constructor(
    private formBuilder: FormBuilder,
    private __apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // handleFileSelect(evt, imageFor){
  //   const files = evt.target.files
  //   const file = files[0]

  //   if (files && file) {
  //       const reader = new FileReader()
  //       reader.onload = this.handleReaderLoaded.bind(this)
  //       reader.readAsBinaryString(file)
  //   }
  // }

  // handleReaderLoaded(readerEvt) {
  //   const binaryString = readerEvt.target.result
  //   this.base64textString = btoa(binaryString)
  // }

  getImage(event, imageFor) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.images[imageFor] = reader.result
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  async onMovieSubmit(){
    try {  
      let movieData = _.clone(this.movieForm.value)
      movieData.image = this.images['movie'] || null

      const result = await this.__apiService.add('movie', movieData)

      console.log('Result from onMovieSubmit', result)
      
    } catch (error) {
      console.log('Error while login', error)
    }
  }

  async onShowSubmit(){
    try {  
      let showData = _.clone(this.showForm.value)
      showData.image = this.images['show'] || null
      showData.seasons = this.seasons

      console.log('Before save', showData)

      const result = await this.__apiService.add('show', showData)
      
      console.log('Result from onShowSubmit', result)
      
    } catch (error) {
      console.log('Error while login', error)
    }
  }

  onSeasonSubmit() {
    let data = _.clone(this.seasonForm.value)
    data.image = this.images['season'] || null
    data.episodes = this.episodes
    this.seasons.push(data)

    this.episodes = []
    this.displaySeasonForm = false
    this.seasonForm.reset()

    console.log('this.seasonData', this.seasons)
  }

  onEpisodeSubmit() {
    let data = _.clone(this.episodeForm.value)
    data.image = this.images['episode'] || null
    this.episodes.push(data)

    this.displayEpisodeForm = false
    this.episodeForm.reset()

    console.log(this.episodes)
  }

}
