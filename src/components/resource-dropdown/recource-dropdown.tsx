import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { ResourceDetails } from '../../scripts/connect-button';

@Component({
    tag: 'resource-dropdown',
    styleUrl: 'resource-dropdown.scss',
    shadow: true,
})


export class ResourceDropdownMenu {
    @State() isOpen: boolean = false;  // Zustand zum Verwalten der Sichtbarkeit des Dropdowns
    @State() buttonlabel: string = "Resource Select";
    @Prop() resources: ResourceDetails[] = [];

    // Definition des Custom Events
    @Event() resourceSelected: EventEmitter<ResourceDetails> | undefined;


    toggleDropdown() {
        this.isOpen = !this.isOpen;  // Umschalten der Sichtbarkeit des Dropdowns
    }

    handleOptionClick(option: ResourceDetails): void {
        if (this.resourceSelected) {
            this.resourceSelected.emit(option); // Event auslösen und die ausgewählte Option senden
            this.buttonlabel = option.name;
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
                        {this.resources.map(option => (
                            <li class="dropdown-item" onClick={() => this.handleOptionClick(option)}>
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}
