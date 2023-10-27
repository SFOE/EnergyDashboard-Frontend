import { Component, OnInit } from '@angular/core';
import { navigationLinks } from '../../../core/navigation/nav-links.const';

@Component({
    selector: 'bfe-page-top-navigation',
    templateUrl: './page-top-navigation.component.html',
    styleUrls: ['./page-top-navigation.component.scss']
})
export class PageTopNavigationComponent implements OnInit {
    links = navigationLinks;

    constructor() {}

    ngOnInit(): void {}
}
