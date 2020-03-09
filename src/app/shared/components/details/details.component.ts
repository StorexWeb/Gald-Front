import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';

export interface KeyValue {
  key: any;
  value: any;
} ;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() dataSource: KeyValue[] = [];

  labels = ['DESCRIZIONE', 'VALORE']
  keys = ['key', 'value'];

  constructor() { }

  ngOnInit(): void {
  }
}
