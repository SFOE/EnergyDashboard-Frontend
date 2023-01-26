import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Injector,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {
    MasterDetailConfiguration,
    MasterDetailMenuItem
} from './master-detail-configuration.model';
import { MASTER_DETAIL_DATA } from './master-detail-data.token';
import { MasterDetailData } from './master-detail-data.type';
import { MasterDetailContext } from './master-detail-menu-item-context.type';
import { MasterDetailComponent } from './master-detail.component';

@Directive({ selector: '[bfeMasterDetail]' })
export class MasterDetailDirective<T extends MasterDetailMenuItem>
    implements OnChanges
{
    @Input()
    bfeMasterDetail: MasterDetailConfiguration<T>;

    @Input()
    alertTemplate?: TemplateRef<any>;

    @Input()
    stickyHeaderEl: HTMLElement | null;

    @Input()
    facet?: 'slim' | 'default' | null;

    private componentRef: ComponentRef<MasterDetailComponent>;

    /**
     * Asserts the correct type of the context for the template that `MasterDetailDirective` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `bfeMasterDetail` structural directive renders its template with a specific context type.
     */
    static ngTemplateContextGuard<T extends MasterDetailMenuItem>(
        dir: MasterDetailDirective<T>,
        ctx: any
    ): ctx is MasterDetailContext<T> {
        return true;
    }

    constructor(
        private readonly templateRef: TemplateRef<MasterDetailContext<T>>,
        private readonly container: ViewContainerRef,
        private readonly injector: Injector,
        private readonly factoryResolver: ComponentFactoryResolver
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.container.clear();
        if (this.componentRef) {
            // when setting the input twice, everything would be re-rendered.
            // since it's not necessary but neither is a bug we don't throw but log an error
            console.error(
                'ngOnChanges called twice. ensure to set inputs only once.'
            );
        }
        if (this.bfeMasterDetail) {
            const value: MasterDetailData = {
                space: this.bfeMasterDetail.context,
                items: this.bfeMasterDetail.menuItems,
                alertTemplate: this.alertTemplate,
                templateRef: this.templateRef,
                stickyHeaderEl: null
            };
            const newInjector = Injector.create({
                parent: this.injector,
                providers: [{ provide: MASTER_DETAIL_DATA, useValue: value }]
            });
            const componentFactory =
                this.factoryResolver.resolveComponentFactory(
                    MasterDetailComponent
                );
            this.componentRef = componentFactory.create(newInjector);
            this.container.insert(this.componentRef.hostView);
        }
    }
}
