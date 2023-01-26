import { Component, OnInit } from '@angular/core';
import { navigationLinks } from '../../../core/navigation/nav-links.const';

@Component({
    selector: 'bfe-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
    links = navigationLinks;

    constructor() {}

    ngOnInit(): void {}
}
