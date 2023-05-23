import { Component, Injector, Input, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isProductionEnvironment } from '../../../../environments/environment.model';
import { Language } from '../../../core/i18n/language.enum';
import { TranslationService } from '../../../core/i18n/translation.service';
import { throttleFn } from '../../static-utils/throttle-fn.function';
import { NavBoardService } from './nav-board/nav-board.service';

@Component({
    selector: 'bfe-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
    @Input() embedMode: boolean = false;
    readonly languages: string[] = Object.values(Language);
    currentLanguage: string = this.translationService.language;
    readonly toggleNavBoard = throttleFn(this._toggleNavBoard.bind(this), 250);
    isNavBoardOpen: Observable<boolean> = this.navBoardService.isOpen$;
    readonly isProduction = isProductionEnvironment();

    constructor(
        readonly navBoardService: NavBoardService,
        private readonly injector: Injector,
        private router: Router,
        private title: Title,
        private translationService: TranslationService
    ) {}

    private _toggleNavBoard() {
        this.navBoardService.toggle(this.injector);
    }

    changeLanguage(language: string) {
        this.translationService.changeLanguage(language);
    }

    changeLanguageSpace(language: string, event: Event) {
        event.preventDefault();
        this.translationService.changeLanguage(language);
    }

    setDevLanguage() {
        this.translationService.changeLanguage('cimode');
    }
}
