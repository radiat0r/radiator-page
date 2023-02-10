import { Component, getAssetPath, Host, h, Prop, State } from '@stencil/core'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { WalletService, Wallet } from '../../assets/wallet/wallet-service'

@Component({
  tag: 'rdt-wallet',
  styleUrl: 'rdt-wallet.scss',
  assetsDirs: ['assets']
})
export class RdtWallet {

  @Prop() okIcon = "check.png";
  @Prop() errorIcon = "cancel.png";

  @State()
  walletKey: string
  @State()
  wallet: Wallet

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
              {this.renderWalletInfo(this.wallet)}
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-10">
              {this.renderCashbacks(this.wallet)}
            </div>
          </div>
        </div>

      </Host >
    )
  }

  private renderWalletInfo(wallet: Wallet) {
    if (wallet != null) {
      return (
        <div class="token-info">
          <h4 class="title title-md mb-2 text-sm-center">Wallet Information</h4>
          <table class="table table-s1 table-token">
            <tbody>
              <tr>
                <td class="table-head">$RDT</td>
                <td class="table-des">{this.formatToken(wallet.rdt)}</td>
              </tr>
              <tr>
                <td class="table-head">Hold</td>
                <td class="table-des">14th Dec 2022 12:00 GMT</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }

  private renderCashbacks(wallet: Wallet) {
    if (wallet != null) {
      return (
        <div class="token-info">
          <h4 class="title title-md mb-2 text-sm-center">Cashbacks</h4>
          <table class="table table-s1 table-token">
            <tbody>
              <tr>
                <td class="table-head text-start"><a href='https://www.vikingland.net/collection/Shardeez' target="_blank">Shardeez</a></td>
                <td class="table-des"><a href='https://t.me/radix_radiator/1249' target="_blank">Hold 150$RDT{this.renderHold(wallet, 150)} Stake 1000XRD</a></td>
                <td class="table-head">20%</td>
              </tr>
              <tr>
                <td class="table-head text-start"><a href='https://www.vikingland.net/collection/Mutant%20Cat%20Society' target="_blank">Mutant Cat Society</a></td>
                <td class="table-des"><a href='https://t.me/radix_radiator/1886' target="_blank">Hold 150$RDT{this.renderHold(wallet, 150)}</a></td>
                <td class="table-head">20%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }

  private renderHold(wallet: Wallet, minHold: number) {
    const okIconSrc = getAssetPath(`./assets/${this.okIcon}`);
    const errorIconSrc = getAssetPath(`./assets/${this.errorIcon}`);

    if (wallet.rdt >= minHold) {
      return (<img src={okIconSrc} alt="ok"></img>)
    } else {
      return (<img src={errorIconSrc} alt="ok"></img>)
    }
  }


  private walletKeyChange(event) {
    this.walletKey = event.target.value
  }

  private searchWallet() {

    this.wallet = null

    if (this.walletKey == null || this.walletKey == "") {
      Notify.warning("Please specify your wallet address.")
      return
    }
    console.log("Search for wallet: " + this.walletKey)

    WalletService.loadWallet(this.walletKey)
      .then(wallet => {
        this.wallet = wallet
        console.log("Wallet: " + JSON.stringify(this.wallet))
      })
      .catch(error => {
        Notify.warning("An error occured while fetching wallet data. Maybe the specified wallet key is wrong. Please try again later.")
        console.log("loadWallet error: " + error)
      })
  }

  private formatToken(value: number): string {
    let valueNormal = value / 10e17
    return valueNormal.toFixed(2)
  }
}
