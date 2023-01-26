import { Component, Input, OnInit } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Context } from 'src/app/core/models/context.enum';

@Component({
    selector: 'bfe-context-title',
    templateUrl: './context-title.component.html',
    styleUrls: ['./context-title.component.scss']
})
export class ContextTitleComponent implements OnInit {
    @Input() context: Context | undefined;
    @Input() marginBottom?: string;
    @Input() marginLeft?: string;
    @Input() size: 'regular' | 'small' = 'regular';

    get iconSize(): SizeProp {
        return this.size === 'small' ? 'xl' : '2x';
    }

    constructor() {}

    ngOnInit(): void {}
}
