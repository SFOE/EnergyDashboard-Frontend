import { Component, Input } from '@angular/core';

@Component({
    selector: 'bfe-dashboard-collapsible-card',
    templateUrl: './dashboard-collapsible-card.component.html',
    styleUrls: ['./dashboard-collapsible-card.component.scss']
})
export class DashboardCollapsibleCardComponent {
    @Input() cardTitle: string;
    @Input() expandKey: string = 'commons.expand';
    @Input() collapseKey: string = 'commons.collapse';
    @Input() collapsed: boolean = true;
    @Input() collapsedHeight: string;

    get contentHeight(): string {
        if (this.collapsed) {
            return this.collapsedHeight;
        }

        return 'max-content';
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
    }

    toggleCollapseSpace(event: Event): void {
        event.preventDefault();
        this.collapsed = !this.collapsed;
    }
}
