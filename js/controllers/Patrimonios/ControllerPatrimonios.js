'use strict'

app.controller('ControllerPatrimonios', function($scope, $http, $ionicModal, patrimonioService) {

	$scope.processing = false;

	$scope.listarPatrimonios = function(status){
		$scope.processing = true;
		patrimonioService.listaPatrimonios(status).then(function (response) {
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