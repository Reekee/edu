import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheedulePage } from '../scheedule/scheedule';
@IonicPage()
@Component({
    selector: 'page-scheedule-tabs',
    templateUrl: 'scheedule-tabs.html',
})
export class ScheeduleTabsPage {
    tabRoot = ScheedulePage;
    day: Number;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        let currentDate = new Date();
        this.day = currentDate.getDay() - 1;
    }
}
