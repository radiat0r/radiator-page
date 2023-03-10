import { Component, Fragment, getAssetPath, Host, h, Prop, State } from '@stencil/core'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { WalletService, Wallet } from '../../assets/wallet/wallet-service'
import { Cashbacks, CashbackConfig } from './cashbacks';
import { LimitedCashback, LimitedCashbacks, LimitedCashbacksService } from '../../assets/limited-cashbacks/limited-cashbacks'

@Component({
  tag: 'rdt-wallet',
  styleUrl: 'rdt-wallet.scss',
  assetsDirs: ['assets']
})
export class RdtWallet {

  @Prop() okIcon = "check.png";
  @Prop() errorIcon = "cancel.png";

  @Prop() happyIcon = "happy.svg";
  @Prop() sadIcon = "sad.svg";
  @Prop() scaredIcon = "scared.svg";

  @State()
  limitedCashbacks: LimitedCashbacks
  @State()
  limitedCashbacksError = false
  @State()
  walletKey: string
  @State()
  wallet: Wallet

  componentWillLoad() {
    this.limitedCashbacksError = false
    LimitedCashbacksService.loadLimitedCashbacks().then(limitedCashbacks => {
      this.limitedCashbacksError = false
      this.limitedCashbacks = limitedCashbacks
      console.log("LimitedCashbacks: " + JSON.stringify(this.limitedCashbacks))
    })
      .catch(error => {
        this.limitedCashbacksError = true
        this.limitedCashbacks = null
        Notify.warning("An error occured while fetching limited cashback data. Please try again later.")
        console.log("loadLimitedCashbacks error: " + error)
      })
  }

  render() {
    return (
      <Host>

        <div class="feature feature-center card card-lg-y card-s4">
          <div class="row justify-content-center">
            <div class="col-sm-10">
              <div class="feature-text">
                <h5 class="title title-md pb-2">Check if you can benefit from RADIATOR CASHBACK campaigns</h5>
                <p class="pb-3">Our search bar is only meant for <strong>public wallet addresses.</strong><br />Never share your private wallet address or seed phrase with anyone!</p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-7">
              <div class="field-item">
                <div class="field-wrap">
                  <input type="text" class="input-bordered" placeholder="Public Wallet Address" value={this.walletKey} onInput={(event) => this.walletKeyChange(event)} onKeyDown={(event) => this.walletKeyDown(event)}></input>
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

        <div class="feature-text">
          {this.renderLimitedCashbacks(this.limitedCashbacks, this.limitedCashbacksError)}
        </div>

        <div class="row pb-5">
        </div>

      </Host >
    )
  }

  private renderLimitedCashbacks(limitedCashbacks: LimitedCashbacks, limitedCashbacksError: Boolean) {
    if (limitedCashbacksError) {
      return (
        <div class="col-sm-12">
          <div class="feature feature-center card card-s4">
            <p class="pb-3">An error occured, while checking limited cashbacks.<br /><a href="https://t.me/radix_radiator" target="_blank">Please get in touch with us and try again later.</a></p>
          </div>
        </div>
      )
    }

    if (limitedCashbacks != null) {
      const roidettes = limitedCashbacks.cashbacks.find(element => element.project == "vikingland_roidettes");
      const horrible = limitedCashbacks.cashbacks.find(element => element.project == "vikingland_horribleheads");
      const ratz = limitedCashbacks.cashbacks.find(element => element.project == "vikingland_radixratz");
      return (
        <div class="row">
          {this.renderLimitedCashback('Roidettes', roidettes)}
          {this.renderLimitedCashback('Horrible Heads', horrible)}
          {this.renderLimitedCashback('Radix Ratz', ratz)}
        </div>
      )
    }
  }

  private renderLimitedCashback(name: string, limitedCashback: LimitedCashback) {
    return (
      <div class="col-sm-4">
        <div class="feature feature-center card card-s4">
          <div class="feature-text">
            <h6 class="title title-md">{name}</h6>
            {this.getLimitedCashbackMsg(limitedCashback)}
          </div>
        </div>
      </div>
    )
  }

  private getLimitedCashbackMsg(limitedCashback: LimitedCashback) {
    const happyIconSrc = getAssetPath(`./assets/${this.happyIcon}`);
    const sadIconSrc = getAssetPath(`./assets/${this.sadIcon}`);
    const scaredIconSrc = getAssetPath(`./assets/${this.scaredIcon}`);

    if (limitedCashback['total-cashback-count'] >= limitedCashback['max-cashback-count']) {
      return (
        <div class="row">
          <div class="col-sm-6">
            <p ><strong>No more cashbacks available</strong></p>
          </div>
          <div class="col-sm-6">
            <img src={sadIconSrc} alt="sad" width="100"></img>
          </div>
        </div>)
    } 
    //under 50% left
    else if (limitedCashback['total-cashback-count'] >= limitedCashback['max-cashback-count'] * 0.5) {
      return (
        <div class="row">
          <div class="col-sm-6">
            <p>only <strong>{limitedCashback['max-cashback-count'] - limitedCashback['total-cashback-count']}</strong> left</p>
          </div>
          <div class="col-sm-6"><img src={scaredIconSrc} alt="radiate" width="100"></img>
          </div>
        </div >)
    } else {
      return (
        <div class="row">
          <div class="col-sm-6">
            <p><strong>{limitedCashback['max-cashback-count'] - limitedCashback['total-cashback-count']}</strong> available</p>
          </div>
          <div class="col-sm-6"><img src={happyIconSrc} alt="radiate" width="100"></img>
          </div>
        </div >)
    }

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
                <td class="table-des">{wallet.rdt.toFixed(2)}</td>
              </tr>
              <tr>
                <td class="table-head">$RDT 7 days ago</td>
                <td class="table-des">{wallet.rdt_7_days_ago.toFixed(2)}</td>
              </tr>
              <tr>
                <td class="table-head">Staked @ StakeNordic</td>
                <td class="table-des">{wallet.staked_at_nordic.toFixed(2)}</td>
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
            {this.renderCashbackProjects(wallet)}
          </table>
        </div>
      )
    }
  }

  private renderCashbackProjects(wallet: Wallet) {
    return (
      <tbody>
        {
          Cashbacks.map((config) =>
            <tr>
              <td class="table-head text-start"><ins><a href={config.vikingland} target="_blank">{config.project}{this.getTableProjectUpToMsg(config.maxCashback)}</a></ins></td>
              <td class="table-des text-start"><ins><a href={config.telegram} target="_blank">{this.getTableHoldRdtMsg(config, wallet)}{this.getTableStakeNordicMsg(config, wallet)}{this.getTableLimitedCashbackMsg(config)}</a></ins></td>
              <td class="table-head">{this.getTableBenefitMsg(config, wallet)}</td>
            </tr>
          )
        }
      </tbody>
    )
  }

  private getTableProjectUpToMsg(value: number) {
    return (<Fragment><br />Up to {value}% cashback</Fragment>)
  }

  private getTableHoldRdtMsg(config: CashbackConfig, wallet: Wallet) {
    return (<Fragment>{this.renderOkNo((wallet.rdt_7_days_ago >= config.limitRdt) && (wallet.rdt >= config.limitRdt))} Hold {config.limitRdt}$RDT &gt; 7 days</Fragment>)
  }

  private getTableStakeNordicMsg(config: CashbackConfig, wallet: Wallet) {
    if (config.limitNordicStake == null || config.limitNordicStake == 0) {
      return (<Fragment></Fragment>)
    } else {
      return (<Fragment><br />{this.renderOkNo(wallet.staked_at_nordic >= config.limitNordicStake)} Stake @ StakeNordic {config.limitNordicStake}XRD</Fragment>)
    }
  }

  private getTableLimitedCashbackMsg(config: CashbackConfig) {
    const limitedCashback = this.getLimitedCashbackData(config)
    if (limitedCashback == null) {
      return (<Fragment></Fragment>)
    } else {
      return (<Fragment><br />{this.renderOkNo(limitedCashback['total-cashback-count'] < limitedCashback['max-cashback-count'])} {limitedCashback['max-cashback-count'] - limitedCashback['total-cashback-count']} Cashbacks available</Fragment>)
    }
  }

  private getTableBenefitMsg(config: CashbackConfig, wallet: Wallet): string {
    const limitedCashback = this.getLimitedCashbackData(config)
    if (limitedCashback != null && (limitedCashback['total-cashback-count'] >= limitedCashback['max-cashback-count'])) {
      return (<Fragment>Sorry, no more cashbacks available</Fragment>)
    }

    const benefit = config.calcCashbackBenefit(config, wallet)
    if (benefit == null) {
      return (<Fragment>Sorry no cashback possible</Fragment>)
    } else {
      return (<Fragment>Your benefit:<br /> {benefit}% cashback</Fragment>)
    }
  }

  private getLimitedCashbackData(config: CashbackConfig): LimitedCashback {
    if (config.limitedProject == null) {
      return null
    }
    return this.limitedCashbacks.cashbacks.find(it => it.project == config.limitedProject)
  }

  private renderOkNo(ok: boolean) {
    const okIconSrc = getAssetPath(`./assets/${this.okIcon}`);
    const errorIconSrc = getAssetPath(`./assets/${this.errorIcon}`);

    if (ok) {
      return (<img src={okIconSrc} alt="ok"></img>)
    } else {
      return (<img src={errorIconSrc} alt="no"></img>)
    }
  }



  private walletKeyChange(event) {
    this.walletKey = event.target.value
  }

  private walletKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault()
      this.searchWallet()
    }
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
}
