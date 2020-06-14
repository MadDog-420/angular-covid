import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Monthly Cases    ==========---------- */

      const dataMonthCasesChart: any = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May','Jun'],
          series: [
              [0.00580, 0.078651, 0.337843, 2.604070, 5.275936, 7.585099]
          ]
      };

     const optionsMonthCasesChart: any = {
          axisY: {
            offset: 60,
            labelInterpolationFnc: function(value) {
              return value + ' M'
            },
            scaleMinSpace: 16
          },
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var monthCasesChart = new Chartist.Line('#monthCasesChart', dataMonthCasesChart, optionsMonthCasesChart);

      this.startAnimationForLineChart(monthCasesChart);


      /* ----------==========     Last Week Cases    ==========---------- */

      var dataWeekChart = {
        labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
        series: [
          [104, 115, 120, 130, 130, 128, 113]

        ]
      };
      var optionsWeekChart = {
          axisX: {
              showGrid: false
          },
          axisY: {
            offset: 60,
            labelInterpolationFnc: function(value) {
              return value + ' K'
            },
          },
          low: 1,
          high: 200,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#weekCasesChart', dataWeekChart, optionsWeekChart, responsiveOptions);

      this.startAnimationForBarChart(websiteViewsChart);

      /* ----------==========     Monthly Deaths    ==========---------- */

      const dataMonthDeathsChart: any = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May','Jun'],
        series: [
            [0.043, 0.066, 3.672, 6.695, 4.650, 4.951]
        ]
      };

      const optionsMonthDeathsChart: any = {
            axisY: {
              offset: 60,
              labelInterpolationFnc: function(value) {
                return value + ' K'
              },
              scaleMinSpace: 16
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        }

      var monthDeathsChart = new Chartist.Line('#monthDeathsChart', dataMonthDeathsChart, optionsMonthDeathsChart);

      this.startAnimationForLineChart(monthDeathsChart);

    
      /* ----------==========     Last Week Deaths    ==========---------- */

      var dataWeekDeathsChart = {
        labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
        series: [
          [4, 5.154, 3.621, 2.926, 4.288, 5.647, 4.586]

        ]
      };
      var optionsWeekDeathsChart = {
          axisX: {
              showGrid: false
          },
          axisY: {
            offset: 60,
            labelInterpolationFnc: function(value) {
              return value + ' K'
            },
          },
          low: 1,
          high: 8,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };

      var weekDeathsChart = new Chartist.Bar('#weekDeathsChart', dataWeekDeathsChart, optionsWeekDeathsChart, responsiveOptions);

      this.startAnimationForBarChart(weekDeathsChart);
  }

}
