import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/models/login.interface';
import { RegisterI } from 'src/app/models/register.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string="https://apirest24.herokuapp.com/api/auth/"
  constructor(private http:HttpClient) { }

  loginByemail(form:LoginI):Observable<ResponseI>{
    let address=this.url+"login";
    return this.http.post<ResponseI>(address,form);
  }
  registerUser(form:RegisterI):Observable<ResponseI>{
    let address=this.url+"signup";
    return this.http.post<ResponseI>(address,form);
  }
  Logout():Observable<ResponseI>{
    let address=this.url+"logout";
    return this.http.get<ResponseI>(address,{headers:new HttpHeaders({Authorization:'Bearer '+localStorage.getItem('token')})});
  }
}
