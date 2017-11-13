/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('app')
  .directive('wtTime', function ($interval) {
    return {
      restrict: 'A',
      scope: true,
      replace: true,
      template: '<div>Time<div class="alert alert-success">{{time}}</div></div>',
      link: function (scope) {
        function update() {
          scope.time = new Date().toLocaleTimeString();
        }

        update();

        var promise = $interval(update, 500);

        scope.$on('$destroy', function () {
          $interval.cancel(promise);
        });
      }
    };
  })
  .directive('wtScopeWatch', function () {
    return {
      restrict: 'A',
      replace: true,
      template: '<div>Value<div class="alert alert-info">{{value}}</div></div>',
      scope: {
        value: '=value'
      }
    };
  })
  .directive('wtFluid', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/template/fluid.html',
      scope: true,
      controller: function ($scope) {
        $scope.$on('widgetResized', function (event, size) {
          $scope.width = size.width || $scope.width;
          $scope.height = size.height || $scope.height;
        });
      }
    };
  })
  .directive('wtBlotter', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/template/fluid.html',
      scope: true,
      controller: function ($scope) {
        $scope.$on('widgetResized', function (event, size) {
          $scope.width = size.width || $scope.width;
          $scope.height = size.height || $scope.height;
        });
      }
    };
  })
  .directive('wtChart', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/template/CandleStickChart.html',
      scope: true,
      controller: function ($scope) {

        var dataSource = [{
          date: new Date(1994, 2, 1),
          l: 24.00,
          h: 25.00,
          o: 25.00,
          c: 24.875
        }, {
          date: new Date(1994, 2, 2),
          l: 23.625,
          h: 25.125,
          o: 24.00,
          c: 24.875
        }, {
          date: new Date(1994, 2, 3),
          l: 26.25,
          h: 28.25,
          o: 26.75,
          c: 27.00
        }, {
          date: new Date(1994, 2, 4),
          l: 26.50,
          h: 27.875,
          o: 26.875,
          c: 27.25
        }, {
          date: new Date(1994, 2, 7),
          l: 26.375,
          h: 27.50,
          o: 27.375,
          c: 26.75
        }, {
          date: new Date(1994, 2, 8),
          l: 25.75,
          h: 26.875,
          o: 26.75,
          c: 26.00
        }, {
          date: new Date(1994, 2, 9),
          l: 25.75,
          h: 26.75,
          o: 26.125,
          c: 26.25
        }, {
          date: new Date(1994, 2, 10),
          l: 25.75,
          h: 26.375,
          o: 26.375,
          c: 25.875
        }, {
          date: new Date(1994, 2, 11),
          l: 24.875,
          h: 26.125,
          o: 26.00,
          c: 25.375
        }, {
          date: new Date(1994, 2, 14),
          l: 25.125,
          h: 26.00,
          o: 25.625,
          c: 25.75
        }, {
          date: new Date(1994, 2, 15),
          l: 25.875,
          h: 26.625,
          o: 26.125,
          c: 26.375
        }, {
          date: new Date(1994, 2, 16),
          l: 26.25,
          h: 27.375,
          o: 26.25,
          c: 27.25
        }, {
          date: new Date(1994, 2, 17),
          l: 26.875,
          h: 27.25,
          o: 27.125,
          c: 26.875
        }, {
          date: new Date(1994, 2, 18),
          l: 26.375,
          h: 27.125,
          o: 27.00,
          c: 27.125
        }, {
          date: new Date(1994, 2, 21),
          l: 26.75,
          h: 27.875,
          o: 26.875,
          c: 27.75
        }, {
          date: new Date(1994, 2, 22),
          l: 26.75,
          h: 28.375,
          o: 27.50,
          c: 27.00
        }, {
          date: new Date(1994, 2, 23),
          l: 26.875,
          h: 28.125,
          o: 27.00,
          c: 28.00
        }, {
          date: new Date(1994, 2, 24),
          l: 26.25,
          h: 27.875,
          o: 27.75,
          c: 27.625
        }, {
          date: new Date(1994, 2, 25),
          l: 27.50,
          h: 28.75,
          o: 27.75,
          c: 28.00
        }, {
          date: new Date(1994, 2, 28),
          l: 25.75,
          h: 28.25,
          o: 28.00,
          c: 27.25
        }, {
          date: new Date(1994, 2, 29),
          l: 26.375,
          h: 27.50,
          o: 27.50,
          c: 26.875
        }, {
          date: new Date(1994, 2, 30),
          l: 25.75,
          h: 27.50,
          o: 26.375,
          c: 26.25
        }, {
          date: new Date(1994, 2, 31),
          l: 24.75,
          h: 27.00,
          o: 26.50,
          c: 25.25
        }];


        $scope.chartOptions = {
          title: "Stock Price",
          dataSource: dataSource,
          commonSeriesSettings: {
            argumentField: "date",
            type: "candlestick"
          },
          legend: {
            itemTextPosition: 'left'
          },
          series: [
            {
              name: "DELL",
              openValueField: "o",
              highValueField: "h",
              lowValueField: "l",
              closeValueField: "c",
              reduction: {
                color: "red"
              }
            }
          ],
          valueAxis: {
            tickInterval: 1,
            title: {
              text: "US dollars"
            },
            label: {
              format: {
                type: "currency",
                precision: 0
              }
            }
          },
          argumentAxis: {
            label: {
              format: "shortDate"
            }
          },
          "export": {
            enabled: true
          },
          tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
              return {
                text: "Open: $" + arg.openValue + "<br/>" +
                "Close: $" + arg.closeValue + "<br/>" +
                "High: $" + arg.highValue + "<br/>" +
                "Low: $" + arg.lowValue + "<br/>"
              };
            }
          }
        };
      }
    };
  })
  .directive('wtEditablegrid', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/template/EditableDataGrid.html',
      scope: true,
      controller: function ($scope) {

        var employees = [{
          "ID": 1,
          "FirstName": "John",
          "LastName": "Heart",
          "Prefix": "Mr.",
          "Position": "CEO",
          "BirthDate": "1964/03/16",
          "HireDate": "1995/01/15",
          "Notes": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
          "Address": "351 S Hill St.",
          "StateID": 5
        }, {
          "ID": 2,
          "FirstName": "Olivia",
          "LastName": "Peyton",
          "Prefix": "Mrs.",
          "Position": "Sales Assistant",
          "BirthDate": "1981/06/03",
          "HireDate": "2012/05/14",
          "Notes": "Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
          "Address": "807 W Paseo Del Mar",
          "StateID": 5
        }, {
          "ID": 3,
          "FirstName": "Robert",
          "LastName": "Reagan",
          "Prefix": "Mr.",
          "Position": "CMO",
          "BirthDate": "1974/09/07",
          "HireDate": "2002/11/08",
          "Notes": "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
          "Address": "4 Westmoreland Pl.",
          "StateID": 4
        }, {
          "ID": 4,
          "FirstName": "Greta",
          "LastName": "Sims",
          "Prefix": "Ms.",
          "Position": "HR Manager",
          "BirthDate": "1977/11/22",
          "HireDate": "1998/04/23",
          "Notes": "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
          "Address": "1700 S Grandview Dr.",
          "StateID": 11
        }, {
          "ID": 5,
          "FirstName": "Brett",
          "LastName": "Wade",
          "Prefix": "Mr.",
          "Position": "IT Manager",
          "BirthDate": "1968/12/01",
          "HireDate": "2009/03/06",
          "Notes": "Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).",
          "Address": "1120 Old Mill Rd.",
          "StateID": 13
        }, {
          "ID": 6,
          "FirstName": "Sandra",
          "LastName": "Johnson",
          "Prefix": "Mrs.",
          "Position": "Controller",
          "BirthDate": "1974/11/15",
          "HireDate": "2005/05/11",
          "Notes": "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
          "Address": "4600 N Virginia Rd.",
          "StateID": 44
        }, {
          "ID": 7,
          "FirstName": "Kevin",
          "LastName": "Carter",
          "Prefix": "Mr.",
          "Position": "Shipping Manager",
          "BirthDate": "1978/01/09",
          "HireDate": "2009/08/11",
          "Notes": "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.",
          "Address": "424 N Main St.",
          "StateID": 5
        }, {
          "ID": 8,
          "FirstName": "Cynthia",
          "LastName": "Stanwick",
          "Prefix": "Ms.",
          "Position": "HR Assistant",
          "BirthDate": "1985/06/05",
          "HireDate": "2008/03/24",
          "Notes": "Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!",
          "Address": "2211 Bonita Dr.",
          "StateID": 4
        }, {
          "ID": 9,
          "FirstName": "Kent",
          "LastName": "Samuelson",
          "Prefix": "Dr.",
          "Position": "Ombudsman",
          "BirthDate": "1972/09/11",
          "HireDate": "2009/04/22",
          "Notes": "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.",
          "Address": "12100 Mora Dr",
          "StateID": 26
        }, {
          "ID": 10,
          "FirstName": "Taylor",
          "LastName": "Riley",
          "Prefix": "Mr.",
          "Position": "Network Admin",
          "BirthDate": "1982/08/14",
          "HireDate": "2012/04/14",
          "Notes": "If you are like the rest of us at DevAV, then you've probably reached out for help from Taylor. He does a great job as a member of our IT department.",
          "Address": "7776 Torreyson Dr",
          "StateID": 5
        }, {
          "ID": 11,
          "FirstName": "Sam",
          "LastName": "Hill",
          "Prefix": "Mr.",
          "Position": "Sales Assistant",
          "BirthDate": "1984/02/17",
          "HireDate": "2012/02/01",
          "Notes": "Sammy is proud to be a member of the DevAV team. He joined the team in 2012 and has been in the sales department from the beginning.\r\n\r\nHe has just picked up golf so you can find him on the links every weekend.",
          "Address": "645 Prospect Crescent",
          "StateID": 11
        }, {
          "ID": 12,
          "FirstName": "Kelly",
          "LastName": "Rodriguez",
          "Prefix": "Ms.",
          "Position": "Support Assistant",
          "BirthDate": "1988/05/11",
          "HireDate": "2012/10/13",
          "Notes": "Kelly loves people and that's why she joined DevAV's support department. One of the funniest people in the company, she does stand-up on the weekends at the Laugh Factory.",
          "Address": "1601 W Mountain St.",
          "StateID": 5
        }, {
          "ID": 13,
          "FirstName": "Natalie",
          "LastName": "Maguirre",
          "Prefix": "Mrs.",
          "Position": "Trainer",
          "BirthDate": "1977/10/07",
          "HireDate": "2008/06/19",
          "Notes": "Natalie travels the US and teaches our partners how to explain the benefits of our products to customers.\r\n\r\nShe is a proud wife and mom and volunteers her time at the elementary school.",
          "Address": "6400 E Bixby Hill Rd",
          "StateID": 29
        }, {
          "ID": 14,
          "FirstName": "Walter",
          "LastName": "Hobbs",
          "Prefix": "Mr.",
          "Position": "Programmer",
          "BirthDate": "1984/12/24",
          "HireDate": "2011/02/17",
          "Notes": "Walter has been developing apps and websites for DevAV since 2011. His passion is software and if you ever walk by his desk, you'll know why.\r\n\r\nWally once worked 72 hours straight - writing code and fixing bugs.",
          "Address": "10385 Shadow Oak Dr",
          "StateID": 13
        }];

        var states = [{
          "ID": 1,
          "Name": "Alabama"
        }, {
          "ID": 2,
          "Name": "Alaska"
        }, {
          "ID": 3,
          "Name": "Arizona"
        }, {
          "ID": 4,
          "Name": "Arkansas"
        }, {
          "ID": 5,
          "Name": "California"
        }, {
          "ID": 6,
          "Name": "Colorado"
        }, {
          "ID": 7,
          "Name": "Connecticut"
        }, {
          "ID": 8,
          "Name": "Delaware"
        }, {
          "ID": 9,
          "Name": "District of Columbia"
        }, {
          "ID": 10,
          "Name": "Florida"
        }, {
          "ID": 11,
          "Name": "Georgia"
        }, {
          "ID": 12,
          "Name": "Hawaii"
        }, {
          "ID": 13,
          "Name": "Idaho"
        }, {
          "ID": 14,
          "Name": "Illinois"
        }, {
          "ID": 15,
          "Name": "Indiana"
        }, {
          "ID": 16,
          "Name": "Iowa"
        }, {
          "ID": 17,
          "Name": "Kansas"
        }, {
          "ID": 18,
          "Name": "Kentucky"
        }, {
          "ID": 19,
          "Name": "Louisiana"
        }, {
          "ID": 20,
          "Name": "Maine"
        }, {
          "ID": 21,
          "Name": "Maryland"
        }, {
          "ID": 22,
          "Name": "Massachusetts"
        }, {
          "ID": 23,
          "Name": "Michigan"
        }, {
          "ID": 24,
          "Name": "Minnesota"
        }, {
          "ID": 25,
          "Name": "Mississippi"
        }, {
          "ID": 26,
          "Name": "Missouri"
        }, {
          "ID": 27,
          "Name": "Montana"
        }, {
          "ID": 28,
          "Name": "Nebraska"
        }, {
          "ID": 29,
          "Name": "Nevada"
        }, {
          "ID": 30,
          "Name": "New Hampshire"
        }, {
          "ID": 31,
          "Name": "New Jersey"
        }, {
          "ID": 32,
          "Name": "New Mexico"
        }, {
          "ID": 33,
          "Name": "New York"
        }, {
          "ID": 34,
          "Name": "North Carolina"
        }, {
          "ID": 35,
          "Name": "Ohio"
        }, {
          "ID": 36,
          "Name": "Oklahoma"
        }, {
          "ID": 37,
          "Name": "Oregon"
        }, {
          "ID": 38,
          "Name": "Pennsylvania"
        }, {
          "ID": 39,
          "Name": "Rhode Island"
        }, {
          "ID": 40,
          "Name": "South Carolina"
        }, {
          "ID": 41,
          "Name": "South Dakota"
        }, {
          "ID": 42,
          "Name": "Tennessee"
        }, {
          "ID": 43,
          "Name": "Texas"
        }, {
          "ID": 44,
          "Name": "Utah"
        }, {
          "ID": 45,
          "Name": "Vermont"
        }, {
          "ID": 46,
          "Name": "Virginia"
        }, {
          "ID": 47,
          "Name": "Washington"
        }, {
          "ID": 48,
          "Name": "West Virginia"
        }, {
          "ID": 49,
          "Name": "Wisconsin"
        }, {
          "ID": 50,
          "Name": "Wyoming"
        }, {
          "ID": 51,
          "Name": "North Dakota"
        }];

        function clearEvents() {
          $scope.events = [];
        }

        function logEvent(eventName) {
          $scope.events.unshift(eventName);
        }

        $scope.events = [];

        $scope.dataGridOptions = {
          dataSource: employees,
          paging: {
            enabled: true,
            pageSize: 5
          },
          searchPanel: {
            visible: true
          },
          editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
          },
          columns: [
            {
              dataField: "Prefix",
              caption: "Title"
            },
            "FirstName",
            "LastName",
            {
              dataField: "Position",
              width: 130
            }, {
              dataField: "StateID",
              caption: "State",
              width: 125,
              lookup: {
                dataSource: states,
                displayExpr: "Name",
                valueExpr: "ID"
              }
            }, {
              dataField: "BirthDate",
              dataType: "date",
              width: 125
            },
          ],
          onEditingStart: function(e) {
            logEvent("EditingStart");
          },
          onInitNewRow: function(e) {
            logEvent("InitNewRow");
          },
          onRowInserting: function(e) {
            logEvent("RowInserting");
          },
          onRowInserted: function(e) {
            logEvent("RowInserted");
          },
          onRowUpdating: function(e) {
            logEvent("RowUpdating");
          },
          onRowUpdated: function(e) {
            logEvent("RowUpdated");
          },
          onRowRemoving: function(e) {
            logEvent("RowRemoving");
          },
          onRowRemoved: function(e) {
            logEvent("RowRemoved");
          }
        };
        $scope.buttonOptions = {
          text: "Clear",
          onClick: function() {
            clearEvents();
          }
        };

      }
    };
  })
  .directive('wtForm',function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/template/form.html',
      scope: true,
      controller: function ($scope) {
        // we would get this from the api
        $scope.entity = {
          name: "Course",
          fields: [{
            "type": "select",
            "name": "instrument",
            "label": "Instrument",
            "options": [{
              "name": "ESP"
            }, {
              "name": "RFQ"
            }, {
              "name": "Order"
            }],
            "required": true,
            "data": ""
          }, {
            "type": "select",
            "name": "settlementdate",
            "label": "Settlement Date",
            "options": [{
              "name": "D+2"
            }, {
              "name": "D+1"
            }, {
              "name": "D+0"
            }],
            "required": true,
            "data": ""
          }, {
            "type": "select",
            "name": "currenypair",
            "label": "",
            "options": [{
              "name": "EUR/USD"
            }, {
              "name": "AUD/USD"
            }, {
              "name": "CAD/USD"
            }],
            "required": true,
            "data": ""
          }, {
            "type": "radio",
            "name": "color_id",
            "label": "Colors",
            "options": [{
              "id": 1,
              "name": "orange"
            }, {
              "id": 2,
              "name": "pink"
            }, {
              "id": 3,
              "name": "gray"
            }, {
              "id": 4,
              "name": "cyan"
            }],
            "required": true,
            "data": "dinesh hakande"
          }, {
            "type": "email",
            "name": "emailUser",
            "label": "Email",
            "required": true,
            "data": ""
          }, {
            "type": "text",
            "name": "city",
            "label": "City",
            "required": true,
            "data": ""
          }, {
            "type": "password",
            "name": "pass",
            "label": "Password",
            "min": 6,
            "max": 20,
            "required": true,
            "data": ""
          }, {
            "type": "select",
            "name": "teacher_id",
            "label": "Teacher",
            "options": [{
              "name": "Mark"
            }, {
              "name": "Claire"
            }, {
              "name": "Daniel"
            }, {
              "name": "Gary"
            }],
            "required": true,
            "data": ""
          }, {
            "type": "checkbox",
            "name": "car_id",
            "label": "Cars",
            "options": [{
              "id": 1,
              "name": "bmw"
            }, {
              "id": 2,
              "name": "audi"
            }, {
              "id": 3,
              "name": "porche"
            }, {
              "id": 4,
              "name": "jaguar"
            }],
            "required": true,
            "data": ""
          }]
        };

        $scope.submitForm = function() {

        };
      }
    };
  })
  .directive('wtCard',function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/template/card.html',
      scope: true,
      controller: function ($scope) {
        // we would get this from the api

        $scope.cardContents = [{
          sellVal1 : "1.12758",
          sellVal2 : "75",
          sellVal3 : "8",
          buyVal1 : "1.12762",
          buyVal2 : "76",
          buyVal3 : "2",
          staticField : "10.24",
          currencyId :"1",
          currency : [{
            id: "1",
            name: "EURO/USD"
          }, {
            id: "2",
            name: "CAD"
          }, {
            id: "3",
            name: "INR"
          }, {
            id: "4",
            name: "JPY"
          }]
        },
          {
            sellVal1 : "2.144758",
            sellVal2 : "34",
            sellVal3 : "10",
            buyVal1 : "2.345",
            buyVal2 : "36",
            buyVal3 : "2",
            staticField : "234.23",
            currencyId :"1",
            currency : [{
              id: "1",
              name: "AUD/USD"
            }, {
              id: "2",
              name: "DAC"
            }, {
              id: "3",
              name: "PAK"
            }, {
              id: "4",
              name: "RMB"
            }]
          } ];

        $scope.showBuy = function() {
        };

        $scope.showSell = function() {
        };


        $scope.greenClick = function() {
        };


      }
    };
  })
;
