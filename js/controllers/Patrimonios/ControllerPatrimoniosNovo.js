'use strict';

app.controller('ControllerPatrimoniosNovo', function($state, $rootScope, $scope, $http, popupService, $ionicSideMenuDelegate, $ionicLoading, patrimonioService) {

	$scope.patrimonio = [];
 	

	$scope.obterUltimoNumero = function(){
		patrimonioService.obterUltimoNumero().then(function (response2) {
			$scope.patrimonio.codigoNumeroPatrimonio = response2;
		},
		function (err2) {
		});	
	};

 	$scope.obterUltimoNumero();

	$scope.scanBarCode = function(){
		$scope.loadingShow('Carregando Código de Barra'); 
		cordova.plugins.barcodeScanner.scan(
			function (result) {
				$scope.patrimonio.codigoNumeroPatrimonio = result.text;
				$scope.loadingHide();
			}, 
			function (error) {
				alert("Falha ao escanear. Erro: " + error);
				$scope.loadingHide();
			}
			);
	};

	$scope.generateBarCode = function(){
		$scope.loadingShow('Carregando Código de Barra'); 

		cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.PHONE_TYPE, '234543233455', function(success) {
			alert("encode success: " + success);
		}, function(fail) {
			alert("encoding failed: " + fail);
		}
		);
	};

	$scope.getTipoPatrimonio = function(){
		patrimonioService.getTipoPatrimonio().then(function (response) {
			$scope.listaTipoPatrimonio = response;
		},
		function (err) {
		});
	};

	$scope.getFornecedoresPatrimonio = function(){
		patrimonioService.getFornecedoresPatrimonio().then(function (response) {
			$scope.listaFornecedoresPatrimonio = response;
		},
		function (err) {
		});
	};

	$scope.getTipoPatrimonio();
	$scope.getFornecedoresPatrimonio();

	$scope.sendToServer = function(){
		patrimonioService.checkExistePatrimonio($scope.patrimonio.codigoNumeroPatrimonio).then(function (response) {
			if(!response){
				patrimonioService.salvaPatrimonio($scope.patrimonio).then(function (response2) {
					if(response2){
						var informacoes = {
							title: 'Sucesso!',
							body: 'Patrimônio cadastrado com sucesso',
							btbBody: 'Ok'
						};
						popupService.acionaPopupSucesso(informacoes);
						$scope.patrimonio = [];	
						$state.go('app.patrimonios');
					}
				},
				function (err2) {
				});	

			}else{
				var informacoes = {
					title: 'Ops, Ocorreu um erro!',
					body: 'Já existe um patrimônio cadastrado com esse Código',
					btbBody: 'Tentar Novamente'
				};
				popupService.acionaPopupErro(informacoes);				
			}
		},
		function (err) {
		});		
	};

	//Inicia Loading
	$scope.loadingShow = function(mensagem) {
		$ionicLoading.show({
			template: '<i class="icon ion-loading-d"></i>  '+ mensagem
		});
	};

    // Encerra Loading
    $scope.loadingHide = function(){
    	$ionicLoading.hide();
    };    

})