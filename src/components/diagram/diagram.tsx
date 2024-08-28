import { Component, h, Element } from '@stencil/core';
import { DappUtils } from '../../scripts/connect-button';
import Chart from 'chart.js/auto';

@Component({
  tag: 'portfolio-chart',
  styleUrl: 'diagram.scss',
  shadow: true,
})
export class MyChart {
  @Element() el!: HTMLElement;
  chart: any;

  componentDidLoad() {
    this.createChart();
  }

  createChart() {
    const address = DappUtils.getWalletAccountAddress();
    const label = DappUtils.getWalletDetails();
    const balance = DappUtils.getFungibleBalanceForAccount(address, "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd");
    
    console.info('label', label);
    console.info('balance', balance);

    // Verwende querySelector, um das Canvas-Element zu finden
    const canvas = this.el.shadowRoot?.querySelector('#portfolio') as HTMLCanvasElement | null;

    // Überprüfe, ob das Canvas-Element gefunden wurde
    if (canvas) {
      // Versuche, den 2D-Kontext des Canvas-Elements zu erhalten
      const ctx = canvas.getContext('2d');
      
      // Überprüfe, ob der Kontext erfolgreich abgerufen wurde
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets: [
              {
                label: '# of Votes',
                data: [1, 4, 2, 5, 2, 8, 12, 19, 6, 5, 8, 12],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        console.error('2D context could not be retrieved');
      }
    } else {
      console.error('Canvas element not found');
    }
  }

  render() {
    return <canvas id="portfolio"></canvas>;
  }
}
