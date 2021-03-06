import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateService } from 'src/app/service/updateComponent/update.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUserLoggedIn: boolean=false;
  color: any = "";


  constructor(private dataSharingService:UpdateService, private router:Router) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
  this.dataSharingService.color.subscribe(value => {
    this.color = value;
  });

   }

  ngOnInit(): void {
    if(!this.isUserLoggedIn)
    this.router.navigate(['login']);
  }

}
