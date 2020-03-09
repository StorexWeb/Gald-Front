import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Injectable({
  providedIn: 'root'
})
export class PermissionService {


    private permissionShape = `
       permissions{
          _id,
          name
        }
       
        total
    `;

  constructor(private apollo: Apollo) { }

  getPermissionsList(skip, limit): any {
      return this.apollo.watchQuery({
          query: gql`
              query{
              
                listPermissions(skip: ${skip}, limit: ${limit}){
                   
                    ${this.permissionShape}
              
              }
              
              }
          `,

          fetchPolicy: 'network-only'
      });
  }


}
