import { WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';
import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'wallet-dropdown',
    styleUrl: 'wallet-dropdown.scss',
    shadow: true,
})
export class WalletDropdownMenu {
    @State() isOpen: boolean = false;  // Zustand zum Verwalten der Sichtbarkeit des Dropdowns
    @State() buttonlabel: string = "Wallet Select";
    @Prop() wallets: WalletDataStateAccount[] = [];

    // Definition des Custom Events
    @Event() walletSelected: EventEmitter<WalletDataStateAccount> | undefined;

    toggleDropdown() {
        this.isOpen = !this.isOpen;  // Umschalten der Sichtbarkeit des Dropdowns
    }

    handleOptionClick(option: WalletDataStateAccount): void {
        if (this.walletSelected) {
            this.walletSelected.emit(option); // Event auslösen und die ausgewählte Option senden
            this.buttonlabel = option.label;
        }
        this.isOpen = false; // Dropdown schließen
    }

    render() {
        return (
            <div class="dropdown">
                <button class="dropdown-toggle" onClick={() => this.toggleDropdown()}>
                    {this.buttonlabel}
                </button>
                {this.isOpen && ( // Nur anzeigen, wenn isOpen true ist
                    <ul class="dropdown-menu">
                        {this.wallets.map(option => (
                            <li class="dropdown-item" onClick={() => this.handleOptionClick(option)}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}
