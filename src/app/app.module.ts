import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WesleyCurrencyComponent } from './wesley-currency/wesley-currency.component';
import { WesleyWalletComponent } from './wesley-wallet/wesley-wallet.component';
import { RouterModule } from '@angular/router';
import { WesleyWalletService } from './wesley-wallet.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: 'currency', component: WesleyCurrencyComponent},
        {path: 'wallet', component: WesleyWalletComponent}
      ]
    ) 
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent,
    WesleyCurrencyComponent,
    WesleyWalletComponent
   ],
  bootstrap:    [ AppComponent ],
  providers: [ WesleyWalletService ]
})
export class AppModule { }
