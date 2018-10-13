import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
    selector: 'page-behavior',
    templateUrl: 'behavior.html',
})
export class BehaviorPage {
    loading = true;
    loaded = false;
    data: any = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private session: SessionProvider
    ) {
    }
    ionViewDidEnter() {
        this.load();
    }
    async load() {
        this.loading = true;
        let data: any = this.session.auth;
        let res: any = await this.session.ajax("get-behavior.php", data, false);
        if (res.status == "Y") {
            this.data = res.data;
            this.loaded = true;
            this.loading = false;
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
            this.loading = false;
        }
    }
}
