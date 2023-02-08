import { Component, Host, h, State } from '@stencil/core'
import { loadWallet } from '../../assets/js/wallet';

@Component({
  tag: 'rdt-wallet',
  styleUrl: 'rdt-wallet.scss',
})
export class RdtWallet {

  @State()
  walletKey: string;

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
            <div class="col-sm-6">
              <p>Search result:</p>
            </div>
            <div class="col-sm-6">
              <p id="result"></p>"
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-10">
              <div class="data-table-area">
                <table class="data-table">
                  <thead class="bg-primary">
                    <tr class="data-head">
                      <th class="data-col text-start">Cashback Campaign</th>
                      <th class="data-col text-center">Benefit</th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr class="data-item">
                      <td class="data-col-inner index"> Radorables </td>
                      <td class="data-col-inner alphabetical">
                        <div class="d align-items-center">
                          <em class="icon-bg icon-bg-md icon-bg-eth ikon ikon-eth"></em>
                          <h4 class="title title-sm title-dark">Ethereum (ETH)</h4>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="alert alert-warning" role="alert">
          This is a warning alert—check it out!
        </div>
      </Host >
    );
  }

  private walletKeyChange(event) {
    this.walletKey = event.target.value;
  }

  private searchWallet() {

    console.log("Search for wallet: " + this.walletKey);

    const wallet = loadWallet(this.walletKey);
    console.log(wallet);
  }

}
