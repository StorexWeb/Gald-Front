import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'vertical-layout-3',
    templateUrl  : './layout-3.component.html',
    styleUrls    : ['./layout-3.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout3Component
{
    @Input() fuseConfig: any;
    @Input() navigation: any;
}
