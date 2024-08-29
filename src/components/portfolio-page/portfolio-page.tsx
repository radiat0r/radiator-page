import { Component, getAssetPath, h, Host, State } from '@stencil/core';
import { rdt, DappUtils } from '../../scripts/connect-button';

@Component({
  tag: 'portfolio-page',
  styleUrl: 'portfolio-page.scss',
})
export class PortfolioPage {

  @State()
  location: string = window.location.hash.replace('#', '');
  logoSrc: string = getAssetPath(`../assets/logo.png`);
  xrd_res: string = 'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd';
  lsu_res: string = 'resource_rdx1tkw9gqj0kl3jy0y6s0jfs8344xgf56l2cnlsk7wgpa6mrfvzv3jzaz';

  @State() chartData: number[] = [];
  @State() chartDates: string[] = [];
  @State() chartLabel: string = "";
  @State() loading: boolean = true;
  @State() error: string | null = null;

    // Lifecycle-Methode, die ausgeführt wird, bevor die Komponente geladen wird
    componentWillLoad() {
      this.fetchData();  // Asynchrone Datenabrufmethode aufrufen
    }
  
    async fetchData(){
      try {
        const address = DappUtils.getWalletAccountAddress();
        const l = DappUtils.getWalletDetails();
        this.chartLabel = l;
        
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth()- 11)
        for (let i = 0; i < 11; i++) {
          currentDate.setMonth(currentDate.getMonth()+1);
          const b1 = await DappUtils.getFungibleBalanceForAccountAndTime(address, this.lsu_res, currentDate);
          this.chartData.push(b1);
          this.chartDates.push(currentDate.toDateString());
        }

        
        console.info('label - ', this.chartLabel);
        console.info('balance', this.chartData);
      } catch (err) {
        // Fehlerstatus aktualisieren
        this.error = 'Daten konnten nicht geladen werden';
      } finally {
        // Ladezustand beenden
        this.loading = false;
      }
    }

  componentDidLoad() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
  }

  render() {
    console.info('rendering')
    console.info(this.chartData)
    console.info(this.chartDates)
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
        //const address = DappUtils.getWalletAccountAddress();
        return <div class="container d-block"><portfolio-chart chartdata={this.chartData} label={this.chartLabel} chartdates={this.chartDates}></portfolio-chart></div>
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
