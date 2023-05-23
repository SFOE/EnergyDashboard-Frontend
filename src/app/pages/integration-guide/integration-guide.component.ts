import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoutePaths } from '../../core/navigation/route-paths.enum';

@Component({
    selector: 'bfe-integration-guide',
    templateUrl: './integration-guide.component.html',
    styleUrls: ['./integration-guide.component.scss']
})
export class IntegrationGuideComponent {
    integrationUrl = `${environment.rootUrl}/${RoutePaths.EMBED}`;
}
