import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
@IonicPage()
@Component({
    selector: 'page-changepass',
    templateUrl: 'changepass.html',
})
export class ChangepassPage {
    data: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private session: SessionProvider,
    ) {
        this.data = this.session.auth;
    }
    async changepass() {
        let res: any = await this.session.ajax("changepass.php", this.data, true);
        if(res.status=="Y") {
            this.session.showAlert(res.message).then(rs=>{
                this.data = {
                    "password1":"",
                    "password2":"",
                    "password3":"",
                };
                this.session.auth = res.data;
                this.session.setStorage("auth", res.data);
            });
        } else if(res.status=="N") {
            this.session.showAlert(res.message);
        } else {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่าย");
        }
    }
}
