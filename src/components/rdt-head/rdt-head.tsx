import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rdt-head',
  styleUrl: 'rdt-head.scss',
})
export class RdtHead {

  render() {
    return (
      <Host>
        <div class="header-main">
          <div class="header-container container">
            <div class="header-wrap">
              <rdt-logo></rdt-logo>
              <div class="header-nav-toggle">
                <a href="#" class="navbar-toggle" data-menu-toggle="header-navbar-menu">
                  <div class="toggle-line">
                    <span></span>
                  </div>
                </a>
              </div>
              <div class="header-navbar header-navbar-s3">
                <nav class="header-menu justify-content-between" id="header-navbar-menu">
                  <ul class="menu menu-s2 animated" data-animate="fadeInDown" data-delay=".75">
                    <li class="menu-item"><a class="menu-link nav-link" href="#ico">What is ICO</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#tokens">Tokens</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#roadmap">Roadmap</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#apps">Apps</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#team">Team</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#faq">Faq</a></li>
                    <li class="menu-item"><a class="menu-link nav-link" href="#contact">Contact</a></li>
                  </ul>
                  <ul class="menu-btns animated" data-animate="fadeInDown" data-delay=".85">
                    <li><a href="#" data-bs-toggle="modal" data-bs-target="#register-popup" class="btn btn-rg btn-auto btn-outline btn-grad on-bg-theme-dark-alt"><span>Sign Up</span></a></li>
                    <li><a href="#" data-bs-toggle="modal" data-bs-target="#login-popup" class="btn btn-rg btn-auto btn-outline btn-grad on-bg-theme-dark-alt"><span>Log In</span></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
