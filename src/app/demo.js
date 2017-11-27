
'use strict';

angular.module('app', [
    'ngRoute',
    'ui.dashboard',
    'btford.markdown',
    'dx',
    'ngMaterial'
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
        description: 'Menu 1.'
      })
      .when('/layouts/explicit-saving', {
        templateUrl: 'app/template/layouts.html',
        controller: 'LayoutsDemoExplicitSaveCtrl',
        title: 'Menu 2',
        description: 'Menu 2.'
      })
      .when('/dynamic-data', {
        templateUrl: 'app/template/dynamicData.html',
        controller: 'DynamicDataCtrl',
        title: 'Menu 3',
        description: 'Menu 3.'
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
        name: 'Candle Stick Chart',
        directive: 'wt-chart',
        size: {
          width: '70%',
          height: '450px'
        }
      },
      {
        name: 'Blotter',
        directive: 'wt-editablegrid',
        size: {
          width: '75%',
          height: '350px'
        }
      },
      {
        name :'Form',
        directive: 'wt-form',
        size: {
          width: '25%',
          height: '350px'
        }
      },
      {
        name :'Card',
        directive: 'wt-card',
        size: {
          width: '25%',
          height: '350px'
        }
      }
      // {
      //   name: 'datamodel',
      //   directive: 'wt-scope-watch',
      //   dataAttrName: 'value',
      //   dataModelType: RandomDataModel
      // },
      // {
      //   name: 'resizable',
      //   templateUrl: 'app/template/resizable.html',
      //   attrs: {
      //     class: 'demo-widget-resizable'
      //   }
      // },
      // {
      //   name: 'fluid',
      //   directive: 'wt-fluid',
      //   size: {
      //     width: '50%',
      //     height: '250px'
      //   }
      // }
    ];
  })
  .value('defaultWidgets', [
    {
      name: 'Card',
      size: {
        width: '25%',
        height: '350px'
      }
    },
    {
      name: 'Candle Stick Chart',
      style: {
        width: '60%',
        height :'500px'
      },
      isWidgetVisible : true
    },
    {
      name: 'Blotter',
      size: {
        width: '75%',
        height: '350px'
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

