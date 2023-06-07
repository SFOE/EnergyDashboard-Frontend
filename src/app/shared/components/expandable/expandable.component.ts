import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Context } from 'src/app/core/models/context.enum';
import { take } from 'rxjs';
import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
    selector: 'bfe-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements AfterViewInit {
    readonly MAX_HEIGHT_WITHOUT_EXPANSION_BREAKPOINT: number = 80;
    @ViewChild('container') container: ElementRef;

    expanded = false;
    showExpandIcon = false;

    constructor(private translationService: TranslationService) {}

    ngAfterViewInit() {
        this.translationService.isTranslationLoaded
            .pipe(take(1))
            .subscribe(() => {
                setTimeout(() => {
                    this.showExpandIcon =
                        this.container.nativeElement.scrollHeight >
                        this.MAX_HEIGHT_WITHOUT_EXPANSION_BREAKPOINT;
                });
            });
    }

    toggleExpand() {
        if (!this.showExpandIcon) {
            return;
        }

        this.expanded = !this.expanded;
        if (this.expanded) {
            this.container.nativeElement.style.maxHeight = 'none';
        } else {
            this.container.nativeElement.style.maxHeight =
                this.MAX_HEIGHT_WITHOUT_EXPANSION_BREAKPOINT + 'px';
        }
    }
}
