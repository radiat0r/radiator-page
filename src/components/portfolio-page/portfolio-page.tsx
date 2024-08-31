import { Component, getAssetPath, h, Host, State, Watch } from '@stencil/core';
import { rdt, DappUtils } from '../../scripts/connect-button';
import { WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';
import { FungibleResourcesCollectionItemVaultAggregated, FungibleResourcesVaultCollection, StateEntityDetailsVaultResponseItem } from '@radixdlt/babylon-gateway-api-sdk';

@Component({
  tag: 'portfolio-page',
  styleUrl: 'portfolio-page.scss',
})


export class PortfolioPage {

  @State()
  location: string = window.location.hash.replace('#', '');
  logoSrc: string = getAssetPath(`../assets/logo.png`);
  
  allResourceData: { [key: string]: number[] } = {
    'timestamps':[],
  };
  

  @State() walletResources: string[] = [];
  @State() chartData: number[] = [0];
  @State() chartDates: string[] = ["0"];

  @State() wallets: WalletDataStateAccount[] = [];
  @State() selectedWallet: WalletDataStateAccount | null = null;
  @State() selectedResource: string = "";

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
  }

  handleResourceSelected(event: CustomEvent<string>) {
    this.selectedResource = event.detail;
  }

  @Watch('selectedResource')
  resourceChanged() {
    // update chart
    this.chartData = this.allResourceData[this.selectedResource];
    this.chartDates = this.allResourceData['timestamps'].map(timestamp => {const date = new Date(timestamp);return date.toLocaleDateString()});
  }

  @Watch('selectedWallet')
  walletChanged() {
    this.fetchData();
    this.fetchWalletResources();
  }


  async fetchWalletResources() {
    try {
      if (this.selectedWallet) {
        const entityDetails: StateEntityDetailsVaultResponseItem = await DappUtils.getEntityDetails(this.selectedWallet?.address);

        const r: FungibleResourcesVaultCollection = entityDetails.fungible_resources;
        console.info(entityDetails);
        console.info(r.items);

        this.walletResources = [];
        const i: FungibleResourcesCollectionItemVaultAggregated[] = r.items;
        for (let index = 0; index < i.length; index++) {
          const res: FungibleResourcesCollectionItemVaultAggregated = i[index];
          if (Number(res.vaults.items[0].amount) > 1) {
            this.walletResources.push(res.resource_address);
          }
        }
      }
    } catch (error) {

    }
  }

  async fetchData() {
    try {
      if (this.selectedWallet !== null && this.selectedResource !== "") {

        this.allResourceData={};
        this.allResourceData['timestamps']=[];

        const startDate = new Date('2024-08-17');
        const endDate = new Date('2024-08-31');

        const currentDate = new Date(startDate);
     
        while (currentDate <= endDate) {
          console.log(currentDate);
          this.allResourceData['timestamps'].push(currentDate.valueOf());
          
          const b1: FungibleResourcesCollectionItemVaultAggregated[] = await DappUtils.getFungibleBalanceForAccountAndTime(this.selectedWallet?.address, currentDate);

          for (const el of b1) {
            const res = el.resource_address;
            const amount: number = parseFloat(el.vaults.items[0].amount);
            if (amount) {
              if (!this.allResourceData[res]) {
                this.allResourceData[res] = [amount];
              }
              else {
                this.allResourceData[res].push(amount);
              }
            } else {
              if (!this.allResourceData[res]) {
                this.allResourceData[res] = [0];
              }
            }
            
          }
          
          currentDate.setDate(currentDate.getDate() + 1); // Einen Tag hinzufügen
        }
      }
    } catch (err) {
      console.error(err);
      this.error = 'Couldnt load values';
    } finally {
      this.chartData = this.allResourceData[this.selectedResource];
      this.chartDates = this.allResourceData['timestamps'].map(timestamp => {const date = new Date(timestamp);return date.toLocaleDateString()});
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
        <div><wallet-dropdown wallets={this.wallets} onWalletSelected={(event: CustomEvent<WalletDataStateAccount>) => this.handleWalletSelected(event)}></wallet-dropdown>
          <resource-dropdown resources={this.walletResources} onResourceSelected={(event: CustomEvent<string>) => this.handleResourceSelected(event)}></resource-dropdown></div>
        <div><portfolio-chart chartdata={this.chartData} label={this.selectedWallet?.label} chartdates={this.chartDates}></portfolio-chart></div>
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
