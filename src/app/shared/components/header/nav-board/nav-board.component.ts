import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { RouteFragment } from 'src/app/core/navigation/route-fragment.enum';
import { Language } from '../../../../core/i18n/language.enum';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
    navigationLinks,
    NavLink,
    NavLinkParent
} from '../../../../core/navigation/nav-links.const';
import { WindowRef } from '../../../xternal-helpers/from-sc-ng-commons-public/core/window/window-ref.service';

export type NavBoardAnimationState = 'void' | 'enter';

interface LinkWrapper extends NavLinkParent {
    open?: boolean;
}

@Component({
    selector: 'bfe-nav-board',
    templateUrl: './nav-board.component.html',
    styleUrls: ['./nav-board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('subList', [
            state('false', style({ height: 0 })),
            state('true', style({ height: '*' })),
            transition('false <=> true', [animate('300ms ease-in-out')])
        ])
    ]
})
export class NavBoardComponent {
    readonly links: LinkWrapper[];
    readonly ts = Date.now();
    private readonly currentPath: string;

    readonly languages = Object.values(Language);
    currentLanguage = this.translationService.language;
    readonly RouteFragment = RouteFragment;

    @HostBinding('style.--client-height.px')
    get clientHeight(): number | null {
        // we cannot use 100vh since 100vh is always without dynamically shown nav bars of iOS/Android Browser
        // therefore the language selection could be hidden
        return this.win?.innerHeight ?? null;
    }

    private readonly win: Window | null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        router: Router,
        private readonly translationService: TranslationService,
        windowRef: WindowRef
    ) {
        this.win = windowRef.nativeWindow;

        this.currentPath = router.routerState.snapshot.url
            .split('/')
            .map((p) => p.replace(/[;?\/]/, ''))
            .join('/');

        this.links = navigationLinks.map((link) =>
            this.prepareNavLink(link, null)
        );
    }

    toggle(link: LinkWrapper) {
        link.open = !link.open;
    }

    private prepareNavLink(link: NavLinkParent, parentPath: null): LinkWrapper;
    private prepareNavLink(link: NavLink, parentPath: string): LinkWrapper;
    private prepareNavLink(
        link: NavLinkParent | NavLink,
        parentPath: string | null
    ): LinkWrapper {
        const path = (
            parentPath ? [parentPath, link.path] : ['', link.path]
        ).join('/');
        return parentPath
            ? {
                  ...link,
                  path
              }
            : {
                  ...link,
                  path,
                  children: (<NavLinkParent>link).children?.map((l) =>
                      this.prepareNavLink(l, path)
                  ),
                  open: this.currentPath.startsWith(path)
              };
    }

    changeLanguage(language: string) {
        this.translationService.changeLanguage(language);
    }
}
