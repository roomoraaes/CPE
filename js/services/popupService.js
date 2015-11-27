'use strict';

app.factory('popupService', function($ionicPopup){

	var factoryPopup = {};

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
	
	factoryPopup.acionaPopupSucesso = 	_acionaPopupSucesso;
	factoryPopup.acionaPopupErro	=	_acionaPopupErro;

	return factoryPopup;

});