import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoutePaths } from '../../core/navigation/route-paths.enum';

@Component({
    selector: 'bfe-integration-guide',
    templateUrl: './integration-guide.component.html',
    styleUrls: ['./integration-guide.component.scss']
})
export class IntegrationGuideComponent implements OnInit {
    integrationUrl = `${environment.rootUrl}/${RoutePaths.EMBED}`;
    screenWidth: number;

    public SCREEN_WIDTH_RESPONSIVE_BREAKPOINT: number = 1000;

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.screenWidth = window.innerWidth;
    }
}
