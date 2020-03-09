import {Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
    selector     : 'horizontal-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalLayout1Component
{
    @Input() fuseConfig: any;
    @Input() navigation: any;
}
