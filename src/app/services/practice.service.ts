// ANGULAR
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Http, Headers } from '@angular/http';
import { ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import {FileInput, Practice} from '../core/models';

@Injectable()
export class PracticeService {
  public url: String;

  constructor(private apollo: Apollo, private http: Http) { }

  private _create = gql`
  mutation createPractices($practice:PracticeInput, $note:String, $attaches:[FileInput]){
    createPractice(practice:$practice, note:$note, attaches:$attaches){       
      _id
    }
  }`;


  private _create_quick = gql`
 
  mutation createQuick($practice:PracticeInput, $note:String, $attaches:[FileInput], $clientFiles: [FileInput]){
    createQuick(practice:$practice, note:$note, attaches:$attaches, clientFiles:$clientFiles){       
      _id
    }
  }`;

  private _edit = gql`
  
  mutation editPractices($practice:PracticeInput, $note:String, $id:ID, $attaches: [FileInput]){
    editPractice(practice:$practice, note:$note, id:$id, attaches:$attaches){       
      _id
    }
  }`;

  private _add_note = gql`
  
  mutation addNote($practice:ID, $note:String){
    addNote(practice:$practice, note:$note,){
      message
    }
    
  }`;

  private _add_user_file = gql`
  
  mutation addUserFile($practice:ID, $file:FileInput, $view_date:DateTime){
    addUserFile(practice:$practice, file:$file, view_date:$view_date){
      message
    }
    
  }`;

  private _commit_client_files = gql`
  
  mutation commitClientFiles($practice:ID, $note:String){
    commitClientFiles(practice:$practice, note:$note){
      message
    }
    
  }`;

  private _create_estimate = gql`
 
  mutation createEstimate($practice:ID, $offers:[OfferInput]){
    createEstimate(practice:$practice, offers:$offers){       
      _id
    }
  }`;


  private _create_final_deal = gql`
  
   mutation createFinalDeal($id:ID, $finalDeal:FinalDealInput){
    createFinalDeal(id:$id, finalDeal:$finalDeal){       
      message
    }
  }
  `;

  private _elimina_file = gql`
  
  mutation elimina_file($file:File_input,$id_pratica:ID!,$stato:String){
    elimina_file(file:$file,id_pratica:$id_pratica,stato:$String){
      message
    }
  }`;

  private _delete = gql`
  
  mutation deletePractice($id:ID!){
    deletePractice(id:$id){
      message
    }
  }`;

  private _reject_request = gql`
  
  mutation rejectRequest($id:ID!, $note:String){
    rejectRequest(id:$id, note:$note){
      message
    }
  }`;

  private _client_reject = gql`
  
  mutation clientReject($id:ID!, $note:String){
    clientReject(id:$id, note:$note){
      message
    }
  }`;

  private _reject_ready_practice = gql`
  
  mutation rejectReadyPractice($id:ID!, $note:String){
    rejectReadyPractice(id:$id, note:$note){
      message
    }
  }`;

  private _estimate_loaded = gql`
  
  mutation estimateLoaded($id:ID!, $note:String){
    estimateLoaded(id:$id, note:$note){
      message
    }
  }`;

  private _loaded_estimate_accept = gql`
  
  mutation loadedEstimateAccept($id:ID!, $note:String){
    loadedEstimateAccept(id:$id, note:$note){
      message
    }
  }`;

  private _loaded_estimate_conditional_accept = gql`
  
  mutation loadedEstimateConditionalAccept($id:ID!, $note:String){
    loadedEstimateConditionalAccept(id:$id, note:$note){
      message
    }
  }`;

  private _loaded_estimate_reject = gql`
  
  mutation loadedEstimateReject($id:ID!, $note:String){
    loadedEstimateReject(id:$id, note:$note){
      message
    }
  }`;

  private _loaded_estimate_trash = gql`
  
  mutation loadedEstimateTrash($id:ID!, $note:String){
    loadedEstimateTrash(id:$id, note:$note){
      message
    }
  }`;

  private _reject_estimate = gql`
  
  mutation rejectEstimate($id:ID!){
    rejectEstimate(id:$id){
      message
    }
  }`;

  private _wait_activation = gql`
  
  mutation waitActivation($id:ID!){
    waitActivation(id:$id){
      message
    }
  }`;


  private _wait_backoffice_activation = gql`
  
  mutation waitBackOfficeActivation($id:ID!){
    waitBackOfficeActivation(id:$id){
      message
    }
  }`;

  private _activate_practice = gql`
  
  mutation activatePractice($id:ID!){
    activatePractice(id:$id){
      message
    }
  }`;

  private _activate_ready_practice = gql`
  mutation activateReadyPractice($id:ID!){
    activateReadyPractice(id:$id){
      message
    }
  }`;

  private _accept_estimate = gql`
  
  mutation acceptEstimate($id:ID!){
    acceptEstimate(id:$id){
      message
    }
  }`;



  private _changeStatus = gql`  
  mutation changeStatus($id:ID!, $status:String){
    changeStatus(id:$id, status:$status){
      message
    }
  }`;

  private practice_view = `
        _id
        infocar
        brand
        model
        supply
        preparation
        optional
        duration
        kilometres
        commission
        advance
        preference_lessee_location
        product
        constructor_code
        franchigia_rca
        theft_deductible
        kasko_franchise
        replacement_car
        tire_replacement
        fuel_card
        delivery_location
        client {
          _id
          name
          surname
          email
          role
        }
        consultant {
          _id
          name
          surname
          email
          role
        }
        createDate
        state
        type
        attaches {
          _id
          name
          size
          type
          date
          key
        }
        actions {
           _id
          type
          description
          note
          user {
            _id
            name
            surname
            email
            role
          }
          date
          type
        }
        offers {
           _id
          file {
            _id
            name
            size
            type
            date
            key
          } 
          idCasaLocatrice
          commission 
          lessor_location 
          discount
          processed
        }
        clientFiles {
          _id
          name
          size
          type
          date
          key
        } 
        finalDeal {
        _id 
        frame
        licensePlate
        sendingDate
        requestDate
        pendingRegistration
        registrationDate
        boardRequestDate
        requestMadeAvailable
        deliveryDate
        disCount
        note
        seller
        ownerHouse
        folderDeliveryDate
       
        }
    `

  elimina_file(file, id_pratica, stato): any {
    return this.apollo.mutate({
      mutation: this._elimina_file,
      variables: {
        file: file,
        id_pratica: id_pratica,
        stato: stato
      }
    });
  }

  delete(id: String, stato): any {
    return this.apollo.mutate({
      mutation: this._delete,
      variables: {
        id: id,
        stato: stato
      }
    });
  }

  rejectRequest(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._reject_request,
      variables: {
        id: id,
        note: note
      }
    });
  }

  clientReject(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._client_reject,
      variables: {
        id: id,
        note: note
      }
    });
  }

  rejectReadyPractice(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._reject_ready_practice,
      variables: {
        id: id,
        note: note
      }
    });
  }

  estimateLoaded(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._estimate_loaded,
      variables: {
        id: id,
        note: note,
      }
    });
  }

  loadedEstimateAccept(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._loaded_estimate_accept,
      variables: {
        id: id,
        note: note,
      }
    });
  }

  loadedEstimateTrash(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._loaded_estimate_trash,
      variables: {
        id: id,
        note: note,
      }
    });
  }

  loadedEstimateConditionalAccept(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._loaded_estimate_conditional_accept,
      variables: {
        id: id,
        note: note,
      }
    });
  }

  loadedEstimateReject(id: String, note): any {
    return this.apollo.mutate({
      mutation: this._loaded_estimate_reject,
      variables: {
        id: id,
        note: note,
      }
    });
  }

  rejectEstimate(id: String): any {
    return this.apollo.mutate({
      mutation: this._reject_estimate,
      variables: {
        id: id,
      }
    });
  }

  acceptEstimate(id: String): any {
    return this.apollo.mutate({
      mutation: this._accept_estimate,
      variables: {
        id: id,
      }
    });
  }

  waitActivation(id: String): any {
    return this.apollo.mutate({
      mutation: this._wait_activation,
      variables: {
        id: id,
      }
    });
  }

  waitBackOfficeActivation(id: String): any {
    return this.apollo.mutate({
      mutation: this._wait_backoffice_activation,
      variables: {
        id: id,
      }
    });
  }

  activatePractice(id: String): any {
    return this.apollo.mutate({
      mutation: this._activate_practice,
      variables: {
        id: id,
      }
    });
  }

  activateReadyPractice(id: String): any {
    return this.apollo.mutate({
      mutation: this._activate_ready_practice,
      variables: {
        id: id,
      }
    });
  }

  create(practice: object, note: String, attaches): any {
    return this.apollo.mutate({
      mutation: this._create,
      variables: {
        note: note,
        practice: practice,
        attaches: attaches
      }
    });
  }

  createQuick(practice: object, note: String, attaches, clientFiles): any {
    return this.apollo.mutate({
      mutation: this._create_quick,
      variables: {
        note: note,
        practice: practice,
        attaches: attaches,
        clientFiles: clientFiles
      }
    });
  }

  edit(practice: object, note: String, id: String, attaches): any {
      return this.apollo.mutate({
          mutation: this._edit,
          variables: {
              note: note,
              practice: practice,
              id: id,
              attaches: attaches
          }
      });
  }

  addNote(practice: Practice, note: String): any {
      return this.apollo.mutate({
          mutation: this._add_note,
          variables: {
              note: note,
              practice: practice._id,
          }
      });
  }

  createEstimate(practice: String, offers): any {
    return this.apollo.mutate({
      mutation: this._create_estimate,
      variables: {
        offers: offers,
        practice: practice
      }
    });
  }

  addUserFile(practice, file, view_date): any  {

    console.log(file);
    console.log(view_date);


      return this.apollo.mutate({
          mutation: this._add_user_file,
          variables: {
              practice: practice._id,
              file: file,
              view_date: view_date
          }
      });
  }

  commitClientFiles(practice, note: String): any  {
      return this.apollo.mutate({
          mutation: this._commit_client_files,
          variables: {
              practice: practice._id,
              note: note
          }
      });
  }


  changeStatus(id, status): any
  {
    return this.apollo.mutate({
        mutation: this._changeStatus,
        variables: {
          id: id,
          status: status
        }
    });
  }


  createFinalDeal(id, finalDeal): any {
    return this.apollo.mutate({
      mutation: this._create_final_deal,
      variables: {
        finalDeal: finalDeal,
        id: id
      }
    });
  }


  listPractices(state, data_shape, skip: number, limit: number, key: string, value: string, type: string = 'PRACTICE'): any {
      return this.apollo.watchQuery({
          query: gql`
                {
                  listPractices(state:[${state}], skip:${skip},limit:${limit},key:"${key}",value:"${value}", type:${type}){
                    ${data_shape}
                  }
                }`,
          fetchPolicy: 'network-only',
      });
  }

  getPracticeAt(id: String, state: String): any {
    return this.apollo.watchQuery({
      query: gql`
                {
                  getPracticeAt(id:"${id}",state:"${state}"){
                    ${this.practice_view}
                  }
                }`,
      fetchPolicy: 'network-only',
    });
  }

  getPractice(id: String): any {
    return this.apollo.watchQuery({
      query: gql`
                {
                  getPractice(id:"${id}"){
                    ${this.practice_view}
                  }
                }`,
      fetchPolicy: 'network-only',
    });
  }

  getPublicPracticeAt(id: String, state: String): any {
    return this.apollo.watchQuery({
      query: gql`
                {
                  getPublicPracticeAt(id:"${id}",state:"${state}"){
                    ${this.practice_view}
                  }
                }`,
      fetchPolicy: 'network-only',
    });
  }

  getCars(): any {
    return this.apollo
      .watchQuery({
        query: gql`
            {
                getCars{
                  brand
                  models
                }
            }
          `,
        fetchPolicy: 'network-only',
      });
  }

  filteredBrands(filtro: String): any {
    return this.apollo
      .watchQuery({
        query: gql`
            {
              filteredBrands(filtro:"${filtro}"){
                  brand
                  models
                }
            }
          `,
        fetchPolicy: 'network-only',
      });
  }
}
