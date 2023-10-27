import { Component, Input } from '@angular/core';
import { QueryParamService } from '../../../services/queryparams/queryparams.service';
@Component({
    selector: 'bfe-info-page',
    templateUrl: './info-page.component.html',
    styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent {
    @Input() title: string;
    appView: boolean = false;
    ngOnInit(): void {
        this.appView = this.queryParamService.isAppView();
    }
    constructor(private queryParamService: QueryParamService) {}
}
