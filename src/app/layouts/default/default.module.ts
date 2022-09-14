import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbSidebarService } from "@nebular/theme";
import { LayoutDefaultComponent } from "./default.component";

@NgModule({
    declarations: [
        LayoutDefaultComponent
    ],
    imports: [
        RouterModule,
        NbLayoutModule,
        NbSidebarModule,
        NbMenuModule,
    ],
    providers: [NbSidebarService],
    exports: [LayoutDefaultComponent]
})
export class LayoutDefaultModule {}