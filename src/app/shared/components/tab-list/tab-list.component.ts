import {
    Component,
    ContentChildren,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { TabItemDirective } from './tab-item.directive';

@Component({
    selector: 'bfe-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabListComponent {
    @ContentChildren(TabItemDirective)
    tabItems: QueryList<TabItemDirective>;

    constructor() {}
}
