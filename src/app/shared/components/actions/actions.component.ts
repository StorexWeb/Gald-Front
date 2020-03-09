import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '../../../core/models/utility.model';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Output() onAction = new EventEmitter<any>();
  @Input() list ;
  @Input() element ;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  click(event): void{

      console.log('Event', event);

    this.onAction.emit(event);
    if ( typeof event.route === 'function' ){
      console.log(this.element._id);
      this.router.navigate(event.route(new Action(this.element._id, event)));
    }
    return this.onAction.emit(event);
  }

  visible(action): boolean {

      if (typeof action.hide === 'function') {
          return !action.hide(this.element);
      }



       return !(action.action === 'accept_const' && this.element.estimatedWithOffer === true);


  }

}
