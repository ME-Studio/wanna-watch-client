import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* MATERIAL */
import {MatButtonModule} from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FlashComponent } from './flash/flash.component';
import { ApiService } from './services/api.service';

import { HttpClientModule } from "@angular/common/http";
import { AddComponent } from './add/add.component';
import { DataStoreService } from './services/data-store.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MovieComponent } from './movie/movie.component';
import { ShowComponent } from './show/show.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    FlashComponent,
    AddComponent,
    MovieComponent,
    ShowComponent,
    WatchlistComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    NoopAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule
  ],
  providers: [
    ApiService,
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
