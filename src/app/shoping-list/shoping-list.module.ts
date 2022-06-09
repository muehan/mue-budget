import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingListRoutingModule } from './shoping-list-routing.module';
import { ListComponent } from './containers/list/list.component';
import { SharedModule } from '../+shared/shared.module';
import { AddItemDialogComponent } from './dialogs/add-item/add-item.component';

@NgModule({
    declarations: [
        ListComponent,
        AddItemDialogComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        ShopingListRoutingModule,
    ]
})
export class ShopingListModule { }
