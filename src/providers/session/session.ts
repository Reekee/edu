import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController, Platform, Events, App } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { StudentPage } from '../../pages/student/student';
import { GradePage } from '../../pages/grade/grade';
@Injectable()
export class SessionProvider {
    //public api = "http://localhost/edu/api/";
    public api = "http://desktop-7ir60kp/edu/api/";
    public auth: any = {};
    constructor(
        private plt: Platform,
        private http: HttpClient,
        private storage: Storage,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private oneSignal: OneSignal,
        private events: Events,
    ) {

    }
    ajax(url, data, isloading) {
        let loading: any;
        if (isloading == true) {
            loading = this.loadingCtrl.create({
                content: 'กำลังประมวลผล...'
            });
            loading.present();
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                this.http.post(this.api+url, JSON.stringify(data)).subscribe((res: any) => {
                    if (isloading == true) { loading.dismiss(); }
                    resolve(res);
                }, error => {
                    if (isloading == true) { loading.dismiss(); }
                    resolve(error);
                });
            }, 0);
        });
    }
    showAlert(message) {
        let msg: any = message;
        if (typeof message === 'object') msg = JSON.stringify(message);
        if (typeof message === 'string') msg = message;
        return new Promise(resolve => {
            const alert = this.alertCtrl.create({
                title: 'แจ้งข้อความ',
                subTitle: msg,
                buttons: [
                    {
                        text: 'ตกลง',
                        handler: () => {
                            resolve(true);
                        }
                    },
                ]
            });
            alert.present();
        });
    }
    showConfirm(message) {
        return new Promise(resolve => {
            let alert = this.alertCtrl.create({
                title: 'คำยืนยัน ?',
                message: message,
                buttons: [
                    {
                        text: 'ยกเลิก',
                        role: 'cancel',
                        handler: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: 'ตกลง',
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present();
        });
    }
    setStorage(key, value) {
        return this.storage.set(key, value);
    }
    getStorage(key) {
        return this.storage.get(key);
    }
    removeStorage(key,) {
        return this.storage.remove(key);
    }
    public updateRegister(ids: any) {
        let data: any = this.auth;
        data.pushToken = ids.pushToken;
        data.userId = ids.userId;
        this.ajax("set-push.php", data, false);
    }
    unsetPush() {
        this.oneSignal.setSubscription(false);
    }
}
