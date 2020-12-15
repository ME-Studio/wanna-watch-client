import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private __apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onLogout(){
    const result = await this.__apiService.logout()
    console.log(result)
    this.router.navigate([''])
  }

  onSearch(){
    this.router.navigate(['search'])
  }

  onWatchlist() {
    this.router.navigate(['watchlist'])  
  }

}
