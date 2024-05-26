import { Component } from '@angular/core';
import { PropertyReponse } from '../../../models/model';
import { PropertyService } from '../../../services/property.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  propertyList: PropertyReponse[] = [];
  displayedColumns: string[] = [
    'Type',
    'Place',
    'Area',
    'NoOfBedRoom',
    'NoOfBathRoom',
    'NearByHospital',
    'NearbyCollege',
    'Action',
  ];

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPropertyListByUserId();
  }

  getPropertyListByUserId() {
    let userId = this.userService.currentUserId;
    this.propertyService.getPropertyListByLandlordId(userId).subscribe({
      next: (res) => {
        this.propertyList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleEditBook(data: any) {
    throw new Error('Method not implemented.');
  }

  deleteCategory(propertyId: any) {
    this.propertyService.deleteProperty(propertyId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPropertyListByUserId();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  
}
