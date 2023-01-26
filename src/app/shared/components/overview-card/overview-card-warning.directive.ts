import {
    Directive,
    forwardRef,
    Inject,
    Input,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { OverviewCardComponent } from './overview-card.component';

@Directive({ selector: '[bfeOverviewCardWarning]' })
export class OverviewCardWarningDirective {
    @Input()
    bfeCardContentIsInfo: boolean;

    constructor(
        readonly container: ViewContainerRef,
        readonly template: TemplateRef<any>,
        @Inject(forwardRef(() => OverviewCardComponent))
        card: OverviewCardComponent
    ) {
        card.hasToggledWarnings = true;
        card.showInfo$.subscribe((v) => {
            if (v) {
                this.show();
            } else {
                this.hide();
            }
        });
    }

    private show() {
        this.container.createEmbeddedView(this.template);
    }

    private hide() {
        this.container.clear();
    }
}
