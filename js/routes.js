angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

    //$urlRouterProvider.otherwise('/dashboard');

    var authenticated = ['$q', 'AuthFactory', '$state', function ($q, AuthFactory, $state) {
      var deferred = $q.defer();
      console.log(AuthFactory.isLoggedIn());
      AuthFactory.isLoggedIn()
        .then(function (isLoggedIn) {
          if (isLoggedIn.data.id) {
            deferred.resolve();
          } else {
            deferred.reject('Not logged in');
            defer.resolve(false);
            $state.go('appSimple.login');
          }
        });
      return deferred.promise;
    }];

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
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/applicationController.js']
            });
          }]
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

      .state('app.profile', {
        url: '/profile',
        templateUrl: 'views/pages/profile.html',
        ncyBreadcrumb: {
          label: 'Profile',
        },
        resolve: {
          authenticated: authenticated,
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/profileController.js']
            });
          }]
        }
      })

      .state('app.admindashboard', {
        url: '/admin-dashboard',
        templateUrl: 'views/pages/admin/admindashboard.html',
        ncyBreadcrumb: {
          label: 'Admin Dashboard',
        },
        resolve: {
          authenticated: authenticated,
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
          authenticated: authenticated,
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentdashboardController.js']
            });
          }]
        }
      })

      .state('app.adminapplication', {
        url: "/admin",
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
          authenticated: authenticated,
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
          authenticated: authenticated,
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
          authenticated: authenticated,
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
          authenticated: authenticated,
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
          authenticated: authenticated,
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
          authenticated: authenticated,
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/adminresubmissionappController.js']
            });
          }]
        }
      })

      .state('app.agent', {
        url: "/agent",
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Agent'
        }
      })

      .state('app.agent.viewagentlist', {
        url: '/agentlist',
        templateUrl: 'views/pages/admin/agentlist.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Agent List',
        },
        resolve: {
          authenticated: authenticated,
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/agentlistController.js']
            });
          }]
        }
      })

      .state('app.agent.addagent', {
        url: '/addagent',
        templateUrl: 'views/pages/admin/addagent.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Add Agent',
        },
        resolve: {
          authenticated: authenticated,
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/addagentController.js']
            });
          }]
        }
      })

      .state('app.agent.editagent', {
        url: '/editagent/:id',
        templateUrl: 'views/pages/admin/editagent.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Edit Agent',
        },
        resolve: {
          authenticated: authenticated,
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/admin/editagentController.js']
            });
          }]
        }
      })

      .state('app.agentapplication', {
        url: "/agentapp",
        abstract: true,
        template: '<ui-view></ui-view>',
        ncyBreadcrumb: {
          label: 'Application'
        }
      })

      .state('app.agentapplication.newapp', {
        url: '/newapplication',
        templateUrl: 'views/pages/agent/agentnewapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'New Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentnewappController.js']
            });
          }]
        }
      })

      .state('app.agentapplication.allapp', {
        url: '/allapplication',
        templateUrl: 'views/pages/agent/agentallapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'All Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentallappController.js']
            });
          }]
        }
      })

      .state('app.agentapplication.pendingapp', {
        url: '/pendingapplication',
        templateUrl: 'views/pages/agent/agentpendingapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Pending Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentpendingappController.js']
            });
          }]
        }
      })

      .state('app.agentapplication.receiveapp', {
        url: '/receiveapplication',
        templateUrl: 'views/pages/agent/agentreceiveapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Receive Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentreceiveappController.js']
            });
          }]
        }
      })

      .state('app.agentapplication.amendapp', {
        url: '/amendapplication',
        templateUrl: 'views/pages/agent/agentamendapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Amend Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentamendappController.js']
            });
          }]
        }
      })

      .state('app.agentapplication.approveapp', {
        url: '/approveapplication',
        templateUrl: 'views/pages/agent/agentapproveapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Approved Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentapproveappController.js']
            });
          }]
        }
      })
      
      .state('app.agentapplication.rejectapp', {
        url: '/rejectapplication',
        templateUrl: 'views/pages/agent/agentrejectapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Rejected Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentrejectappController.js']
            });
          }]
        }
      })

      .state('app.agentapplication.draftapp', {
        url: '/draftapplication',
        templateUrl: 'views/pages/agent/agentdraftapp.html',
        //page title goes here
        ncyBreadcrumb: {
          label: 'Draft Application',
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
              files: ['js/controllers/agent/agentdraftappController.js']
            });
          }]
        }
      })

  }]);
