import { Component, getAssetPath, h, Host, State, Watch } from '@stencil/core';
import { rdt, DappUtils } from '../../scripts/connect-button';
import { WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';

@Component({
  tag: 'portfolio-page',
  styleUrl: 'portfolio-page.scss',
})
export class PortfolioPage {

  @State()
  location: string = window.location.hash.replace('#', '');
  logoSrc: string = getAssetPath(`../assets/logo.png`);
  resources: string[] = ['resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd', 'resource_rdx1tkw9gqj0kl3jy0y6s0jfs8344xgf56l2cnlsk7wgpa6mrfvzv3jzaz'];


  @State() chartData: number[] = [];
  @State() chartDates: string[] = [];

  @State() wallets: WalletDataStateAccount[] = [];
  @State() selectedWallet: WalletDataStateAccount | null = null;
  @State() selectedResource: string = 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd';

  @State() loading: boolean = true;
  @State() error: string | null = null;

  // Lifecycle-Methode, die ausgeführt wird, bevor die Komponente geladen wird
  componentWillLoad() {
    this.wallets = DappUtils.getWallets();
  }

  componentDidLoad() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  handleWalletSelected(event: CustomEvent<WalletDataStateAccount>) {
    this.selectedWallet = event.detail;
    console.log('Selected option:', this.selectedWallet.label);
  }

  handleResourceSelected(event: CustomEvent<string>) {
    this.selectedResource = event.detail;
    console.log('Selected option:', this.selectedResource);
  }
  
  @Watch('selectedResource')
  @Watch('selectedWallet')
  countChanged() {
    this.fetchData();
  }




  async fetchData() {
    const data = [];
    const dates = [];
    try {
      if (this.selectedWallet !== null) {
        
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 3)
        while (currentDate != new Date()) {
          currentDate.setDate(currentDate.getDate() + 1);
          const b1 = await DappUtils.getFungibleBalanceForAccountAndTime(this.selectedWallet?.address, this.selectedResource, currentDate);
          data.push(b1);
          dates.push(currentDate.toDateString());
        }
      }
    } catch (err) {
      this.error = 'Couldnt load values';
    } finally {
      this.chartData = data;
      this.chartDates = dates;
    }
  }

  render() {
    return (
      <Host>
        {this.renderNavBar()}
        <div class="content-container fade-in-slow">
          {this.renderContent()}
        </div>
        {this.renderFooter()}
      </Host>
    );
  }

  private onHashChange() {
    this.location = window.location.hash.replace('#', '');
  }

  private renderNavBar() {
    rdt.buttonApi.setTheme('radix-blue');
    return <nav class="navbar navbar-expand-lg navbar-light fixed-top crumb-page-navbar fade-in-down">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">
          <img src={this.logoSrc} alt="radixportfolio logo" width="64" class="p-2"></img>
          Radixportfolio
        </a>
        <div class="offcanvas offcanvas-end" tabindex={-1} id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">CrumbsUp</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body crumb-offcanvas">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="menu-item" data-bs-dismiss="offcanvas"><a class="nav-link" href="#">Home</a></li>
              <li class="menu-item" data-bs-dismiss="offcanvas"><a class="nav-link" href="#about">About</a></li>
            </ul>
            <radix-connect-button></radix-connect-button>
          </div>
        </div>
      </div>
    </nav>;

  }

  private renderContent() {
    if (this.location === 'about') {
      return <about-page></about-page>;
    }
    else {
      return <div class="container d-block">
        <wallet-dropdown wallets={this.wallets} onWalletSelected={(event: CustomEvent<WalletDataStateAccount>) => this.handleWalletSelected(event)}></wallet-dropdown>
        <resource-dropdown resources={this.resources} onResourceSelected={(event: CustomEvent<string>) => this.handleResourceSelected(event)}></resource-dropdown>
        <portfolio-chart chartdata={this.chartData} label={this.selectedWallet?.label} chartdates={this.chartDates}></portfolio-chart>
      </div>
    }
  }

  private renderFooter() {
    return (
      <div class="footer">
        <a class="nav-link footer-link" href="#terms">Terms & Conditions</a>
        <a class="nav-link footer-link" href="#privacy">Privacy Policy</a>
      </div>
    );

  }


}
