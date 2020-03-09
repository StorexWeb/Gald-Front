import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class VerticalLayout1Component
{
    @Input() fuseConfig: any;

    @Input() navigation: any;
}
