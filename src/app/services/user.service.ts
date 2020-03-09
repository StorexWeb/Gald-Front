import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../core/models';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  public CurrentUser: User;
  utente = JSON.parse(localStorage.getItem('utente'));
  private modelUser: User;
  private modelPoint: User;
  public userUpdate: User;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  // cache user
  private userCache = new BehaviorSubject<User>(null);
  userStorage = this.userCache.asObservable();

  // cache user
  private userClientCache = new BehaviorSubject<User>(null);
  userClientStorage = this.userClientCache.asObservable();

  private currentUserCache = new BehaviorSubject<User>(null);
  curretUserStorage = this.currentUserCache.asObservable();

  _user_full_view = `
      _id
      state
      name
      area_manager{
        username
        email
        name
        surname
      }
      surname
      email
      password
      role
      phone
      mobile
      title 
      company
      address 
      cap 
      province 
      common 
      cf 
      piva 
      seat{
        address
        cap
        province
        common
      }
      seat_point{
        address
        cap
        province
        common
      }
      token
      profile_img
      regionesociale
      client_type
      inizioattivita
      point_name
      consultant{
        username
        name
        surname
  `
  _delete = gql`mutation elimina_utente($id:ID!){
    deleteUser(id:$id){
          message
        }
      }`;

  _create = gql`mutation createUser($user:UserInput){
    createUser(user:$user){
          message
        }
      }
        `;

  _edit_profile = gql`mutation editProfile($profile:ProfileInput){
    editProfile(profile:$profile){
          message
        }
      }
    `;

   _upload = gql`
    mutation carica_img_profilo($file: Upload,$_id:String){
      carica_img_profilo(file:$file,_id:$_id)
    }`;


  _list_clients = gql`
    mutation listClients($skip:Int,$limit:Int,$filterValue:String,$filterKey:String){
      listClients(skip:$skip,limit:$limit,filterValue:$filterValue,filterKey:$filterKey){            
        users{
          _id  
          img 
          name 
          surname 
          email 
          state 
          role    
          mobile 
          title 
          company 
          address 
          cap 
          province 
          common 
          cf 
          piva  
          seat{
            address
            province
            common
            cap
          }
          point_name
          date
          regionesociale 
          client_type 
          inizioattivita 
          consultant{
              username
              name
              surname
          }
          
        }
        n_users
      }
    }`;

  _list_users = gql`
    mutation listUsers($skip:Int,$limit:Int,$filterValue:String,$filterKey:String){
      listUsers(skip:$skip,limit:$limit,filterValue:$filterValue,filterKey:$filterKey){       
        users{
          _id
          img
          name
          surname
          username
          password
          email
          state
          role
          profile_img
          room
          phone
          mobile
          title
          company
          address
          cap
          province
          common
          cf
          piva
          token
          seat{
            address
            cap
            province
            common
          }
          seat_point{
            address
            cap
            province
            common
          }
          point_name
          date
          regionesociale
          client_type
          inizioattivita
          consultant{
            username
            name
            surname
          }
          area_manager{
            username
          }
          point_name
        }
        n_users
      }
    }`;

  // constructor(private store: Store<AppState>, private apollo: Apollo) {}
  constructor(private apollo: Apollo, private http: Http, private sanitizer: DomSanitizer) {
      this.setUser(new User());
  }

  listUsers(skip: number, limit: number, filterKey: String, filterValue: String ): any {
    return this.apollo.mutate({
      mutation: this._list_users,
      variables: {
        skip: skip,
        limit: limit,
        filterValue: filterValue,
        filterKey: filterKey,
      }
    });
  }


  listClients(skip, limit, filterKey: String, filterValue: String): any {
    return this.apollo.mutate({
      mutation: this._list_clients,
      variables: {
        skip: skip,
        limit: limit,
        filterValue: filterValue,
        filterKey: filterKey,
      }
    });
  }


  create(user: User): any {
    user.username = user.email;
    return this.apollo.mutate({
      mutation: this._create,
      variables: {
        user: user
      }
    });
  }

  delete(_id: string): any {
    return this.apollo.mutate({
      mutation: this._delete,
      variables: {
        id: _id
      }
    });
  }
  getCurrentUserData(): any{
      return this.apollo.watchQuery({query: gql`
          query{
            getCurrentUserData{
                ${this._user_full_view}
              }
            }
          }
          `, fetchPolicy: 'network-only',
      });
  }
  getUserById(id: String): any {
    return this.apollo.watchQuery({query: gql`
          query{
            getUserById(id:"${id}"){
                ${this._user_full_view}
              }
            }
          }
          `, fetchPolicy: 'network-only',
      });
  }

  client_autocomplete(filter): any {
    return this.apollo
      .watchQuery({
        query: gql`
      query{
        client_autocomplete(filter:"${filter}"){
            _id
            name
            surname
            email
            cf
            title
            province
            address
        }
      }
      `, fetchPolicy: 'network-only',
      });
  }





  area_manager_autocomplete(filter: String): any {
    return this.apollo
      .watchQuery({
        query: gql`
      query{
        area_manager_autocomplete(filter:"${filter}"){
          _id
          state
          name
          surname
          email
          role
          phone
          mobile
          title 
          company
          address 
          cap 
          province 
          common 
          cf 
          piva 
          password
          seat{
            address
            cap
            province
            common
          }
          seat_point{
            address
            cap
            province
            common
          }
          regionesociale
          client_type
          inizioattivita
          point_name
          consultant{
            username
          }
        }
      }
      `, fetchPolicy: 'network-only',
      });
  }


    /****************************************************************************************************************/
    /************************************************('metodo per ilpaginatore')*************************************/
    /***************************************************************************************************************/
  setcurrentUser(user) {
      this.currentUserCache.next(user);
  }

  setUser(user) {
      this.userCache.next(user);
  }
  setClient(user) {
      this.userClientCache.next(user);
  }
  setPoint(user) {
      // console.log("set:",user);
      this.modelPoint = user;
      console.log(this.modelPoint);
  }
  getPoint(): User {
      // console.log("get:",this.modelUser);
      return this.modelPoint;
  }

  upload(file, _id): any {
      console.log('upload',file,_id);
      return this.apollo.mutate({
          mutation: this._upload,
          variables: {
              file: file,
              _id: _id,
          }
      });
  }

  updateProfile(user: User): any {
      return this.apollo.mutate({
          mutation: this._edit_profile,
          variables: {
              profile: user
          }
      });
  }



  ricerca_point(): any {
    return this.apollo
      .watchQuery({
        query: gql`
        query{
          ricerca_point{
            _id
          }
        }
        `, fetchPolicy: 'network-only',
      });
  }

  /********************************************************************************************************************************************** */


}
