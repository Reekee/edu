import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SessionProvider } from '../providers/session/session';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { PipesModule } from '../pipes/pipes.module';

import { MyApp } from './app.component';
import { SetApiPage } from '../pages/set-api/set-api';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { InformationPage } from '../pages/information/information';
import { StudentPage } from '../pages/student/student';
import { ScheedulePage } from '../pages/scheedule/scheedule';
import { ScheeduleTabsPage } from '../pages/scheedule-tabs/scheedule-tabs';
import { GradePage } from '../pages/grade/grade';
import { BehaviorPage } from '../pages/behavior/behavior';
import { CalendarPage } from '../pages/calendar/calendar';
import { ChangepassPage } from '../pages/changepass/changepass';

@NgModule({
    declarations: [
        MyApp,
        SetApiPage,
        LoadingPage,
        LoginPage,
        TabsPage,
        HomePage,
        InformationPage,
        StudentPage,
        ScheedulePage,
        ScheeduleTabsPage,
        GradePage,
        BehaviorPage,
        CalendarPage,
        ChangepassPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
            monthShortNames: ['ม.ค.', 'ก.พ.', 'ม.ค.',  'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
            dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'],
            dayShortNames: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ', 'ศ.', 'ส.'],
        }),
        HttpClientModule,
        IonicStorageModule.forRoot(),
        OrderModule,
        FilterPipeModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SetApiPage,
        LoadingPage,
        LoginPage,
        TabsPage,
        HomePage,
        InformationPage,
        StudentPage,
        ScheedulePage,
        ScheeduleTabsPage,
        GradePage,
        BehaviorPage,
        CalendarPage,
        ChangepassPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        SessionProvider,
        InAppBrowser,
        OneSignal
    ]
})
export class AppModule { }
