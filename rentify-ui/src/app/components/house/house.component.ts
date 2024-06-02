import { Component, ViewChild } from '@angular/core';
import { Mail, PropertyReponse } from '../../models/model';
import { MatPaginator } from '@angular/material/paginator';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SellerDetailsComponent } from './seller-details/seller-details.component';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent {
  houseList: PropertyReponse[] = [];

  landlordDetail: any = {
    fullname: '',
    email: '',
    phoneNumber: '',
  };

  filteredHouseList: PropertyReponse[] = [];
  types: string[] = ['1BHK', '2BHK', '3BHK', '4BHK'];
  noOfBedrooms: number[] = [1, 2, 3, 4];
  noOfBathRoom: number[] = [1, 2, 3];
  selectedType: string = '';
  selectedBedRooms: number = 0;
  selectedBathRooms: number = 0;

  //paginator
  start = 0;
  end = 0;
  pageSize = 3;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllHouseList();
  }

  getAllHouseList = () => {
    this.propertyService.getAllProperty().subscribe({
      next: (res: PropertyReponse[]) => {
        this.houseList = res;
        this.end = res.length;
        this.applyFilters();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  applyFilters() {
    this.filteredHouseList = this.houseList.filter((house) => {
      let matchesType = !this.selectedType || house.type === this.selectedType;
      let matchesBathrooms =
        !this.selectedBathRooms ||
        house.numberOfBathrooms === this.selectedBathRooms;
      let matchesBedRoom =
        !this.selectedBedRooms ||
        house.numberOfBedrooms === this.selectedBedRooms;

      return matchesType && matchesBathrooms && matchesBedRoom;
    });
  }

  resetFilters() {
    this.selectedType = '';
    this.selectedBathRooms = 0;
    this.selectedBedRooms = 0;
    this.applyFilters();
  }

  handleOnClickedInterest = async (userId: number) => {
    if (this.userService.isLoggedIn()) {
      let data: Mail = {
        to: this.userService.currentUserEmail.toString(),
        landlordId: userId,
      };

      await this.getLandlordDetails(userId);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.panelClass = 'seller-details.component';
      dialogConfig.data = {
        fullname: this.landlordDetail.fullname,
        email: this.landlordDetail.email,
        phonenumber: this.landlordDetail.phoneNumber,
      };
      dialogConfig.width = '400px';
      dialogConfig.height = 'auto';

      let dialogRef = this.dialog.open(SellerDetailsComponent, dialogConfig);
      dialogRef.afterOpened().subscribe(() => {
        this.handleSendMail(data);

        const routerSub = this.router.events.subscribe(() => {
          dialogRef.close();
          routerSub.unsubscribe();
        });
      });
    } else {
      alert('You need to login first.');
      this.router.navigate(['/user/login']);
    }
  };

  handleSendMail = (data: Mail) => {
    this.propertyService.sendMail(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  getLandlordDetails = async (userId: number): Promise<void> => {
    try {
      const details = await this.userService.getUserById(userId).toPromise();
      if (details) {
        this.landlordDetail.fullname =
          details.firstname + ' ' + details.lastname;
        this.landlordDetail.email = details.email;
        this.landlordDetail.phoneNumber = details.phoneNumber;
      }
    } catch (error) {
      console.error('Failed to fetch landlord details:', error);
    }
  };

  onLikeClicked(propertyId: number) {
    if (this.userService.isLoggedIn()) {
      this.propertyService.likedProperty(propertyId).subscribe({
        next: (res) => {
          console.log(res);
          this.updateHouseList(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert('You need to login first.');
      this.router.navigate(['/user/login']);
    }
  }

  updateHouseList(updatedProperty: PropertyReponse) {
    const index = this.houseList.findIndex(
      (house) => house.id === updatedProperty.id
    );
    if (index !== -1) {
      this.houseList[index] = updatedProperty;
      this.applyFilters();
    }
  }

  onPageChange(event: any) {
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
  }
}
