import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {DialogService} from './dialog.service';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent],
  exports: [DialogComponent],
  entryComponents: [DialogComponent],
  providers: [DialogService]
})
export class DialogModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: DialogModule, providers: []};
  }
}
