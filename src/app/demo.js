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

angular.module('app', [
    'ngRoute',
    'ui.dashboard',
    'btford.markdown'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/template/view.html',
        controller: 'DemoCtrl',
        title: 'ToBeRemovedLater',
        description: 'Hi My name is dinesh'
      })
      .when('/explicit-saving', {
        templateUrl: 'app/template/view.html',
        controller: 'ExplicitSaveDemoCtrl',
        title: 'Menu 1',
        description: 'This demo showcases an option to only save the dashboard state '+
          'explicitly, e.g. by user input. Notice the "all saved" button in the controls ' +
          'updates as you make saveable changes.'
      })
      .when('/layouts/explicit-saving', {
        templateUrl: 'app/template/layouts.html',
        controller: 'LayoutsDemoExplicitSaveCtrl',
        title: 'Menu 2',
        description: 'This demo showcases dashboard layouts with explicit saving enabled.'
      })
      .when('/dynamic-data', {
        templateUrl: 'app/template/dynamicData.html',
        controller: 'DynamicDataCtrl',
        title: 'Menu 3',
        description: 'This demo showcases loading the widgets and refreshing the contents as the source data is updated.'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('NavBarCtrl', function($scope, $route) {
    $scope.$route = $route;
  })
  .factory('widgetDefinitions', function(RandomDataModel) {
    return [
      {
        name: 'random',
        directive: 'wt-scope-watch',
        attrs: {
          value: 'randomValue'
        }
      },
      {
        name: 'time',
        directive: 'wt-time'
      },
      {
        name: 'datamodel',
        directive: 'wt-scope-watch',
        dataAttrName: 'value',
        dataModelType: RandomDataModel
      },
      {
        name: 'resizable',
        templateUrl: 'app/template/resizable.html',
        attrs: {
          class: 'demo-widget-resizable'
        }
      },
      {
        name: 'fluid',
        directive: 'wt-fluid',
        size: {
          width: '50%',
          height: '250px'
        }
      }
    ];
  })
  .value('defaultWidgets', [
    { name: 'random' },
    { name: 'time' },
    { name: 'datamodel' },
    {
      name: 'random',
      style: {
        width: '50%',
        minWidth: '39%'
      }
    },
    {
      name: 'time',
      style: {
        width: '50%'
      }
    }
  ])
  .controller('DemoCtrl', function ($scope, $interval, $window, widgetDefinitions, defaultWidgets) {

    $scope.dashboardOptions = {
      widgetButtons: true,
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets,
      storage: $window.localStorage,
      storageId: 'demo_simple'
    };
    $scope.randomValue = Math.random();
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);

    $scope.prependWidget = function() {
      $scope.dashboardOptions.prependWidget({ name: 'random', title: 'Prepend Widget'});
    };

  });

