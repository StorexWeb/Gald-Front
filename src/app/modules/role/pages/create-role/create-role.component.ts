import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RoleServiceService} from '../../services/role-service.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {


  verticalStepperStep1: FormGroup;


  constructor(  private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private roleService: RoleServiceService
          ) {
    this.initForm();
  }

  ngOnInit() {

  }

  private initForm(): void {
      this.verticalStepperStep1 = this.formBuilder.group({
        name: ['', Validators.required],
        permissions: ['', Validators.required]
      });
  }
}
