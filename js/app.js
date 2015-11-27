var app = angular.module('appcpe', ['ionic', 'morphCarousel', 'starter.controller.login', 'LocalStorageModule']);

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    $stateProvider
    // Rotas para aplicativo dos taxista
    .state('app', {
        url : '/app',
        templateUrl : 'templates/app/menu.html',
        abstract : true,
        controller : 'ControllerMenu'
    })

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'app': {
                templateUrl: 'templates/app/dashboard.html',
                controller : 'ControllerDashboard'
            }
        }
    })    

    .state('app.funcionarios', {
        url: '/funcionarios',
        views: {
            'app': {
                templateUrl: 'templates/app/funcionarios.html',
                controller : 'ControllerFuncionarios'
            }
        }
    })

    .state('app.patrimonios', {
        url: '/patrimonios',
        views: {
            'app': {
                templateUrl: 'templates/app/patrimonios/patrimonios.html',
                controller : 'ControllerPatrimonios'
            }
        }
    })

    .state('app.patrimoniosNovo', {
        url: '/patrimoniosNovo',
        views: {
            'app': {
                templateUrl: 'templates/app/patrimonios/patrimoniosNovo.html',
                controller : 'ControllerPatrimoniosNovo'
            }
        }
    })

    .state('app.vinculos', {
        url: '/vinculos',
        views: {
            'app': {
                templateUrl: 'templates/app/vinculos/vinculos.html',
                controller : 'ControllerVinculos'
            }
        }
    })    

    .state('app.vinculosNovo', {
        url: '/vinculosNovo',
        views: {
            'app': {
                templateUrl: 'templates/app/vinculos/vinculosNovo.html',
                controller : 'ControllerVinculosNovo'
            }
        }
    })  
    .state('app.login', {
        url: '/login',
        views: {
            'app': {
                templateUrl: 'templates/seguranca/login.html',
                controller : 'ControllerLogin'
            }
        }
    })   

    $urlRouterProvider.otherwise('/app/dashboard');
});

var urlBase = 'http://homologcpe.azurewebsites.net/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: urlBase
});

app.run(function(authService, $rootScope, $timeout, localStorageService){
     
    $timeout(function(){
        $rootScope.$emit('loadDataUser', []); 
    }, 300);

    authService.checkAuth();
    $rootScope.$on("$stateChangeStart", function (event, next) {
        authService.checkAuth();
    });          
});