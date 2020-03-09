import {Component, Input, ViewEncapsulation} from '@angular/core';
@Component({
    selector     : 'vertical-layout-2',
    templateUrl  : './layout-2.component.html',
    styleUrls    : ['./layout-2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout2Component
{
    @Input() fuseConfig: any;
    @Input() navigation: any;

}
