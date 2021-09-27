import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UpdateService } from 'src/app/service/updateComponent/update.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private api: ApiService, private router: Router, private dataSharingService:UpdateService) {
    
   }
errorStatus:boolean =false;
errorMsj:any="";

  ngOnInit(): void {
  }
  onLogin(form: LoginI) {
    this.api.loginByemail(form).subscribe(data => {
      let dataResponse: ResponseI = data;
      if (dataResponse.status == 'ok') {
        this.Successlogin();
        this.dataSharingService.isUserLoggedIn.next(true);
        this.dataSharingService.isUserName.next(form.email.toString());
        this.router.navigate(['dashboard']);
        localStorage.setItem("token", dataResponse.token);
        sessionStorage.setItem("user", form.email.toString());
        
      }else{
        this.errorStatus=true;
        this.errorMsj=dataResponse.result;
        
      }

    })
  }
  Successlogin() {
    Swal.fire('Success', 'Log In', 'success')
}
}
