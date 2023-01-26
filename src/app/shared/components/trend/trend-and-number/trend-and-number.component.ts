import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { Trend, TrendRating } from '../../../../core/models/trend.enum';

export interface TrendAndNumberModel {
    color: string;
    bigNumber: {
        value: number;
        postfix: string;
        subTextKeys: string[];
    };
    trend: {
        value: Trend;
        rating: TrendRating;
        subTextKeys: string[];
    };
}

@Component({
    selector: 'bfe-trend-and-number',
    templateUrl: './trend-and-number.component.html',
    styleUrls: ['./trend-and-number.component.scss']
})
export class TrendAndNumberComponent implements AfterViewInit {
    @Input() isLoading: boolean = false;
    @Input() model: TrendAndNumberModel;

    @ViewChild('number', { read: ElementRef }) numberRef?: ElementRef;
    @ViewChild('numberText') numberTextRef?: ElementRef;

    // hack to get around ExpressionChangedAfterItHasBeenCheckedError

    private isViewInit: boolean = false;

    get alignRight(): boolean {
        if (this.isViewInit) {
            return (
                this.numberRef?.nativeElement.clientWidth <
                this.numberTextRef?.nativeElement.clientWidth
            );
        }
        return false;
    }

    ngAfterViewInit(): void {
        // timeout is needed
        setTimeout(() => {
            this.isViewInit = true;
        }, 100);
    }
}
