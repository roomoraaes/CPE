'use strict';

app.factory('vinculosService', function($ionicPopup,ngAuthSettings, $http, $q){

	var factoryPopup = {};
    var serviceBase = ngAuthSettings.apiServiceBaseUri;	

    var _listaPatrimonios  = function(statusPatrimonio){
        var deferred = $q.defer();
        var data = "nomeProfissional=&numeroPatrimonio=&numeroChamado=&tipoPatrimonio=0&statusPatrimonio="+statusPatrimonio;
     
        $http.post(serviceBase + 'Patrimonio/ListarVincularPatrimonio', data ,  { withCredentials : true, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };

    var _vincular  = function(numeroChamado, matriculaProfissional, codigoPatrimonio, numeroMatriculaProfissionalEntrega, observacaoDaEntrega){
        var data = "numeroChamado="+numeroChamado+"&matriculaProfissional="+matriculaProfissional+"&codigoPatrimonio="+codigoPatrimonio+"&numeroMatriculaProfissionalEntrega="+numeroMatriculaProfissionalEntrega+"&observacaoDaEntrega="+observacaoDaEntrega;
     
        $http.post(serviceBase + 'Patrimonio/VincularPatrimonioProfissional', data , { withCredentials : true, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };


    var _desvincular  = function(codigoPatrimonioProfissional, numeroChamado, matriculaProfissional, matriculaResponsavelVinculo, codigoPatrimonio){
        var deferred = $q.defer();
        var today = new Date();
        var dd = today.getDate(); 
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear(); 
        var hoje = dd+"/"+mm+"/"+yyyy;

        var data = "codigoPatrimonioProfissional="+codigoPatrimonioProfissional+"&numeroChamado="+numeroChamado+"&matriculaProfissional="+matriculaProfissional+"&matriculaResponsavelVinculo="+matriculaResponsavelVinculo+"&codigoPatrimonio="+codigoPatrimonio+"&dataAtribuicao="+hoje+"&dataDevolucao="+hoje;
     
        $http.post(serviceBase + 'Patrimonio/DesvincularPatrimonioProfissional', data , { withCredentials : true, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };

    var _getProfissionais  = function(){
        var deferred = $q.defer();

        $http.get(serviceBase + 'Patrimonio/ListarProfissionalAutoComplete?nome=', { withCredentials : true, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };













	var _getTipoPatrimonio  = function(){
        var deferred = $q.defer();
        $http.get(serviceBase + 'Patrimonio/ListarVincularPatrimonio', { withCredentials : true, headers: { 'Content-Type': 'application/json; charset=utf-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };

	var _getFornecedoresPatrimonio  = function(){
        var deferred = $q.defer();
        $http.get(serviceBase + 'Patrimonio/ListarFornecedorPatrimonio', { withCredentials : true, headers: { 'Content-Type': 'application/json; charset=utf-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };

	var _checkExistePatrimonio  = function(numerodePatrimonio){
        var deferred = $q.defer();
        var data = {
        	numerodePatrimonio : numerodePatrimonio
        };

        $http.post(serviceBase + 'Patrimonio/ExistePatrimonio', data ,  { withCredentials : true, headers: { 'Content-Type': 'application/json; charset=utf-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };

	var _salvaPatrimonio  = function(patrimonio){
        var deferred = $q.defer();
        var data = "codigoTipoPatrimonio=" + patrimonio.CodigoTipoPatrimonio + "&codigoSerial="+patrimonio.codigoSerial + "&codigoNumeroPatrimonio=" + patrimonio.codigoNumeroPatrimonio+ "&descricaoJustificativa" + patrimonio.descricaoJustificativa+ "&numeroNotaFiscal=" + patrimonio.numeroNotaFiscal+ "&codigoFornecedorPatrimonio=" + patrimonio.codigoFornecedorPatrimonio+ "&codigoSerial=" + patrimonio.codigoSerial+ "&nomeEntregador=" + patrimonio.nomeEntregador+ "&descricaoEquipamento=" + patrimonio.descricaoEquipamento+ "&descricaoJustificativa="+patrimonio.descricaoJustificativa;
     
        $http.post(serviceBase + 'Patrimonio/SalvarPatrimonioNovo', data ,  { withCredentials : true, headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }).success(function(response){
            deferred.resolve(response);
        }).error(function(err){
            deferred.reject(err);
        });
        return deferred.promise;            
     };
     

	var _acionaPopupSucesso = function(informacoes){

		var alertPopup = $ionicPopup.alert({
			title: informacoes.title,
			template: informacoes.body,
			okText: informacoes.btbBody, 
			okType: 'button-positive'
		});
	}

	var _acionaPopupErro = function(informacoes){

		var alertPopup = $ionicPopup.alert({
			title: informacoes.title,
			template: informacoes.body,
			okText: informacoes.btbBody, 
			okType: 'button-assertive'
		});
	}
	

    factoryPopup.listaPatrimonios = _listaPatrimonios;
    factoryPopup.vincular = _vincular;
    factoryPopup.desvincular = _desvincular;
    factoryPopup.getProfissionais = _getProfissionais;

	factoryPopup.getTipoPatrimonio = _getTipoPatrimonio;
	factoryPopup.getFornecedoresPatrimonio = _getFornecedoresPatrimonio;
	factoryPopup.checkExistePatrimonio = _checkExistePatrimonio;
	factoryPopup.salvaPatrimonio = _salvaPatrimonio;
	factoryPopup.acionaPopupSucesso = _acionaPopupSucesso;
	factoryPopup.acionaPopupErro = _acionaPopupErro;

	return factoryPopup;

});