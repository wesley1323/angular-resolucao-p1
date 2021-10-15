import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface BitCoinRate{
  time: {
    updated: string
  };
  bpi: {
    USD: {
      symbol: string;
      rate_float: number
    };
    EUR: {
      symbol: string;
      rate_float: number
    }
  }
}

interface BrlBitCoinRate{
  time: {
    updated: string
  };
  bpi: {
    BRL: {
      rate_float: number
    }
  }
}

@Injectable()
export class WesleyWalletService {
  bitCoinRates: Array<BitCoinRate> = [];
  brlBitCoinRates: Array<BrlBitCoinRate> = [];

  diff: number = 0;
  bitCoins: number = 0;

  constructor(private http: HttpClient) {
    this.updateBitCoinRates();
    setInterval(() => {
      this.updateBitCoinRates();
    }, 60000);
   }

   updateBitCoinRates(){
    this.http.get<BitCoinRate>("https://api.coindesk.com/v1/bpi/currentprice.json").subscribe(data => {
      if(this.bitCoinRates.length>0){
        let length = this.bitCoinRates.length;
        this.diff = data.bpi.USD.rate_float - this.bitCoinRates[length-1].bpi.USD.rate_float;
      }
      this.bitCoinRates.push(data);
    });

    this.http.get<BrlBitCoinRate>("https://api.coindesk.com/v1/bpi/currentprice/BRL.json").subscribe(data => {
      this.brlBitCoinRates.push(data);
    });
  }

  addBitCoins(brValue: number){
    let length = this.brlBitCoinRates.length;
    if(length>0){
      let btc = brValue / this.brlBitCoinRates[length-1].bpi.BRL.rate_float;
      this.bitCoins += btc;
    }
  }

  removeBitCoins(brValue: number){
    let length = this.brlBitCoinRates.length;
    if(length>0){
      let btc = brValue / this.brlBitCoinRates[length-1].bpi.BRL.rate_float;
      this.bitCoins -= btc;
    }
  }

  getBtcInBRL(){
    let length = this.brlBitCoinRates.length;
    if(length>0){
      return this.bitCoins * this.brlBitCoinRates[length-1].bpi.BRL.rate_float;
    }else{
      return 0;
    }
  }

  getBtcInUSD(){
    let length = this.bitCoinRates.length;
    if(length>0){
      return this.bitCoins * this.bitCoinRates[length-1].bpi.USD.rate_float;
    }else{
      return 0;
    }
  }

  getBtcInEUR(){
    let length = this.bitCoinRates.length;
    if(length>0){
      return this.bitCoins * this.bitCoinRates[length-1].bpi.EUR.rate_float;
    }else{
      return 0;
    }
  }

}