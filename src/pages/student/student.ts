import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { LoginPage } from '../login/login';
import { ChangepassPage } from '../changepass/changepass';

@IonicPage()
@Component({
    selector: 'page-student',
    templateUrl: 'student.html',
})
export class StudentPage {
    hideLogout: false;
    loading = true;
    loaded = false;
    data: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private session: SessionProvider,
        private app: App
    ) {
        this.hideLogout = navParams.get("hideLogout");
    }
    ionViewDidEnter() {
        this.load();
    }
    async load() {
        this.loading = true;
        let res: any = await this.session.ajax("get-student.php", this.session.auth, false);
        if (res.status == "Y") {
            this.data = res.data;
            this.loaded = true;
            this.loading = false;
        } else if (res.status == "N") { } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
            this.loading = false;
        }
    }
    changepass() {
        this.app.getRootNav().push(ChangepassPage);
    }
    async logout() {
        let res: any = await this.session.showConfirm("คุณแน่ใจจะออกจากระบบใช่หรือไม่ ?");
        if(res) {
            this.session.auth = {};
            this.session.removeStorage("auth");
            this.session.unsetPush();
            this.navCtrl.setRoot(LoginPage);
        }
    }
}
