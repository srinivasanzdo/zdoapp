angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

    //$urlRouterProvider.otherwise('/dashboard');
    $urlRouterProvider.otherwise('/login');

    $ocLazyLoadProvider.config({
      // Set to true if you want to see what and when is dynamically loaded
      debug: true
    });

    $breadcrumbProvider.setOptions({
      prefixStateName: 'app.main',
      includeAbstract: true,
      template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'views/common/layouts/full.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Root',
          skip: true
        },
        resolve: {
          loadCSS: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load CSS files
            return $ocLazyLoad.load([{
              serie: true,
              name: 'Font Awesome',
              files: ['css/font-awesome.min.css']
            }, {
              serie: true,
              name: 'Simple Line Icons',
              files: ['css/simple-line-icons.css']
            }]);
          }],
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              serie: true,
              name: 'chart.js',
              files: [
                'bower_components/chart.js/dist/Chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.min.js'
              ]
            }]);
          }],
        }
      })
      .state('app.main', {
        url: '/dashboard',
        templateUrl: 'views/main.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Home',
        },
        //page subtitle goes here
        params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([
              {
                serie: true,
                name: 'chart.js',
                files: [
                  'bower_components/chart.js/dist/Chart.min.js',
                  'bower_components/angular-chart.js/dist/angular-chart.min.js'
                ]
              },
            ]);
          }],
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/main.js']
            });
          }]
        }
      })
      .state('appSimple', {
        abstract: true,
        templateUrl: 'views/common/layouts/simple.html',
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
              serie: true,
              name: 'Font Awesome',
              files: ['css/font-awesome.min.css']
            }, {
              serie: true,
              name: 'Simple Line Icons',
              files: ['css/simple-line-icons.css']
            }]);
          }],
        }
      })

      // Additional Pages
      .state('appSimple.login', {
        url: '/login',
        templateUrl: 'views/pages/login.html',
        controller: 'loginCtrl'
        // resolve: {
        //   loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        //     return $ocLazyLoad.load({
        //       files: ['js/controllers.js']
        //     });
        //   }]
        // }
      })
      .state('appSimple.register', {
        url: '/register',
        templateUrl: 'views/pages/register.html'
      })
      .state('appSimple.404', {
        url: '/404',
        templateUrl: 'views/pages/404.html'
      })
      .state('appSimple.500', {
        url: '/500',
        templateUrl: 'views/pages/500.html'
      })
      .state('app.customer', {
        url: '/customer',
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Customer'
        }
      })
      .state('app.customer.addcustomer', {
        url: '/addcustomer',
        templateUrl: 'views/addcustomer.html',
        ncyBreadcrumb: {
          label: 'Add Customer'
        }
      })
      .state('app.customer.editcustomer', {
        url: '/editcustomer',
        templateUrl: 'views/editcustomer.html',
        ncyBreadcrumb: {
          label: 'Edit Customer'
        }
      })
      .state('app.customer.viewcustomer', {
        url: '/viewcustomer',
        templateUrl: 'views/viewcustomer.html',
        ncyBreadcrumb: {
          label: 'View Customer'
        }
      })

      .state('app.physiocenter', {
        url: '/physiocenter',
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Physio Center'
        }
      })
      .state('app.physiocenter.addphysiocenter', {
        url: '/addphysiocenter',
        templateUrl: 'views/addphysiocenter.html',
        ncyBreadcrumb: {
          label: 'Add Physiocenter'
        }
      })
      .state('app.physiocenter.editphysiocenter', {
        url: '/editphysiocenter',
        templateUrl: 'views/editphysiocenter.html',
        ncyBreadcrumb: {
          label: 'Edit Physiocenter'
        }
      })
      .state('app.physiocenter.viewphysiocenter', {
        url: '/viewphysiocenter',
        templateUrl: 'views/viewphysiocenter.html',
        ncyBreadcrumb: {
          label: 'View Physiocenter'
        }
      })
       .state('app.physioassign', {
        url: '/physioassign',
        templateUrl: 'views/physioassign.html',
        ncyBreadcrumb: {
          label: 'Physio Assign'
        }
      })
  }]);
