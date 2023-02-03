import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'rdt-index',
    styleUrl: 'rdt-index.scss',
})
export class RdtHead {

    render() {

        return (
            <Host>
                <div class="nk-wrap">
                    <p>Hello World</p>
                </div>

                <script src="assets/js/jquery.bundle.js?ver=210"></script>
                <script src="assets/js/scripts.js?ver=210"></script>
                <script src="assets/js/charts.js?ver=210"></script>
            </Host >
        );
    }

}
