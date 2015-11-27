'use strict';

app.controller('ControllerMenu', function($rootScope, $scope, $ionicSideMenuDelegate, ngAuthSettings,  $ionicPopup, authService, $state, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.logoff = function(){
		$scope.toggleLeft();

		var confirmPopup = $ionicPopup.confirm({
			title: 'Sair do Sistema',
			template: 'Tem certeza que deseja sair do sistema?',
			buttons: [
				{ text: "Não",
				type: 'button-assertive',
				onTap:function(e){
					return false;
				}
				},
				{ text: "Sim",
				type: 'button-positive',
					onTap:function(e){
						return true;
					}
				},
			]

		});
		confirmPopup.then(function(res) {
			if(res) {
				authService.logOut();
				$state.go('app.login');
				return false;
			}
		});
	};


	$rootScope.$on('loadDataUser', function(event, data) {
		authService.loadDataUser().then(function (response) {
			localStorageService.set('Nome', response.NomeProfissional);
			localStorageService.set('Email', response.EmailBRQ);
			localStorageService.set('FotoProfissional', serviceBase + response.FotoProfissional);
			localStorageService.set('CodigoUsuario', response.CodigoUsuario);

			$scope.NomeProfissional = response.NomeProfissional;
			$scope.CodigoUsuario = response.CodigoUsuario;
			$scope.FotoProfissional = serviceBase + response.FotoProfissional;
        },
        function (err) {
        	console.log(err);
        });

	});


});