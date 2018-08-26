import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';
import {DashboardService} from '../Services/dashboard.service';
import {RequestService} from '../Services/request.service';
import * as Chartist from 'chartist';
import { IResponse } from '../models/Response';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData: TableData;
  allRequestsCount: number;
  todayRequestsCount: number;
  allContactUsCount: number;
  todayContactUsCount: number;

  constructor(private _dashboardService: DashboardService ) { }
  startAnimationForLineChart(chart: any) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      chart.on('draw', function(data: any) {

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
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
  }
  startAnimationForBarChart(chart: any) {
      let seq2: any, delays2: any, durations2: any;
      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data: any) {
        if (data.type === 'bar') {
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
  }
  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this._dashboardService.getAllAndTodaycontactUsCountReq({LoadFrom: 0, PageSize: 100000}).subscribe(result => {
      this.allContactUsCount = (<IResponse>result[0]).Messages.length;
      this.todayContactUsCount = (<IResponse>result[1]).TodayMessages.length;
      });
      this._dashboardService.getAllAndTodayRequestsCount({LoadFrom: 0, PageSize: 100000}).subscribe(result => {
        this.allRequestsCount = (<IResponse>result[0]).Requests.length;
        this.todayRequestsCount = (<IResponse>result[1]).TodayRequests.length;
        });
   }
   ngAfterViewInit() {
   }
}
