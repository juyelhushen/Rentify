import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mail, Property, PropertyReponse } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addProperty = (
    userid: number,
    property: Property,
    image: File
  ): Observable<String> => {
    const formData: FormData = new FormData();
    formData.append('property', JSON.stringify(property));
    formData.append('image', image);

    return this.http.post<string>(
      this.url + '/api/property/add/' + userid,
      formData);
  };

  getPropertyListByLandlordId = (
    userid: number
  ): Observable<Array<PropertyReponse>> => {
    return this.http.get<Array<PropertyReponse>>(
      this.url + '/api/property/' + userid
    );
  };

  getAllProperty = (): Observable<Array<PropertyReponse>> => {
    return this.http.get<Array<PropertyReponse>>(
      this.url + '/api/property/lists'
    );
  };

  updatePropertyDetails = (
    propertyid: number,
    property: Property
  ): Observable<PropertyReponse> => {
    return this.http.put<PropertyReponse>(
      this.url + '/api/property/update/' + propertyid,
      property
    );
  };

  deleteProperty = (propertyid: number): Observable<string> => {
    return this.http.delete(this.url + '/api/property/delete/' + propertyid, {
      responseType: 'text',
    });
  };

  sendMail = (data: Mail): Observable<String> => {
    return this.http.post(this.url + '/api/property/sendmail', data, {
      responseType: 'text',
    });
  };

  likedProperty = (propertyId: number): Observable<PropertyReponse> => {
    return this.http.get<PropertyReponse>(
      this.url + '/api/property/like/' + propertyId
    );
  };

  getTotalLikes = (propertyid: number): Observable<number> => {
    return this.http.get<number>(
      this.url + '/api/property/getTotalLikes/' + propertyid
    );
  };

  searchProperty = (keyword: string): Observable<Array<PropertyReponse>> => {
    return this.http.get<Array<PropertyReponse>>(
      this.url + '/api/property/search/' + keyword
    );
  };

  getLikedProperty = (userid: number): Observable<Array<PropertyReponse>> => {
    return this.http.get<Array<PropertyReponse>>(
      this.url + '/api/property/liked/' + userid
    );
  };
}
