import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { ResponseI } from 'src/app/models/response.interface';
import { UpdateService } from 'src/app/service/updateComponent/update.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserName: any = "";
  isUserLoggedIn: boolean = false;
  colorForm = new FormGroup({
    color: new FormControl('', Validators.required),
  })

  constructor(private api: ApiService, private router: Router, private dataSharingService: UpdateService, private elementRef: ElementRef) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.dataSharingService.isUserName.subscribe(value => {
      this.isUserName = value;
    });


  }

  ngOnInit(): void {

  }
  onColor(form: any) {
    this.dataSharingService.color.next(form.color.toString());
  }

  onLogout() {
    this.api.Logout().subscribe(data => {
      let dataResponse: ResponseI = data;
      if (dataResponse.status == 'ok') {
        this.router.navigate(['login']);
        this.dataSharingService.isUserLoggedIn.next(false);
        this.dataSharingService.isUserName.next("");
        sessionStorage.clear();
        localStorage.clear();
      }

    })
  }

}
