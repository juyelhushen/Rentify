import { Component, ViewChild } from '@angular/core';
import { PropertyReponse } from '../../../models/model';
import { MatPaginator } from '@angular/material/paginator';
import { PropertyService } from '../../../services/property.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liked-property',
  templateUrl: './liked-property.component.html',
  styleUrl: './liked-property.component.css'
})
export class LikedPropertyComponent {

  propertyList: PropertyReponse[] = [];
  userId: number | null = null;

  //paginator
  start = 0;
  end = 0;
  pageSize = 3;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private route : ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      let userid = param?.['userId'];
      console.log(userid);       
    });
  }

  ngOnInit(): void {
    this.getUserIdFromUrl();
    this.getLikedProperty();
  }

  getLikedProperty = () => {
    const userId: number = this.userService.currentUserId;
    this.propertyService.getLikedProperty(userId).subscribe({
      next: (res) => {
        this.propertyList = res;
        this.end = res.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  onPageChange(event: any) {
    this.start = event.pageIndex * event.pageSize;
    this.end = this.start + event.pageSize;
  }

  private getUserIdFromUrl() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        this.userId = parseInt(id, 10); 
        console.log(this.userId);        
      }
    });
  }
}
