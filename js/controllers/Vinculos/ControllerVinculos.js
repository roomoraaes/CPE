﻿'use strict'

app.controller('ControllerVinculos', function($scope, $http, $ionicModal, vinculosService) {
	$scope.processing = false;

	$scope.listarPatrimonios = function(status){
		$scope.processing = true;
		  vinculosService.listaPatrimonios(status).then(function (response) {
			$scope.patrimonios = response;
			$scope.processing = false;
			$scope.$broadcast('scroll.refreshComplete');
		},
		function (err) {
			$scope.processing = false;
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

    // Inicialização do modal de cadastro bloqueado
    $ionicModal.fromTemplateUrl('templates/app/patrimonios/modal/detalhes.html', {
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.Modal = modal;
    });

    $scope.detalhesPatrimonio = function(number) {
    	$scope.patrimonioSingle = $scope.patrimonios[number];
      $scope.Modal.show();
    };

    $scope.closeModal = function() {
      $scope.Modal.hide();
    };    

})