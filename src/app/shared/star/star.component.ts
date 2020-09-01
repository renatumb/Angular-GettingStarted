import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {
  @Input('ratingProperty')
  rating: number;
  startWidth: number;

  @Output()
  ratingClicked: EventEmitter< string > = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.startWidth = this.rating * 75 / 5;
  }

  functionOnClick(): void {
    this.ratingClicked.emit( '' + new Date() );

  }
}
