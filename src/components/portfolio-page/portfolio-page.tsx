import { Component, getAssetPath, h, Host, State, Watch } from '@stencil/core';
import { rdt, DappUtils, ResourceDetails } from '../../scripts/connect-button';
import { MetadataStringValue, WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';
import {
  FungibleResourcesCollectionItemVaultAggregated,
  FungibleResourcesVaultCollection,
  MetadataGlobalAddressValue,
  MetadataGlobalAddressValueFromJSON,
  MetadataStringValueFromJSON,
  StateEntityDetailsResponseComponentDetails,
  StateEntityDetailsResponseItemDetailsFromJSON,
  StateEntityDetailsVaultResponseItem
} from '@radixdlt/babylon-gateway-api-sdk';
import {
  ValidatorFieldStateValueFromJSON,
  ValidatorFieldStateValue
} from "@radixdlt/babylon-core-api-sdk"

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

  all_resource_data: { [key: string]: number[] } = {
    'timestamps': [],
  };


  @State() wallet_all_resources: ResourceDetails[] = [];
  @State() chartData: number[] = [];
  @State() chartDates: string[] = [];

  @State() wallets: WalletDataStateAccount[] = [];
  @State() selected_wallet: WalletDataStateAccount | null = null;
  @State() selected_resource: ResourceDetails = new ResourceDetails();
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
    this.selected_wallet = event.detail || '';
  }

  handleResourceSelected(event: CustomEvent<ResourceDetails>) {
    this.selected_resource = event.detail || '';
  }

  @Watch('selected_resource')
  resourceChanged() {
    // update chart
    this.chartDates = this.all_resource_data['timestamps'].map(timestamp => { const date = new Date(timestamp); return date.toLocaleDateString() });
    this.chartData = this.all_resource_data[this.selected_resource.address];
    this.isResourceLSUofValidator();
  }

  async isResourceLSUofValidator() {
    try {
      const lsu_details: StateEntityDetailsVaultResponseItem = await DappUtils.getEntityDetails(this.selected_resource.address);

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
          const b: ValidatorFieldStateValue = ValidatorFieldStateValueFromJSON(a.state);
          console.log(b.stake_xrd_vault.entity_address)
          const validator_internal_vault_address: string = b.stake_xrd_vault.entity_address;

          // third get entityDetails with balances for internal validator vault for calculating LSU token value
          const vault_balance: number = await DappUtils.getFungibleBalanceForVaultandTime(validator_internal_vault_address, new Date())
          console.log(vault_balance);





        }
      }
    } catch (error) {
      console.error("Error fetching LSU resources: ", error);
    }
  }

  @Watch('selected_wallet')
  walletChanged() {
    this.fetchWalletResources();
    this.fetchData();
  }


  async fetchWalletResources() {
    this.loading=true;
    try {
      if (this.selected_wallet) {
        const entityDetails: StateEntityDetailsVaultResponseItem = await DappUtils.getEntityDetails(this.selected_wallet?.address);

        const r: FungibleResourcesVaultCollection = entityDetails.fungible_resources;

        this.wallet_all_resources = [];
        const i: FungibleResourcesCollectionItemVaultAggregated[] = r.items;
        for (let index = 0; index < i.length; index++) {
          const r: FungibleResourcesCollectionItemVaultAggregated = i[index];

          let wrd: ResourceDetails = new ResourceDetails();
          wrd.address = r.resource_address;
          const rd = await DappUtils.getEntityDetails(r.resource_address);
          const token_name = rd.metadata?.items.find(item => item.key === "name");
          if (token_name?.value) {
            // first get corresponding validator
            const ga: MetadataStringValue = MetadataStringValueFromJSON(token_name.value.typed);
            const name_str: string = ga.value
            if (name_str) {
              wrd.name = name_str;
            }
          }
          this.wallet_all_resources.push(wrd);
        }
      }
      this.loading = false;
    } catch (error) {
      console.error("Error fetching wallet resources: ", error);
    }
  }



  async fetchData() {
    this.loading = true;
    try {
      if (this.selected_wallet) {
        this.all_resource_data = { timestamps: [] };

        const startDate = new Date('2024-07-01');
        const endDate = new Date('2024-08-18');
        const dates: Date[] = [];

        for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
          dates.push(new Date(currentDate));
        }

        const balancePromises = dates.map(date =>
          DappUtils.getFungibleBalanceForAccountAndTime(this.selected_wallet!.address, date)
        );

        const balancearray_by_dates = await Promise.all(balancePromises);

        //console.assert(dates.length !== balancearray_by_dates.length);

        balancearray_by_dates.forEach((b: FungibleResourcesCollectionItemVaultAggregated[], index) => {
          let res_to_zero = this.wallet_all_resources;
          const date = dates[index];
          this.all_resource_data['timestamps'].push(date.valueOf());
          // Process balance

          for (const el of b) {
            const res = el.resource_address;
            const amount: number = parseFloat(el.vaults.items[0].amount);

            if (amount !== null && amount !== undefined) {
              if (!this.all_resource_data[res]) {
                this.all_resource_data[res] = [amount];
              }
              else {
                this.all_resource_data[res].push(amount);
              }
            } else {
              if (!this.all_resource_data[res]) {
                this.all_resource_data[res] = [0];
              }
            }
            res_to_zero = res_to_zero.filter(item => item.address !== res);
          }

          res_to_zero.forEach(r => {
            if (!this.all_resource_data[r.address]) {
              this.all_resource_data[r.address] = [0];
            }
            else (
              this.all_resource_data[r.address].push(0)
            )
          });

        });
      }
      this.loading = false;
    } catch (error) {
      console.error('Error fetching data: ', error);
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
          <resource-dropdown resources={this.wallet_all_resources} onResourceSelected={(event: CustomEvent<ResourceDetails>) => this.handleResourceSelected(event)}></resource-dropdown></div>
          <div>
        {this.loading ? (
          <p>Loading...</p>
        ) : this.error ? (
          <p>Error: {this.error}</p>
        ) : (
          <div><portfolio-chart chartdata={this.chartData} label={this.selected_resource.name} chartdates={this.chartDates}></portfolio-chart></div>
        )}
      </div>
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
