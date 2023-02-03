import { Component, getAssetPath, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'rdt-head',
  styleUrl: 'rdt-head.scss',
  assetsDirs: ['assets']
})
export class RdtHead {

  @Prop() logoImage = "logo.png";

  render() {

    return (
      <Host>
        <div class="header-main">
          <div class="header-container container">
            <div class="header-wrap">
              <div class="header-logo header-logo-ls logo animated" data-animate="fadeInDown" data-delay=".65">
                <a href="./" class="logo-link">
                  <img class="logo-light" src={getAssetPath(`./assets/${this.logoImage}`)} alt="logo"></img>
                </a>
              </div>
              <div class="header-nav-toggle">
                <a href="#" class="navbar-toggle" data-menu-toggle="rdt-navbar-menu">
                  <div class="toggle-line">
                    <span></span>
                  </div>
                </a>
              </div>
              <div class="header-navbar header-navbar-s3">
                <nav class="header-menu justify-content-between" id="rdt-navbar-menu">
                  <ul class="menu menu-s2 animated" data-animate="fadeInDown" data-delay=".75">
                    <li class="menu-item"><a class="menu-link nav-link" href="#ico">What is ICO</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#tokens">Tokens</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#roadmap">Roadmap</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#apps">Apps</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#team">Team</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#faq">Faq</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#contact">Contact</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <script src="assets/js/jquery.bundle.js?ver=210"></script>
        <script src="assets/js/scripts.js?ver=210"></script>
        <script src="assets/js/charts.js?ver=210"></script>
      </Host>
    );
  }

}
