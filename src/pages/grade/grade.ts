import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
    selector: 'page-grade',
    templateUrl: 'grade.html',
})
export class GradePage {
    loading = true;
    loaded = false;
    data = [];
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
        let res: any = await this.session.ajax("get-grade.php", data, false);
        if (res.status == "Y") {
            this.data = res.data;
            this.loaded = true;
            this.loading = false;
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
            this.loading = false;
        }
    }
    calAvg(data) {
        let n = data.length;
        let sum = 0;
        for (let i = 0; i < n; i++) {
            var score = Number(data[i].grade);
            if( isNaN(score) ) score = 0;
            sum += score;
        }
        let avg = sum / n;
        return avg.toFixed(2);
    }
}
