import { BrowserModule } from '@angular/platform-browser';
import { Component} from '@angular/core';
import { ChartModule, MapChart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { NullTemplateVisitor } from '@angular/compiler';

declare var require:any;

var Highcharts = require('highcharts/highmaps.js'),
  map = require('@highcharts/map-collection/custom/world.geo.json');

var arrayOfHttp=[];

@Component({
  selector: 'app-root',
  templateUrl: './maps.component.html',
})

export class MapsComponent{

  Highcharts=Highcharts;

  chartData=[];
  globalData=[];
  mapChart;

  /* ----------==========     Getting Data    ==========---------- */
  constructor(private http:HttpClient) {

    /* ----------==========     from: thevirustracker.com   ==========---------- */

    map.features.forEach(element => {
      arrayOfHttp.push(
        this.http
        .get(
          "https://thevirustracker.com/free-api?countryTotal="+element.id
        )
        .pipe(catchError(error => of(error)))
      )
    });
    
    this.http
    .get("https://thevirustracker.com/free-api?global=stats")
    .subscribe(data => {
      this.globalData.push({
        total_active_cases: data["results"][0].total_active_cases,
        total_cases: data["results"][0].total_cases,
        total_deaths: data["results"][0].total_deaths,
      });
    });

    forkJoin(arrayOfHttp).subscribe(results => {
      results.forEach(data => {
        if (data["countrydata"]){
          this.chartData.push({
            code3: map.features.filter(
              x => x.id == data["countrydata"][0].info.code
            )[0].properties["iso-a3"],
            name: data["countrydata"][0].info.title,
            value: data["countrydata"][0].total_cases,
            total_cases: data["countrydata"][0].total_cases,
            total_active_cases: data["countrydata"][0].total_active_cases,
            total_deaths: data["countrydata"][0].total_deaths,
            total_recovered: data["countrydata"][0].total_recovered
          });
        }
      });
      this.preparteChat();
    });
  }

  /* ----------==========     Map Generator    ==========---------- */
  preparteChat(){
    this.mapChart = new MapChart({
      chart: {
        borderWidth: 0,
        map: map,
        backgroundColor: {
          linearGradient: { x1:0, y1:0, x2:0, y2:1},
          stops: [
            [0, "#4a0000"],
            [1, "#000000"]
          ]
        }
      },
  
      title: {
        text: null
      },
      
      legend: {
        enabled: false
      },

      subtitle: {
        text: null
      },
  
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "top",
        }
      },
  
      colorAxis: {
        dataClasses: [
          {
            from: 0,
            to: 0,
            color: "#FBEFEF"
          },{
            from: 1,
            to: 200,
            color: "#FA5858"
          },{
            from: 201,
            to: 1500,
            color: "#500000"
          },{
            from: 1501,
            to: 15000,
            color: "#880000"
          },{
            from: 15001,
            to: 30000,
            color: "#b10000"
          },{
            from: 30001,
            to: 100000,
            color: "#FE2E2E"
          },{
            from: 100001,
            color: "#ff0000"
          }
        ]
      },
  
      series: [
        {
          type: undefined,
          name: "Covid",
          animation: {
            duration: 2000
          },
          borderColor: "FFDF00",
          joinBy: ["iso-a3","code3"],
          data: this.chartData,
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          },
          minSize: 4,
          maxSize: "40%",
          tooltip: {
            headerFormat: "{point.name}",
            pointFormat: '<b>{point.name}</b> <br/><br/> Casos Totales: {point.total_cases}<br/>Casos activos: {point.total_active_cases}<br/>Muertes: {point.total_deaths}<br/>Recuperados: {point.total_recovered}'
          }
        }
      ]

    });
  }
}
