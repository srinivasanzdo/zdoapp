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
      prefixStateName: 'app',
      includeAbstract: true,
      template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });

    $stateProvider

      .state('appSimple', {
        abstract: true,
        templateUrl: 'views/common/layouts/simple.html',
        resolve: {
          loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load([{
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
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/loginController.js']
            });
          }]
        }
      })

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
          // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
          //   // you can lazy load files for an existing module
          //   return $ocLazyLoad.load([{
          //     serie: true,
          //     name: 'chart.js',
          //     files: [
          //       'bower_components/chart.js/dist/Chart.min.js',
          //       'bower_components/angular-chart.js/dist/angular-chart.min.js'
          //     ]
          //   }]);
          // }],
        }
      })

      .state('app.admindashboard', {
        url: '/admin-dashboard',
        templateUrl: 'views/pages/admin/admindashboard.html',
        ncyBreadcrumb: {
          label: 'Admin Dashboard',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/admindashboardController.js']
            });
          }]
        }
      })

      .state('app.agentdashboard', {
        url: '/agent-dashboard',
        templateUrl: 'views/pages/agent/agentdashboard.html',
        ncyBreadcrumb: {
          label: 'Agent Dashboard',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentdashboardController.js']
            });
          }]
        }
      })

      .state('app.adminapplication', {
        url: "/components",
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Application'
        }
      })

      .state('app.adminapplication.allapp', {
        url: '/allapplication',
        templateUrl: 'views/pages/admin/adminallapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'All Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminallappController.js']
            });
          }]
        }
      })
      .state('app.adminapplication.amendapp', {
        url: '/amendapplication',
        templateUrl: 'views/pages/admin/adminamendapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Amend Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminamendappController.js']
            });
          }]
        }
      })
      .state('app.adminapplication.approveapp', {
        url: '/approveapplication',
        templateUrl: 'views/pages/admin/adminapproveapp.html',
        ncyBreadcrumb: {
          label: 'Approved Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminapproveappController.js']
            });
          }]
        }
      })
      .state('app.adminapplication.newapp', {
        url: '/newapplication',
        templateUrl: 'views/pages/admin/adminnewapp.html',
        ncyBreadcrumb: {
          label: 'New Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminnewappController.js']
            });
          }]
        }
      })
      .state('app.adminapplication.rejectapp', {
        url: '/rejectapplication',
        templateUrl: 'views/pages/admin/adminrejectapp.html',
        ncyBreadcrumb: {
          label: 'Rejected Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminrejectappController.js']
            });
          }]
        }
      })
      .state('app.adminapplication.resubmissionapp', {
        url: '/resubmissionapplication',
        templateUrl: 'views/pages/admin/adminresubmissionapp.html',
        ncyBreadcrumb: {
          label: 'Resubmission Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminresubmissionappController.js']
            });
          }]
        }
      })

  }]);
