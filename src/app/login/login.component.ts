import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm = this.formBuilder.group({
    email: [
      '', 
      [ Validators.required, Validators.email ]
    ],
    password: [
      '', 
      [ Validators.required ]
    ]
  });


  constructor(
    private formBuilder: FormBuilder,
    private __apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {  
      const result = await this.__apiService.login(this.loginForm.value)
      console.log('Login result', result)
      this.router.navigate(['home'])
    } catch (error) {
      console.log('Error while login', error)
    }
  }

}
