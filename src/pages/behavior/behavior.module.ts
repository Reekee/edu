import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BehaviorPage } from './behavior';

@NgModule({
    declarations: [
        BehaviorPage,
    ],
    imports: [
        IonicPageModule.forChild(BehaviorPage)
    ],
})
export class BehaviorPageModule { }
