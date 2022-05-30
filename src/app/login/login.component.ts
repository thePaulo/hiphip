import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../my-table/model/User.model';
import { TablezService } from '../my-table/services/tablez.service';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private location:Location,
              private service:LoginServiceService) {
    this.form = this.formBuilder.group({
      username: [null],
      password:[null],
      })
   }

  ngOnInit(): void {
  }

  onLogin(){
    this.service.login(this.form.value);
  }

  onCancel(){
    this.location.back();
  }

}
