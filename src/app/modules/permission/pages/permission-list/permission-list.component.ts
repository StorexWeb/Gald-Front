import { Component, OnInit, Injectable } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface Section {
  name: string;
  updated: number;
}


@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PermissionListComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name'];
  expandedElement: PeriodicElement | null;

  ngOnInit() {

  }

  constructor() {
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  permissions: any[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Users Permissions',
    weight: 1.0079,
    symbol: 'H',
    permissions: [
      {id: 'ag2sa12as', name: 'Create User'},
      {id: 'ag2sa12as', name: 'Update User'},
      {id: 'ag2sa12as', name: 'Delete User'},
      {id: 'ag2sa12as', name: 'Assign User'},
    ]
  },

  {
    position: 2,
    name: 'Clients Permissions',
    weight: 1.0079,
    symbol: 'H',
    permissions: [
      {id: 'ag2sa12as', name: 'Create Client'},
      {id: 'ag2sa12as', name: 'Update Client'},
      {id: 'ag2sa12as', name: 'Delete Client'},
      {id: 'ag2sa12as', name: 'Assign Client'},
    ]
  }
];

