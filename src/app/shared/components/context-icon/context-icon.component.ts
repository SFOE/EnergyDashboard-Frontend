import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    IconName,
    IconProp,
    SizeProp
} from '@fortawesome/fontawesome-svg-core';
import { Context } from '../../../core/models/context.enum';

@Component({
    selector: 'bfe-context-icon',
    templateUrl: './context-icon.component.html',
    styleUrls: ['./context-icon.component.scss']
})
export class ContextIconComponent implements OnChanges {
    @Input() context: Context;
    @Input() size: SizeProp;

    icon: IconName | IconProp;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['context'] && this.context) {
            switch (this.context) {
                case Context.STROM:
                    this.icon = 'bolt';
                    break;
                case Context.GAS:
                    this.icon = 'fire-flame';
                    break;
                case Context.PREISE:
                    this.icon = 'coins';
                    break;
                case Context.WETTER:
                    this.icon = 'sun-cloud';
                    break;
                case Context.HOLZ:
                    this.icon = 'brennholz' as IconProp;
                    break;
                case Context.FERNWAERME:
                    this.icon = 'fernwaerme' as IconProp;
                    break;
                case Context.OEL:
                case Context.BENZIN:
                case Context.DIESEL:
                    this.icon = 'droplet';
                    break;
            }
        }
    }
}
