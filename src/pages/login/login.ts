import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { TabsPage } from '../tabs/tabs';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    auth: any = {
        student_code: "001",
        password: "222"
    };
    constructor(
        private platform: Platform,
        public navCtrl: NavController,
        public navParams: NavParams,
        private session: SessionProvider,
        private oneSignal: OneSignal,
        private events: Events,
        private iab: InAppBrowser,
    ) {
    }
    async login() {
        let res: any = await this.session.ajax("login.php", this.auth, true);
        if(res.status=="Y") {
            this.session.auth = res.data;
            this.session.setStorage("auth", res.data);
            this.setupPush();
            this.navCtrl.setRoot(TabsPage);
        } else if(res.status=="N") {
            this.session.showAlert("เข้าสู่ระบบไม่สำเร็จ");
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
        }
    }
    reset() {
        this.auth = {
            student_code: "",
            password: ""
        };
    }
    setupPush() {
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit('1432f8a2-7f27-49a5-92af-c495ac058306', '987443656528');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
            this.oneSignal.setSubscription(true);
            this.oneSignal.handleNotificationReceived().subscribe((jsonData: any) => {
                //alert("handleNotificationReceived : "+JSON.stringify(jsonData));
                console.log(jsonData);
                let data: any = jsonData.payload.additionalData;
                if (data.update == "InformationPage") {
                    this.events.publish('InformationPage:load');
                }
            });
            this.oneSignal.handleNotificationOpened().subscribe((jsonData: any) => {
                //alert("handleNotificationOpened : "+JSON.stringify(jsonData));
                console.log(jsonData);
                let data: any = jsonData.notification.payload.additionalData;
                if (data.update == "InformationPage") {
                    //this.events.publish('TabsPage:openTabs1-notiOpen', data.message);
                    //this.navCtrl.setRoot(TabsPage, { index: 1 });
                    this.navCtrl.getActiveChildNav().select(1);
                    this.openFee();
                }
            });
            this.oneSignal.endInit();
            this.oneSignal.registerForPushNotifications();
            this.oneSignal.getIds().then((ids: any) => {
                //alert("getIds : "+JSON.stringify(ids));
                console.log(ids);
                this.session.updateRegister(ids);
            });
        }
    }
    async openFee() {
        let res: any = await this.session.ajax("get-fee.php", this.session.auth, true);
        if (res.status == "Y") {
            this.iab.create(res.url, "_system");
        }
    }
}
