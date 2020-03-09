import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  dummyData = {
      users: [
        {id: 1, name: 'Create User'},
        {id: 2, name: 'Update User'}
      ],

      clients: [
        {id: 1, name: 'Create Client'},
        {id: 2, name: 'Update Client'}
      ],

      practice: [
        {id: 1, name: 'Create Practice'},
        {id: 2, name: 'Update Practice'}
      ]
  };

  constructor() {

  }

  ngOnInit() {



  }

}
