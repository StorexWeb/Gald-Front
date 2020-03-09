import {Component, Input} from '@angular/core';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private _fuseSidebarService: FuseSidebarService) {}

  @Input() fuseConfig: any ;
  @Input() navigation: any;
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
      this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
