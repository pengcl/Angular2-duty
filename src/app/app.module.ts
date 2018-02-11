// modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ActionSheetModule} from './components/actionsheet/actionsheet.module';
import {CellModule} from './modules/cell';
import {PickerModule} from './modules/picker';
import {ChartF2Module} from './modules/chart-f2';
import {RatingModule} from './modules/rating';
import {DialogModule} from './modules/dialog';
import {UploaderModule} from './modules/uploader';
import {WxModule} from './modules/wx';

// pipes
import {EmployeesPipe} from './pipes/employees.pipe';

// services
import {SERVICES_DECLARATIONS} from './services';

// components
import {AppComponent} from './app.component';
import {AppPayComponent} from './pages/pay/pay.component';
import {COMPONENTS_DECLARATIONS} from './components';
import {FRONT_PAGES_DECLARATIONS} from './pages/front';
import {ADMIN_PAGES_DECLARATIONS} from './pages/admin';

// directives
import {DIRECTIVES_DECLARATIONS} from './directives';

import {SwiperModule, SWIPER_CONFIG, SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {InfiniteLoaderConfig} from './components/infinite-loader/infinite-loader.config';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  keyboard: true,
  observer: true,
  mousewheel: true,
  scrollbar: false,
  navigation: true,
  pagination: true
};

@NgModule({
  declarations: [
    EmployeesPipe,
    AppComponent,
    AppPayComponent,
    ...COMPONENTS_DECLARATIONS,
    ...FRONT_PAGES_DECLARATIONS,
    ...ADMIN_PAGES_DECLARATIONS,
    ...DIRECTIVES_DECLARATIONS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CellModule,
    SwiperModule,
    ActionSheetModule,
    PickerModule,
    ChartF2Module,
    RatingModule,
    WxModule,
    DialogModule,
    UploaderModule
  ],
  providers: [
    ...SERVICES_DECLARATIONS,
    InfiniteLoaderConfig,
    EmployeesPipe,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [...COMPONENTS_DECLARATIONS]
})
export class AppModule {
}
