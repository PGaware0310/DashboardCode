import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-vendor-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './vendor-chart.component.html',
  styleUrl: './vendor-chart.component.scss',
})
export class VendorChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  async ngOnInit() {
    const HC_more = await import('highcharts/highcharts-more');
    const HC_solidGauge = await import('highcharts/modules/solid-gauge');

    HC_more.default(Highcharts);
    HC_solidGauge.default(Highcharts);
  }

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      width: 700,
      height: 300,
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
    },
    yAxis: {
      min: 0,
      max: 40,
      tickPositions: [0, 20, 40, 60, 80, 100],
      title: {
        text: 'Security Rating',
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderRadius: 5,
      },
    },
    series: [
      {
        name: 'High Risk',
        type: 'column',
        data: [10, 10, 12, 8, 5, 10, 8, 10, 12, 8, 10, 10],
        color: '#ddd',
      },
      {
        name: 'Medium Risk',
        type: 'column',
        data: [15, 20, 18, 12, 15, 20, 15, 20, 18, 22, 18, 15],
        color: '#a78bfa',
      },
      {
        name: 'Low Risk',
        type: 'column',
        data: [20, 30, 25, 15, 10, 35, 40, 30, 25, 35, 30, 20],
        color: '#8b5cf6',
      },
    ],
  };

  chartOptionss: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 200
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        innerSize: '70%',  
        dataLabels: {
          enabled: false
        },
        borderWidth: 0
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        type: 'pie',
        name: 'Usage',
        data: [
          { name: 'Used', y: 80, color: '#8b5cf6' }, 
          { name: 'Available', y: 20, color: '#e5e7eb' } 
        ]
      }
    ]
  };
  
}
