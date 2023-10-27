import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import { QueryParamService } from '../services/queryparams/queryparams.service';

@Component({
    selector: 'bfe-main-application',
    templateUrl: './main-application.component.html',
    styleUrls: ['./main-application.component.scss']
})
export class MainApplicationComponent implements OnInit {
    appView: boolean = false;

    constructor(private queryParamService: QueryParamService) {}

    ngOnInit(): void {
        this.appView = this.queryParamService.isAppView();
    }
    @ViewChild('stickyNavigation') menuElement: ElementRef;
    stickyShadow: boolean = false;

    menuPosition: any;
    ngAfterViewInit() {
        this.menuPosition = this.menuElement?.nativeElement?.offsetTop;
    }
    @HostListener('window:scroll', ['$event'])
    handleScroll() {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= this.menuPosition) {
            this.stickyShadow = true;
        } else {
            this.stickyShadow = false;
        }
    }
}
