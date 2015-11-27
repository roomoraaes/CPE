'use strict';

app.factory('authService', function ($http, $q, localStorageService, ngAuthSettings, $location, $rootScope, $timeout, $state) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _login = function (loginData) {

        var data = "usuario=" + loginData.usuario + "&senha=" + loginData.senha+ "&salvarUsuario=true";
        var deferred = $q.defer();
        $http.post(serviceBase + 'Login/Login', data, { headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Set-Cookie': 'usuario='+loginData.usuario+'; path=/'} }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _logOut = function () {
        localStorageService.remove('credencialUsuario');
        localStorageService.remove('CodigoUsuario');
        localStorageService.remove('Email');
        localStorageService.remove('FotoProfissional');
        localStorageService.remove('Nome');
        $location.path('/app/login');
    };

    var _checkAuth = function(){
        var authData = localStorageService.get('credencialUsuario');
        if (!authData) {
            _logOut();
        }
    }

    var _loadDataUser = function(){
        var deferred = $q.defer();
        $http.get(serviceBase + 'Home/CarregarDadosUsuario', { withCredentials : true, headers: { 'Content-Type': 'application/json; charset=utf-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
    });
        
      return deferred.promise;
  }

  authServiceFactory.login = _login;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.checkAuth = _checkAuth;
  authServiceFactory.loadDataUser = _loadDataUser;

  return authServiceFactory;
});