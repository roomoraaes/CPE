'use strict';

app.factory('dashboardService', function($ionicPopup,ngAuthSettings, $http, $q){

	var factoryPopup = {};
    var serviceBase = ngAuthSettings.apiServiceBaseUri;	

    var _listaPatrimonios  = function(statusPatrimonio){
        var deferred = $q.defer();
        var data = "numeroPatrimonio=&numeroSerie=&tipoPatrimonio=0&statusPatrimonio="+statusPatrimonio+"&fornecedor=";
     
        $http.post(serviceBase + 'Patrimonio/ListarPatrimonio', data ,  { withCredentials : true, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };     

    factoryPopup.listaPatrimonios = _listaPatrimonios;

	return factoryPopup;

});