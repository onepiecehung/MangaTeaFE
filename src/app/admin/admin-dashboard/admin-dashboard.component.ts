import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  dashboardInfo: any;
  isLoading = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  public pieChartOptionsSex: ChartOptions = {
    responsive: true,
  };
  public pieChartLabelsSex: Label[] = ['Male', 'Female'];
  public pieChartDataSex: SingleDataSet = [];
  public pieChartTypeSex: ChartType = 'pie';
  public pieChartLegendSex = true;
  public pieChartPluginsSex = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  constructor(
    private adminService: AdminService,
  ) { }



  ngOnInit(): void {
    let param = "total=1";
    this.adminService.getAdminDashboard(param).then(data => {
      this.dashboardInfo = data;
    });

    param = 'mostViewGenre=1';
    this.adminService.getAdminDashboard(param).then(data => {
      Object.keys(data.genres).forEach(label => {
        this.pieChartLabels.push(label);
        this.pieChartData.push(Math.round(data['genres'][label] / data['total'] * 100));
      });
    });

    param = "percentMaleAndFemale=1";
    this.adminService.getAdminDashboard(param).then(data => {
      console.log("AdminDashboardComponent -> ngOnInit -> data", data)
      this.pieChartDataSex.push((data['male'] / data['total']) * 100);
      this.pieChartDataSex.push((data['female'] / data['total']) * 100);
    });

    param = "gender=MALE";
    this.adminService.getAdminDashboard(param).then(data => {
      let genreForMale = [];
      Object.keys(data.genres).forEach(label => {
        this.barChartLabels.push(label);
        genreForMale.push(data['genres'][label]);
      });
      this.barChartData.push({ data: genreForMale, label: 'Male' })
    });

    param = "gender=FEMALE";
    this.adminService.getAdminDashboard(param).then(data => {
      let genreForFemale = [];
      Object.keys(data.genres).forEach(label => {
        this.barChartLabels.push(label);
        genreForFemale.push(data['genres'][label]);
      });
      this.barChartData.push({ data: genreForFemale, label: 'Female' })
      this.isLoading = false;
    });

  }


}
