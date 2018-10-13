import { Component, ApplicationRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InformationPage } from '../information/information';
import { StudentPage } from '../student/student';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    index = 0;
    tab1Root = HomePage;
    tab2Root = InformationPage;
    tab3Root = StudentPage;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private session: SessionProvider,
        private events: Events,
        private _applicationRef : ApplicationRef
    ) {
        this.index = this.navParams.get("index");
        this.events.subscribe('TabsPage:openTabs1-notiOpen', (message) => {
            setTimeout(() => {
                this.index = 1;
                this._applicationRef.tick();
            }, 200);
        });
    }
}
