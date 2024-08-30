import { Component, h, Element, Prop, Watch, State } from '@stencil/core';
import Chart from 'chart.js/auto';

@Component({
  tag: 'portfolio-chart',
  styleUrl: 'portfolio-chart.scss',
  shadow: true,
})

export class PortfolioChart {
  @Element() el!: HTMLElement;

  @State() chart: Chart | null = null; // State, um die Chart-Instanz zu verwalten

  @Prop() label: string = "";
  @Prop() chartdata: number[] = [];
  @Prop() chartdates: string[] = [];

  componentDidLoad() {
    this.initializeChart();
  }

  @Watch('chartdata')
  labelsChangedHandler() {
    if (this.chart) {
      this.chart.data.labels = this.chartdates;
      this.chart.data.datasets[0].data = this.chartdata; // Aktualisieren der Daten
      this.chart.data.datasets[0].label = this.label; // Aktualisieren der Daten
      this.chart.update()
    }
  }
  
  initializeChart() {
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
            labels: this.chartdates,
            datasets: [
              {
                label: this.label,
                data: this.chartdata,
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
