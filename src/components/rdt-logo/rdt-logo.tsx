import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rdt-logo',
  styleUrl: 'rdt-logo.scss',
})
export class RdtLogo {

  render() {
    return (
      <Host>
        <div class="header-logo header-logo-ls logo animated" data-animate="fadeInDown" data-delay=".65">
          <a href="./" class="logo-link">
            <div class="logo-inline">
              {this.renderLightning()}
              <span class="logo-text">RADIATOR</span>
              {this.renderLightning()}
            </div>
          </a>
        </div>
      </Host>
    );
  }

  private renderLightning() {
    return (
      <div class="lightning">
        <svg width="inherit" height="inherit" viewBox="0,0,128,128" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path id="wing" d="M 91 4 L 13 70 L 63 71 L 34 123 L112 56 L64 55 Z " fill="#ffac33"
            stroke-width="7" stroke="#ffac33" stroke-linejoin="round" />
        </svg>
      </div>
    )
  }
}
