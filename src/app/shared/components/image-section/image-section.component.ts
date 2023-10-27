import { Component, Input } from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { CommonModule } from '@angular/common';
import { CommonsModule } from 'src/app/shared/commons/commons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdateInterval } from 'src/app/shared/components/kpi-container/kpi-date-info-subtext/kpi-date-info-subtext.component';

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
