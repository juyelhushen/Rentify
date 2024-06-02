import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyReponse } from '../../../models/model';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {
  @Input('houseList')
  houseList!: PropertyReponse;

  @Output() 
  likeClicked = new EventEmitter<number>();

  @Output()
  interedClick = new EventEmitter<number>();

  constructor() {}

  doLike() {
    this.likeClicked.emit(this.houseList.id);
  }

  onClickOnInterest = () => {
    this.interedClick.emit(this.houseList.userId);
  }
}
