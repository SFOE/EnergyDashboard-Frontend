import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
    faBars,
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faChevronUp,
    faClock,
    faClose,
    faCoins,
    faDroplet,
    faExclamationCircle,
    faExternalLink,
    faExternalLinkAlt,
    faExternalLinkSquareAlt,
    faHouse,
    faUniversalAccess,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {
    faBuildings,
    faIndustryWindows,
    faSunCloud
} from '@fortawesome/pro-solid-svg-icons';
import faBrennholz from '../../../assets/icon/custom-icon/fa-brennholz';
import faFernwaerme from '../../../assets/icon/custom-icon/fa-fernwaerme';

@NgModule({
    declarations: [],
    imports: [CommonModule]
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIcons(faExternalLinkAlt);
        library.addIcons(faExternalLink);
        library.addIcons(faExternalLinkSquareAlt);
        library.addIcons(faClose);
        library.addIcons(faClock);
        library.addIcons(faBars);
        library.addIcons(faChevronRight);
        library.addIcons(faChevronLeft);
        library.addIcons(faChevronDown);
        library.addIcons(faChevronUp);
        library.addIcons(faCoins);
        library.addIcons(faDroplet);
        library.addIcons(faIndustryWindows as IconDefinition);
        library.addIcons(faBuildings as IconDefinition);
        library.addIcons(faHouse);
        library.addIcons(faUniversalAccess);
        library.addIcons(faExclamationCircle);
        library.addIcons(faSunCloud as IconDefinition);
        library.addIcons(farEnvelope as IconDefinition);
        library.addIcons(faBrennholz as IconDefinition);
        library.addIcons(faFernwaerme as IconDefinition);
    }
}
