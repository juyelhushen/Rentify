import { Component } from '@angular/core';
import { Property } from '../../../models/model';
import { PropertyService } from '../../../services/property.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-property',
  templateUrl: './upload-property.component.html',
  styleUrl: './upload-property.component.css',
})
export class UploadPropertyComponent {
  
  propertyRequest: Property = {
    type: '',
    place: '',
    area: '',
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    nearbyHospitals: '',
    nearbyColleges: '',
  };

  selectedFile!: File;

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  onSubmit(): void {
    const userid = this.userService.currentUserId;

    this.propertyService
      .addProperty(userid, this.propertyRequest, this.selectedFile)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.resetForm();

        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  resetForm = () => {
    this.propertyRequest = {
      type: '',
      place: '',
      area: '',
      numberOfBedrooms: 0,
      numberOfBathrooms: 0,
      nearbyHospitals: '',
      nearbyColleges: '',
    };
  }
}