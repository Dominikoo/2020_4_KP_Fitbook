import { Component, OnInit, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-progress-line-chart',
  templateUrl: './progress-line-chart.component.html',
  styleUrls: ['./progress-line-chart.component.scss']
})
export class ProgressLineChartComponent implements OnInit {

  @Input("userProgressSummary") userProgressSummary: any[];
  single : any[];
  visible: boolean = true;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Dzień';
  showYAxisLabel = true;
  yAxisLabel = 'Wykonane ćwiczenia';

  colorScheme = {
    domain: ['orange']
  };

  constructor() {
    
  }
  ngOnInit(): void {
    
  }

  onSelect(event) {

  }

  onClose(){
    this.visible = false;
  }
}