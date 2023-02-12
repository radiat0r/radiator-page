import { Component, Fragment, getAssetPath, Host, h, Prop, State } from '@stencil/core'
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
            <tbody>
              {this.renderShardeezSection(wallet)}
              {this.renderMutantCatSection(wallet)}
              {this.renderMysticTigerSection(wallet)}
              {this.renderRadixPandaSection(wallet)}
              {this.renderRadFamSection(wallet)}
              {this.renderRoidettesSection(wallet)}
              {this.renderHorribleHeadsSection(wallet)}
            </tbody>
          </table>
        </div>
      )
    }
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

  private static readonly NORDIC_STAKE_LIMIT = 1000
  private static readonly NO_CASHBACK = "Sorry no cashback possible"

  private getProjectUpToMsg(value: number) {
    return (<Fragment><br />Up to {value}% cashback</Fragment>)
  }

  private getHoldRdtMsg(wallet: Wallet, rdt: number) {
    return (<Fragment>{this.renderOkNo(wallet.rdt >= rdt)} Hold {rdt}$RDT<br />{this.renderOkNo(wallet.rdt_7_days_ago >= rdt)} Hold {rdt}$RDT &gt; 7 days</Fragment>)
  }

  private getStakeNordicMsg(wallet: Wallet) {
    return (<Fragment><br />{this.renderOkNo(wallet.staked_at_nordic >= RdtWallet.NORDIC_STAKE_LIMIT)} Stake @ StakeNordic {RdtWallet.NORDIC_STAKE_LIMIT}XRD</Fragment>)
  }

  private getBenefitMsg(value: number) {
    return (<Fragment>Your benefit:<br /> {value}% cashback</Fragment>)
  }

  private static readonly RDT_LIMIT_SHARDEEZ = 150
  private renderShardeezSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.net/collection/Shardeez' target="_blank">Shardeez{this.getProjectUpToMsg(25)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/1249' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_SHARDEEZ)}{this.getStakeNordicMsg(wallet)}</a></td>
        <td class="table-head">{this.calcShardeezBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcShardeezBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_SHARDEEZ && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_SHARDEEZ) {
      if (wallet.staked_at_nordic >= RdtWallet.NORDIC_STAKE_LIMIT) {
        return this.getBenefitMsg(25)
      } else {
        return this.getBenefitMsg(20)
      }
    } else {
      return RdtWallet.NO_CASHBACK
    }
  }

  private static readonly RDT_LIMIT_MUTANT_CAT = 150
  private renderMutantCatSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.net/collection/Mutant%20Cat%20Society' target="_blank">Mutant Cat Society{this.getProjectUpToMsg(20)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/1886' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_MUTANT_CAT)}{this.getStakeNordicMsg(wallet)}</a></td>
        <td class="table-head">{this.calcMutantCatBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcMutantCatBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_MUTANT_CAT && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_MUTANT_CAT) {
      if (wallet.staked_at_nordic >= RdtWallet.NORDIC_STAKE_LIMIT) {
        return this.getBenefitMsg(20)
      } else {
        return this.getBenefitMsg(15)
      }
    } else {
      return RdtWallet.NO_CASHBACK
    }
  }

  private static readonly RDT_LIMIT_MYSTIC_TIGER = 150
  private renderMysticTigerSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.net/collection/Mystic%20Tigers%20Brotherhood' target="_blank">Mystic Tiger Brotherhood{this.getProjectUpToMsg(20)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/1654' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_MYSTIC_TIGER)}</a></td>
        <td class="table-head">{this.calcMysticTigerBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcMysticTigerBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_MYSTIC_TIGER && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_MYSTIC_TIGER) {
      return this.getBenefitMsg(20)
    } else {
      return RdtWallet.NO_CASHBACK
    }
  }

  private static readonly RDT_LIMIT_RADIX_PANDA = 300
  private renderRadixPandaSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.net/collection/Radix%20Panda' target="_blank">Radix Panda{this.getProjectUpToMsg(25)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/2760' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_RADIX_PANDA)}</a></td>
        <td class="table-head">{this.calcRadixPandaBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcRadixPandaBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_RADIX_PANDA && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_RADIX_PANDA) {
      return this.getBenefitMsg(25)
    } else {
      return RdtWallet.NO_CASHBACK
    }
  }

  private static readonly RDT_LIMIT_RAD_FAM = 500
  private renderRadFamSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.io/collection/RadFam' target="_blank">RadFam{this.getProjectUpToMsg(25)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/3059' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_RAD_FAM)}{this.getStakeNordicMsg(wallet)}</a></td>
        <td class="table-head">{this.calcRadFamBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcRadFamBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_RAD_FAM && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_RAD_FAM) {
      if (wallet.staked_at_nordic >= RdtWallet.NORDIC_STAKE_LIMIT) {
        return this.getBenefitMsg(25)
      } else {
        return this.getBenefitMsg(20)
      }
    } else {
      return RdtWallet.NO_CASHBACK
    }
  }

  private static readonly RDT_LIMIT_ROIDETTES = 300
  private renderRoidettesSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.io/collection/Roidettes' target="_blank">Roidettes{this.getProjectUpToMsg(20)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/3605' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_ROIDETTES)}</a></td>
        <td class="table-head">{this.calcRoidettesBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcRoidettesBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_ROIDETTES && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_ROIDETTES) {
      return this.getBenefitMsg(20)
    } else {
      return RdtWallet.NO_CASHBACK
    }
  }

  private static readonly RDT_LIMIT_HORRIBLE_HEADS = 500
  private renderHorribleHeadsSection(wallet: Wallet) {
    return (
      <tr>
        <td class="table-head text-start"><a href='https://www.vikingland.io/collection/Horrible%20Heads' target="_blank">Horrible Heads{this.getProjectUpToMsg(25)}</a></td>
        <td class="table-des text-start"><a href='https://t.me/radix_radiator/4571' target="_blank">{this.getHoldRdtMsg(wallet, RdtWallet.RDT_LIMIT_HORRIBLE_HEADS)}</a></td>
        <td class="table-head">{this.calcHorribleHeadsBenefit(wallet)}</td>
      </tr>
    )
  }

  private calcHorribleHeadsBenefit(wallet: Wallet): string {
    if (wallet.rdt >= RdtWallet.RDT_LIMIT_HORRIBLE_HEADS && wallet.rdt_7_days_ago >= RdtWallet.RDT_LIMIT_HORRIBLE_HEADS) {
      return this.getBenefitMsg(25)
    } else {
      return RdtWallet.NO_CASHBACK
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
}
