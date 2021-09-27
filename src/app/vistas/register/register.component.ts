import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterI } from 'src/app/models/register.interface'; 
import { ResponseI } from 'src/app/models/response.interface';
import { ApiService } from 'src/app/service/api/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  })


  constructor(private api: ApiService, private router: Router) { }
errorStatus:boolean =false;
errorMsj:any="";

  ngOnInit(): void {
  }
  onRegister(form: RegisterI) {
   this.api.registerUser(form).subscribe(data => {
     console.log(data)
      let dataResponse: ResponseI = data;
      if (dataResponse.status == 'ok') {
        this.Successregister();
        this.router.navigate(['login']);
      }else{
        this.errorStatus=true;
        this.errorMsj="Error al registrar";
        
      }

    })
  }
  Successregister() {
    Swal.fire('Exito', 'Registro Exitoso!', 'success')
}
}
