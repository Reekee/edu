import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SessionProvider } from '../../providers/session/session';
import { ScheeduleTabsPage } from '../scheedule-tabs/scheedule-tabs';
import { StudentPage } from '../student/student';
import { GradePage } from '../grade/grade';
import { BehaviorPage } from '../behavior/behavior';
import { CalendarPage } from '../calendar/calendar';

@IonicPage()
@Component({
    selector: 'page-information',
    templateUrl: 'information.html',
})
export class InformationPage {
    loading = true;
    loaded = false;
    menu = [];
    student: any = {};
    menu_source = {
        "StudentPage": StudentPage,
        "ScheeduleTabsPage": ScheeduleTabsPage,
        "GradePage": GradePage,
        "BehaviorPage": BehaviorPage,
        "FeePage": "",
        "CalendarPage": CalendarPage
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private app: App,
        private session: SessionProvider,
        private iab: InAppBrowser,
        private events: Events
    ) {
        this.events.subscribe('InformationPage:load', async () => {
            this.load(true);
        });
    }
    ionViewDidEnter() {
        this.load(false);
    }
    async load(loading) {
        this.loading = true;
        let res: any = await this.session.ajax("get-menu.php", this.session.auth, loading);
        if (res.status == "Y") {
            this.menu = res.menu;
            this.student = res.student;
            this.loaded = true;
            this.loading = false;
        } else if (res.status == "N") { } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
            this.loading = false;
        }
    }
    openPage(item) {
        if (item.page == "StudentPage") {
            this.app.getRootNav().push(this.menu_source[item.page], { hideLogout: true });
        } else if (item.page == "FeePage") {
            this.openFee();
        } else {
            this.app.getRootNav().push(this.menu_source[item.page]);
        }
    }
    async openFee() {
        let res: any = await this.session.ajax("get-fee.php", this.session.auth, true);
        if (res.status == "Y") {
            this.iab.create(res.url, "_system");
        } else if (res.status == "N") {
            this.load(false);
            this.session.showAlert("ในขณะนี้... ยังไม่มีข้อมูลค่าธรรมเนียมการศึกษาใหม่");
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
            this.loading = false;
        }
    }
}
