import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionProvider } from '../providers/session/session';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SetApiPage } from '../pages/set-api/set-api';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = LoadingPage;
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private session: SessionProvider,
        private oneSignal: OneSignal,
        private events: Events,
        private iab: InAppBrowser,
    ) {
        this.platform.ready().then(async () => {
            this.statusBar.hide();
            this.splashScreen.hide();
            let api = await this.session.getStorage("api");
            if( api ) this.session.api = api;
            this.session.ajax("check-edu-api.php", {}, false).then(async (res: any)=>{
                if( res.status ) {
                    await this.session.setStorage("api", this.session.api);
                    this.run();
                } else {
                    this.rootPage = SetApiPage;
                }
            }).catch(error=>{
                this.rootPage = SetApiPage;
            });
        });
    }
    async run() {
        let auth: any = await this.session.getStorage('auth');
        if (!auth || !auth.student_id || !auth.student_code || !auth.bdate) {
            this.nav.setRoot(LoginPage);
            return;
        }
        let res: any = await this.session.ajax("login.php", auth, false);
        if (res.status == "Y") {
            this.session.auth = res.data;
            this.session.setStorage("auth", res.data);
            this.setupPush();
            this.nav.setRoot(TabsPage);
        } else if (res.status == "N") {
            this.session.auth = {};
            this.session.removeStorage("auth");
            this.session.showAlert("Session ของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่").then(rs => {
                this.nav.setRoot(LoginPage);
            });
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย").then(rs => {
                this.nav.setRoot(LoginPage);
            });
        }
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
                if (data.update == "InformationPage-behavior") {
                    this.events.publish('InformationPage:load');
                } else if (data.update == "InformationPage-fee") {
                    this.events.publish('InformationPage:load');
                }
            });
            this.oneSignal.handleNotificationOpened().subscribe((jsonData: any) => {
                //alert("handleNotificationOpened : "+JSON.stringify(jsonData));
                console.log(jsonData);
                let data: any = jsonData.notification.payload.additionalData;
                if (data.update == "InformationPage-behavior") {
                    this.nav.getActiveChildNav().select(1);
                } else if (data.update == "InformationPage-fee") {
                    this.nav.getActiveChildNav().select(1);
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
