import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  countries:Array<any> = [
    {name:'EE.UU',cases:'2,055,497',deaths:'114,637'},
    {name:'Brasil',cases:'747,561',deaths:'38,701'},
    {name:'Rusia',cases:'493,657',deaths:'6,358'},
    {name:'Reino Unido',cases:'290,143',deaths:'41,128'},
    {name:'España',cases:'289,360',deaths:'27,136'},
    {name:'India',cases:'286,833',deaths:'8,106'},
    {name:'Italia',cases:'235,763',deaths:'34,114'},
    {name:'Perú',cases:'203,736',deaths:'5,738'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
