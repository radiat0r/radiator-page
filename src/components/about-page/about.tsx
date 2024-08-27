import { Component, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'about-page',
  styleUrl: 'about.scss',
  assetsDirs: ['assets'],
})
export class About {

  aboutSrc: string = getAssetPath(``);

  render() {
    return (
      <div class="container d-block">
        <h1 class="card-title">What is this site?</h1>
        <div class="card crumbsup-card">
          <div class="card-body">
            <p class="card-text">just a portfolio</p>
            <p class="card-text">lets see if this works</p>
          </div>
        </div>
      </div>
    );
  }
}
