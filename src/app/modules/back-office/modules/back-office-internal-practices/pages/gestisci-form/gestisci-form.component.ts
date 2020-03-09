import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FinalDealInput, Practice} from '../../../../../../core/models';
import {ActivatedRoute, Router} from '@angular/router';
import {PracticeService} from '../../../../../../services/practice.service';
import {error} from 'util';
import {AlertService} from '../../../../../../services/alert.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-gestisci-form',
  templateUrl: './gestisci-form.component.html',
  styleUrls: ['./gestisci-form.component.scss']
})
export class GestisciFormComponent implements OnInit {

  verticalStepperStep1: FormGroup;
  saved = false;
  practice: Practice;
  finalDeal: FinalDealInput;
  from: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private practiceService: PracticeService,
      private alertService: AlertService
  ) {
    this.practice = new Practice(this.route.snapshot.data.data);
    this.finalDeal = this.route.snapshot.data.data.finalDeal;
    this.from = this.route.snapshot.paramMap.get('from');
    if (this.finalDeal == null) {
      this.finalDeal = new FinalDealInput();
      this.initForm();
    }else {
      this.initFormWithFinalDeal();
    }
  }


  private initForm(): void{
    this.verticalStepperStep1 = this.formBuilder.group({
      deal: [{value: this.practice.offers[0].idCasaLocatrice, disabled: true}, Validators.required],
      veicolo: [{value: this.practice.brand + '-' + this.practice.model, disabled: true}, Validators.required],
      client: [{value: this.practice.client.name + ' ' + this.practice.client.surname, disabled: true}, Validators.required],
      frame: ['', Validators.required],
      licensePlate: ['', Validators.required],
      sendingDate: ['', Validators.required],
      requestDate: ['', Validators.required],
      pendingRegistration: ['', Validators.required],
      registrationDate: ['', Validators.required],
      boardRequestDate: ['', Validators.required],
      requestMadeAvailable: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      disCount: ['', Validators.required],
      note: ['', Validators.required],
      seller: ['', Validators.required],
      ownerHouse: ['', Validators.required],
      folderDeliveryDate: ['', Validators.required],
    });
  }


  ngOnInit() {

  }


  save(): void{
    this.initFinalDeal();

    this.practiceService.createFinalDeal(this.practice._id, this.finalDeal).subscribe(
       data => {
         this.alertService.alert('success', 'Done !', 'Final deal saved' );
         this.saved = true;

         if(this.from == 2)
           this.router.navigate(['backoffice/list/pratiche-concluse']);

       }, error => {
         this.alertService.alert('error', 'Oops!', 'Something went wrong!');
       }
   );

  }


  initFinalDeal(): void{
    this.finalDeal.frame = this.verticalStepperStep1.value.frame;
    this.finalDeal.licensePlate = this.verticalStepperStep1.value.licensePlate;
    this.finalDeal.sendingDate =  this.verticalStepperStep1.value.sendingDate;
    this.finalDeal.requestDate = this.verticalStepperStep1.value.requestDate;
    this.finalDeal.pendingRegistration = this.verticalStepperStep1.value.pendingRegistration;
    this.finalDeal.registrationDate =  this.verticalStepperStep1.value.registrationDate;
    this.finalDeal.boardRequestDate = this.verticalStepperStep1.value.boardRequestDate;
    this.finalDeal.requestMadeAvailable = this.verticalStepperStep1.value.requestMadeAvailable;
    this.finalDeal.deliveryDate = this.verticalStepperStep1.value.deliveryDate;
    this.finalDeal.disCount = this.verticalStepperStep1.value.disCount;
    this.finalDeal.note = this.verticalStepperStep1.value.note;
    this.finalDeal.seller = this.verticalStepperStep1.value.seller;
    this.finalDeal.ownerHouse = this.verticalStepperStep1.value.ownerHouse;
    this.finalDeal.folderDeliveryDate = this.verticalStepperStep1.value.folderDeliveryDate;
  }


  toNextState(): void {
    this.practiceService.changeStatus(this.practice._id, 'PRATICH_CONCLUSE').subscribe(
        date => {
          this.alertService.alert('success', 'Done !', 'Status Changed to ' + 'PRATICH_CONCLUSE');
          this.router.navigate(['backoffice/list/pratiche-concluse']);
        }, error => {
          this.alertService.alert('error', 'Oops!', 'Something went wrong!');
        }
    );
  }

  private initFormWithFinalDeal(): void {

    console.log();

    this.verticalStepperStep1 = this.formBuilder.group({
      deal: [{value: this.practice.offers[0].idCasaLocatrice, disabled: true}, Validators.required],
      veicolo: [{value: this.practice.brand + '-' + this.practice.model, disabled: true}, Validators.required],
      client: [{value: this.practice.client.name + ' ' + this.practice.client.surname, disabled: true}, Validators.required],
      frame: [this.finalDeal.frame, Validators.required],
      licensePlate: [this.finalDeal.licensePlate, Validators.required],
      sendingDate: [this.finalDeal.sendingDate, Validators.required],
      requestDate: [this.finalDeal.requestDate, Validators.required],
      pendingRegistration: [this.finalDeal.pendingRegistration, Validators.required],
      registrationDate: [this.finalDeal.registrationDate, Validators.required],
      boardRequestDate: [this.finalDeal.boardRequestDate, Validators.required],
      requestMadeAvailable: [this.finalDeal.requestMadeAvailable, Validators.required],
      deliveryDate: [this.finalDeal.deliveryDate, Validators.required],
      disCount: [this.finalDeal.disCount, Validators.required],
      note: [this.finalDeal.note, Validators.required],
      seller: [this.finalDeal.seller, Validators.required],
      ownerHouse: [this.finalDeal.ownerHouse, Validators.required],
      folderDeliveryDate: [this.finalDeal.folderDeliveryDate, Validators.required],
    });
  }


}
