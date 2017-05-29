angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

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
        controller: 'loginCtrl',
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
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
      .state('app.admin', {
        url: '/admin',
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Admin'
        }
      })
      .state('app.admin.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/admindashboard.html',
        controller:'adminDashboardCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.addagent', {
        url: '/addagent',
        templateUrl: 'views/addagent.html',
        controller:'addAgentCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Add Agent',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.editagent', {
        url: '/editagent',
        templateUrl: 'views/editagent.html',
        controller:'editAgentCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Edit Agent',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.viewagent', {
        url: '/viewagent',
        templateUrl: 'views/viewagent.html',
        controller:'viewAgentCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'View Agent',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.singleagent', {
        url: '/singleagent',
        templateUrl: 'views/singleagent.html',
        controller:'singleAgentCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Single Agent',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.allapp', {
        url: '/allapplication',
        templateUrl: 'views/adminallapp.html',
        controller:'adminAllAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'All Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.amendapp', {
        url: '/amendapplication',
        templateUrl: 'views/adminamendapp.html',
        controller:'adminAmendAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Amend Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.approveapp', {
        url: '/approveapplication',
        templateUrl: 'views/adminapproveapp.html',
        controller:'adminApproveAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Approved Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.newapp', {
        url: '/newapplication',
        templateUrl: 'views/adminnewapp.html',
        controller:'adminNewAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'New Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.rejectapp', {
        url: '/rejectapplication',
        templateUrl: 'views/adminrejectapp.html',
        controller:'adminRejectAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Rejected Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.resubmissionapp', {
        url: '/resubmissionapplication',
        templateUrl: 'views/adminresubmissionapp.html',
        controller:'adminResubmissionAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Resubmission Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })

      .state('app.agent', {
        url: '/agent',
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Agent'
        }
      })
      .state('app.agent.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/agentdashboard.html',
        controller:'agentDashboardCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Dashboard',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.newapp', {
        url: '/newapplication',
        templateUrl: 'views/agentnewapp.html',
        controller:'agentNewAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'New Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.allapp', {
        url: '/allapplication',
        templateUrl: 'views/agentallapp.html',
        controller:'agentAllAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'All Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.pendingapp', {
        url: '/pendingapplication',
        templateUrl: 'views/agentpendingapp.html',
        controller:'agentPendingAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Pending Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.receiveapp', {
        url: '/receiveapplication',
        templateUrl: 'views/agentreceiveapp.html',
        controller:'agentReceiveAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Receive Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.amendapp', {
        url: '/amendapplication',
        templateUrl: 'views/agentamendapp.html',
        controller:'agentAmendAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Amend Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.approveapp', {
        url: '/approveapplication',
        templateUrl: 'views/agentapproveapp.html',
        controller:'agentApproveAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Approved Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      
      .state('app.agent.rejectapp', {
        url: '/rejectapplication',
        templateUrl: 'views/agentrejectapp.html',
        controller:'agentRejectAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Rejected Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.agent.draftapp', {
        url: '/draftapplication',
        templateUrl: 'views/agentdraftapp.html',
        controller:'agentDraftAppCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Draft Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })

      .state('app.admin.appbased', {
        url: '/applicationbasedreport',
        templateUrl: 'views/adminappbasereport.html',
        controller:'adminAppBaseReportCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Application Based Report',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })
      .state('app.admin.agentbased', {
        url: '/agentbasedreport',
        templateUrl: 'views/adminagentbasereport.html',
        controller:'adminAgentBaseReportCtrl',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Agent Based Report',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/adminDashboardController.js']
            });
          }]
        }
      })

      
  }]);
