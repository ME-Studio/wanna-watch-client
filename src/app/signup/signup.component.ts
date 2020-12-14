import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    email: [
      '', 
      [ Validators.required, Validators.minLength(7), Validators.maxLength(50), Validators.email ]
    ],
    password: [
      '', 
      [ Validators.required, Validators.minLength(8), Validators.maxLength(20) ]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private __apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {  
      const result = await this.__apiService.signup(this.signupForm.value)
      console.log('Signup result', result)
    } catch (error) {
      console.log('Error while signup', error)
    }
  }

}
