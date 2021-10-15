import { Component, VERSION } from '@angular/core';
import { WesleyWalletService } from './wesley-wallet.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  constructor(public wallet: WesleyWalletService){}
}
