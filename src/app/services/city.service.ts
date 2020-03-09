import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CityService {

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer) {
  }

  getCities(): any {
    return this.apollo.watchQuery({
      query: gql`
              {
                getCities{
                        name
                        commons{
                          name
                        }
                  }
              }
              `,
      fetchPolicy: 'network-only',
    });
  }

  filterProvince(filter: String): any {
    return this.apollo
      .watchQuery({
        query: gql`
                {
                  filterCities(filter:"${filter}"){
                      name
                      commons{
                        name
                      }
                    }
                }
              `,
        fetchPolicy: 'network-only',
      });
  }

  filterCommons(filter: String): any {
    return this.apollo
      .watchQuery({
        query: gql`
                {
                  filterCities(filter:"${filter}"){
                      commons{
                        name
                      }
                    }
                }
              `,
        fetchPolicy: 'network-only',
      });
  }
}
