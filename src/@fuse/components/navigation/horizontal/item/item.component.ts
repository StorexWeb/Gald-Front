import { Component, HostBinding, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector   : 'fuse-nav-horizontal-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class FuseNavHorizontalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: any;

    /**
     * Constructor
     */
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ){
        this.matIconRegistry.addSvgIcon(
            'test',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/galdierirent/pittogramma_galdierirent.svg')
        );

        console.log('Used');
    }
}
