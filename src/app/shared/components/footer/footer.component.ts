import { Component, ViewEncapsulation } from '@angular/core';

// import { UriService } from '../../../core/uri.service'

@Component({
    selector: 'bfe-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
    // readonly downloads = this.uriService.getDownloadDefinitions()
    // constructor(private readonly uriService: UriService) {}
}
