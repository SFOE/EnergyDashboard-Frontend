import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18NextModule } from 'angular-i18next';
import { CommonsModule } from '../../../shared/commons/commons.module';
import { UpdateInterval } from '../../../shared/components/kpi-container/kpi-date-info-subtext/kpi-date-info-subtext.component';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

export interface ImageSection {
    dateOfLastUpdate: Date;
    updateInterval?: UpdateInterval;
    images: Image[];
    titleKey: string;
    longTextKey: string;
}

export interface Image {
    imageRelativeLink: string;
    titleKey: string;
    subTitleKey: string;
}

@Component({
    standalone: true,
    selector: 'bfe-image-section',
    templateUrl: './image-section.component.html',
    styleUrls: ['./image-section.component.scss'],
    imports: [
        I18NextModule,
        SharedComponentsModule,
        CommonModule,
        CommonsModule,
        FontAwesomeModule
    ]
})
export class ImageSectionComponent {
    @Input() loading: boolean = true;
    @Input() model: ImageSection | undefined;

    isLoading = true;
    selectedImageView: Image | undefined;

    showImage(img: Image) {
        this.selectedImageView = img;
    }

    closeImage() {
        this.selectedImageView = undefined;
    }
}
