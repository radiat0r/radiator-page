import { Component, getAssetPath, h, Host, State, Watch } from '@stencil/core';
import { rdt, DappUtils } from '../../scripts/connect-button';
import { WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';
import {
  FungibleResourcesCollectionItemVaultAggregated,
  FungibleResourcesVaultCollection,
  MetadataGlobalAddressValue,
  MetadataGlobalAddressValueFromJSON,
  StateEntityDetailsResponseComponentDetails,
  StateEntityDetailsResponseFungibleResourceDetails,
  StateEntityDetailsResponseItemDetails,
  StateEntityDetailsResponseItemDetailsFromJSON,
  StateEntityDetailsVaultResponseItem
} from '@radixdlt/babylon-gateway-api-sdk';

@Component({
  tag: 'portfolio-page',
  styleUrl: 'portfolio-page.scss',
})

//xrd: resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd

//bobby: validator_rdx1s0k2g57gxld3nydl8535e2tkp6tduh6pmynd3mf2a3q428zh09n24s 
//internal_vault of validator: internal_vault_rdx1tpt9lgwrtscat7pn0w4ad3kxedelwenz2tqvre2t5a7jyr67dygatk
// lsu of bobby: resource_rdx1tkw9gqj0kl3jy0y6s0jfs8344xgf56l2cnlsk7wgpa6mrfvzv3jzaz

export class PortfolioPage {

  @State()
  location: string = window.location.hash.replace('#', '');
  logoSrc: string = getAssetPath(`../assets/logo.png`);

  allResourceData: { [key: string]: number[] } = {
    'timestamps': [],
  };


  @State() wallet_resources: string[] = [];
  @State() chartData: number[] = [0];
  @State() chartDates: string[] = ["0"];

  @State() wallets: WalletDataStateAccount[] = [];
  @State() selected_wallet: WalletDataStateAccount | null = null;
  @State() selected_resource: string = "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd";
  @State() selected_resource_is_LSU_of_Validator: string = "";

  @State() loading: boolean = true;
  @State() error: string | null = null;

  componentWillLoad() {
    this.wallets = DappUtils.getWallets();
  }

  componentDidLoad() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  handleWalletSelected(event: CustomEvent<WalletDataStateAccount>) {
    this.selected_wallet = event.detail;
  }

  handleResourceSelected(event: CustomEvent<string>) {
    this.selected_resource = event.detail;
  }

  @Watch('selected_resource')
  resourceChanged() {
    // update chart
    this.chartData = this.allResourceData[this.selected_resource];
    this.chartDates = this.allResourceData['timestamps'].map(timestamp => { const date = new Date(timestamp); return date.toLocaleDateString() });

    this.isResourceLSUofValidator();
  }

  async isResourceLSUofValidator() {
    try {
      const lsu_details: StateEntityDetailsVaultResponseItem = await DappUtils.getEntityDetails(this.selected_resource);
      
      if (lsu_details && lsu_details.metadata) {
        const val = lsu_details.metadata?.items.find(item => item.key === "validator");
        if (val?.value) {
          // first get corresponding validator
          const ga: MetadataGlobalAddressValue = MetadataGlobalAddressValueFromJSON(val.value.typed);
          const validator_address: string = ga.value
          if (validator_address) {
            console.log(validator_address);
            this.selected_resource_is_LSU_of_Validator = validator_address;
          }

          // second get corresponding internal_vault
          const validator_details: StateEntityDetailsVaultResponseItem = await DappUtils.getEntityDetails(validator_address);
          const a: StateEntityDetailsResponseComponentDetails = StateEntityDetailsResponseItemDetailsFromJSON(validator_details.details) as StateEntityDetailsResponseComponentDetails;

          console.log(a)
          //const b: StateEntityDetailsResponseComponentDetails = StateEntityDetailsResponseItemDetailsFromJSON(a.type);

          //const b: StateEntityDetailsResponseComponentDetails = a;
          console.log(validator_details)
          // get entityDetails with balances for internal validator vault for calculating LSU token value
          //const vault: string = await DappUtils.getFungibleBalanceForVaultandTime("internal_vault_rdx1tpt9lgwrtscat7pn0w4ad3kxedelwenz2tqvre2t5a7jyr67dygatk", new Date())
          //console.log(vault);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  @Watch('selected_wallet')
  walletChanged() {
    this.fetchWalletResources();
    this.fetchData();
  }


  async fetchWalletResources() {
    try {
      if (this.selected_wallet) {
        const entityDetails: StateEntityDetailsVaultResponseItem = await DappUtils.getEntityDetails(this.selected_wallet?.address);

        const r: FungibleResourcesVaultCollection = entityDetails.fungible_resources;
        console.info(entityDetails);
        console.info(r.items);

        this.wallet_resources = [];
        const i: FungibleResourcesCollectionItemVaultAggregated[] = r.items;
        for (let index = 0; index < i.length; index++) {
          const res: FungibleResourcesCollectionItemVaultAggregated = i[index];
          if (Number(res.vaults.items[0].amount) > 1) {
            this.wallet_resources.push(res.resource_address);
          }
        }
      }
    } catch (error) {

    }
  }

  async fetchData() {
    try {
      if (this.selected_wallet !== null && this.selected_resource !== "") {

        this.allResourceData = {};
        this.allResourceData['timestamps'] = [];

        const startDate = new Date('2024-08-01');
        const endDate = new Date('2024-08-31');

        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          console.log(currentDate);
          this.allResourceData['timestamps'].push(currentDate.valueOf());

          const b1: FungibleResourcesCollectionItemVaultAggregated[] = await DappUtils.getFungibleBalanceForAccountAndTime(this.selected_wallet?.address, currentDate);

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
      this.chartData = this.allResourceData[this.selected_resource];
      this.chartDates = this.allResourceData['timestamps'].map(timestamp => { const date = new Date(timestamp); return date.toLocaleDateString() });
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
          <resource-dropdown resources={this.wallet_resources} onResourceSelected={(event: CustomEvent<string>) => this.handleResourceSelected(event)}></resource-dropdown></div>
        <div><portfolio-chart chartdata={this.chartData} label={this.selected_wallet?.label} chartdates={this.chartDates}></portfolio-chart></div>
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
