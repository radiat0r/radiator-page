import { WalletDataStateAccount } from '@radixdlt/radix-dapp-toolkit';
import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'wallet-dropdown',
    styleUrl: 'wallet-dropdown.scss',
    shadow: true,
})
export class DropdownMenu {
    @State() isOpen: boolean = false;  // Zustand zum Verwalten der Sichtbarkeit des Dropdowns

    @Prop() wallets: WalletDataStateAccount[] = [];

    // Definition des Custom Events
    @Event() optionSelected: EventEmitter<WalletDataStateAccount> | undefined;

    toggleDropdown() {
        this.isOpen = !this.isOpen;  // Umschalten der Sichtbarkeit des Dropdowns
    }

    handleOptionClick(option: WalletDataStateAccount): void {
        if (this.optionSelected) {
            this.optionSelected.emit(option); // Event auslösen und die ausgewählte Option senden
        }
        this.isOpen = false; // Dropdown schließen
    }

    render() {
        return (
            <div class="dropdown">
                <button class="dropdown-toggle" onClick={() => this.toggleDropdown()}>
                    Wallet Select
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
