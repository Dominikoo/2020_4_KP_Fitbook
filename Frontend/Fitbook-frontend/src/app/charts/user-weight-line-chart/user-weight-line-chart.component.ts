import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-weight-line-chart',
  templateUrl: './user-weight-line-chart.component.html',
  styleUrls: ['./user-weight-line-chart.component.scss']
})
export class UserWeightLineChartComponent implements OnInit {

  @Input("userWeightHistory") userWeightHistory: any[];
  @Input("yScaleMax") yScaleMax: Number;
  @Input("yScaleMin") yScaleMin: Number;

    // options
  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dzień';
  yAxisLabel: string = 'Waga [Kg]';
  timeline: boolean = false;

    colorScheme = {
      domain: ['orange']
    };

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(data): void {
   
  }

  onActivate(data): void {

  }

  onDeactivate(data): void {

  }
  
}
