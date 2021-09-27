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

    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = form.color;


    let rawFontColor = form.color.substring(1, form.color.length());
    var rgb = parseInt(rawFontColor, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >> 8) & 0xff;  // extract green
    var b = (rgb >> 0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = "#84c732";  // pick a different colour
    }else{
      this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = "#348feb"; 
    }

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
