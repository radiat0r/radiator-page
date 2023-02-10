import { Component, Host, h, State } from '@stencil/core'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { WalletService, Wallet } from '../../assets/wallet/wallet-service';

@Component({
  tag: 'rdt-wallet',
  styleUrl: 'rdt-wallet.scss',
})
export class RdtWallet {

  @State()
  walletKey: string;

  @State()
  wallet: Wallet;

  render() {
    return (
      <Host>
        <div class="feature feature-center card card-lg-y card-s4">
          <div class="row justify-content-center">
            <div class="col-sm-10">
              <div class="feature-text">
                <h5 class="title title-md pb-2">Check if you can benefit from our CASHBACK campaigns</h5>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-7">
              <div class="field-item">
                <div class="field-wrap">
                  <input type="text" class="input-bordered" placeholder="Wallet Address" value={this.walletKey} onInput={(event) => this.walletKeyChange(event)}></input>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <button type="submit" class="btn btn-md btn-grad" onClick={() => this.searchWallet()}>Check</button>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-10">
              {this.renderResult()}
            </div>
          </div>
        </div>

      </Host >
    );
  }

  renderResult() {
    if (this.wallet == null) {
      return
    }
  }
    
  

  private walletKeyChange(event) {
    this.walletKey = event.target.value;
  }

  private searchWallet() {

    if (this.walletKey == null || this.walletKey == "") {
      Notify.warning("Please specify your wallet address.");
      return;
    }

    console.log("Search for wallet: " + this.walletKey);
    this.wallet = WalletService.loadWallet(this.walletKey);

    console.log(this.wallet);

    if (this.wallet.error && this.wallet.error != '') {
      Notify.warning(this.wallet.error);
      return;
    }
  }

}
