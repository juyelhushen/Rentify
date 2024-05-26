import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLandlord!:boolean;

  userId!:number;

  constructor(private userService:UserService,
    private route : ActivatedRoute
  ) {
    let userid = this.route.snapshot.params?.['userId'];
    console.log(userid);
    
  }

  ngOnInit(): void {
  const role : Role = this.userService.userRoles;
  if(Role.LANDLORD === role) this.isLandlord = true;
  }


  
}
