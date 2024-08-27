import { Component, getAssetPath, h, Host, State } from '@stencil/core';
import { rdt } from '../../scripts/connect-button';
import { DataRequestBuilder } from '@radixdlt/radix-dapp-toolkit';

@Component({
  tag: 'portfolio-page',
  styleUrl: 'portfolio-page.scss',
})
export class PortfolioPage {

  @State()
  location: string = window.location.hash.replace('#', '');

  logoSrc: string = getAssetPath(`../assets/logo.png`);


  componentDidLoad() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
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
    rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1).withProof);
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
        return <div>test</div>;
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
