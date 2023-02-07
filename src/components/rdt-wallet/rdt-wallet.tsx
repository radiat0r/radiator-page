import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'rdt-wallet',
  styleUrl: 'rdt-wallet.scss',
})
export class RdtWallet {

  render() {
    return (
      <Host>
        <p>Wallet component</p>
      </Host>
    );
  }

}
