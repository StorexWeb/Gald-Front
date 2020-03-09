// ANGULAR
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor(private apollo: Apollo) {
  }

  private _create = gql`
    mutation createNewRole($role: RoleInput){
      createNewRole(role: $role){
        _id
      }
   } `;



  private roleShape = `
       roles{
              _id
              name
              permissions{
                _id
                name
              }
            }
            total
         }`;



  createNewRole(role): any{
    return this.apollo.mutate({
        mutation: this._create,
        variables: {
          role: role
        }
    });
  }





  getRoleList(skip, limit): any {

      return this.apollo.watchQuery({
          query: gql`
            {
                 listRoles(skip: ${skip}, limit: ${limit}){
                      ${this.roleShape}
                  } `,

        fetchPolicy: 'network-only'
      });


  }


}
