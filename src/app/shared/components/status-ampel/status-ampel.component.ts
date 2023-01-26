import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconName, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';
import { Context } from '../../../core/models/context.enum';
import {
    AmpelEntry,
    AmpelService
} from '../../../services/ampel/ampel.service';
import { COLORS_AMPEL_BORDER } from '../../commons/colors.const';
import { Breakpoints } from '../../static-utils/breakpoints.enum';

@Component({
    selector: 'bfe-status-ampel',
    templateUrl: './status-ampel.component.html',
    styleUrls: ['./status-ampel.component.scss']
})
export class StatusAmpelComponent implements OnChanges {
    @Input() context: Context;

    ampelEntry$: Observable<AmpelEntry>;
    iconSize: SizeProp = '2xl';
    textHidden: boolean = false;

    private mobileView: boolean = false;

    get dynamicTextPrefix(): string {
        switch (this.context) {
            case Context.GAS:
                return 'dynamic:ampel-gas_stufe-';
            case Context.STROM:
                return 'dynamic:ampel-strom_stufe-';
            case Context.PREISE:
            case Context.OEL:
            case Context.BENZIN:
            case Context.DIESEL:
            case Context.HOLZ:
            case Context.FERNWAERME:
            case Context.WETTER:
                return ''; // No Ampel for Preise & Wetter
        }
    }

    constructor(
        private readonly ampelService: AmpelService,
        breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver
            .observe(`(max-width: ${Breakpoints.MIN_LG}px)`)
            .subscribe((result) => {
                this.mobileView = result.matches;
                if (result.matches) {
                    this.iconSize = 'lg';
                    this.textHidden = true;
                } else {
                    this.iconSize = '2xl';
                    this.textHidden = false;
                }
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['context'] && !!this.context) {
            this.ampelEntry$ = this.ampelService.getAmpelEntry(this.context);
        }
    }

    getWarnIcon(level: number): IconName | null {
        if (level === 2) {
            return 'exclamation';
        } else if (level > 2) {
            return 'exclamation-triangle';
        }

        return null;
    }

    getInfoIconColor(level: number): string {
        switch (level) {
            case 1:
                return COLORS_AMPEL_BORDER.LEVEL_1;
            case 2:
                return COLORS_AMPEL_BORDER.LEVEL_2;
            case 3:
                return COLORS_AMPEL_BORDER.LEVEL_3;
            case 4:
                return COLORS_AMPEL_BORDER.LEVEL_4;
            case 5:
                return COLORS_AMPEL_BORDER.LEVEL_5;
        }

        return '#000';
    }

    toggleText(): void {
        if (this.mobileView) {
            this.textHidden = !this.textHidden;
        }
    }

    toggleTextSpace(event: Event): void {
        event.preventDefault();
        if (this.mobileView) {
            this.textHidden = !this.textHidden;
        }
    }
}
