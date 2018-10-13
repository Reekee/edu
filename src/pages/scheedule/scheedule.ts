import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
@IonicPage()
@Component({
    selector: 'page-scheedule',
    templateUrl: 'scheedule.html',
})
export class ScheedulePage {
    loading = true;
    loaded = false;
    data: any = [];
    day: Number = 0;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private session: SessionProvider
    ) {
    }
    ionViewDidEnter() {
        this.day = (<Tab>this.navCtrl).index + 1;
        this.load();
    }
    async load() {
        this.loading = true;
        let data: any = this.session.auth;
        data.day = this.day;
        let res: any = await this.session.ajax("get-scheedule.php", data, false);
        if(res.status=="Y") {
            this.data = res.data;
            this.loaded = true;
            this.loading = false;
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
            this.loading = false;
        }
    }
}
