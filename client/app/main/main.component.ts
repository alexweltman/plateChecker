const angular = require('angular');
const uiRouter = require('angular-ui-router');
const moment = require('moment');
const DEFAULT_STATE: string = "Colorado";
const PLATE_API_URI: string = "/api/plates";
import routing from './main.routes';

export interface LicensePLate {
  number: string,
  state: string,
  addedBy: string,
  createdAt: number
};

export class MainController {
  private $http;
  private $scope;
  private plateToCheck: LicensePlate;
  private bannerClass: string;
  private header: string;
  private subtitle: string;
  private iconClass: string;
  private dontAddPlateToDB: boolean;

  private states: string[] = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio','Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  /*@ngInject*/
  public constructor($http) {
    this.$http = $http;
    this.resetVals();
  }

  private resetVals(): void {
    this.header = "The Dent Man";
    this.subtitle = "License Plate Registry";
    this.dontAddPlateToDB = false;
    this.bannerClass = "hero-unit-neutral";
    this.iconClass = "";
    this.plateToCheck = {
      number: "",
      state: DEFAULT_STATE,
      addedBy: "",
      createdAt: 0
    };
  }

  private checkPlate(): void {
    if (this.dontAddPlateToDB) {
      this.checkPlateStatusDontRegister();
    } else {
      this.registerPlate();
    }
  }

  private checkPlateStatusDontRegister(): void {
    this.$http.get(`${PLATE_API_URI}/${this.plateToCheck.state}/${this.plateToCheck.number}`)
    .then(response => {
      this.updateViewError(response);
    },response => {
      if (response.status === 404) {
        this.updateViewSuccess();
      } else {
        this.updateViewError(response);
      }
    });
  }

  private registerPlate(): void {
    this.$http.post(PLATE_API_URI, this.plateToCheck)
    .then(response => {
      this.updateViewSuccess();
    },response => {
      this.updateViewError(response);
    });
  }

  private updateViewSuccess(): void {
    this.bannerClass = "hero-unit-success";
    this.iconClass = "glyphicon glyphicon-ok-circle";
    this.header = "Good to Go!";
    this.subtitle = "You are the first person to check this plate.";
    if (this.dontAddPlateToDB) {
      this.subtitle += " This plate will remain un-checked, per your request."
    } else {
      this.subtitle += " This plate has been registered as checked."
    }
  }

  private updateViewError(response: any): void {
    let statusCode: number = response.status;
    this.iconClass = "glyphicon glyphicon-ban-circle";
    if (statusCode === 409 || statusCode === 200) {
      this.setPlateAlreadyChecked(response);
    } else {
      this.setError();
    }
  }

  private setPlateAlreadyChecked(response: any): void {
    let timeString = moment(response.data.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    this.bannerClass = "hero-unit-failure";
    this.header = "Already Checked"
    this.subtitle = `This plate was first checked on ${timeString}.`;
  }

  private setError(): void {
    this.header = "Error";
    this.bannerClass = "hero-unit-failure";
    this.subtitle = "Unable to check license plate. Please try again."
  }
}

export default angular.module('plateCheckerApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
