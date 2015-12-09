'use strict'

app.controller('ControllerVinculos', function($scope, $http, $ionicModal, $ionicPopup, vinculosService, popupService, $ionicLoading) {
	$scope.processing = false;
  $scope.vinculo = {};

  $scope.getProfissionais = function(status){
    vinculosService.getProfissionais().then(function (response) {
     $scope.listaProfissionais = response;
   },
   function (err) {
   });
  };

  $scope.getProfissionais();

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

  $scope.vincular = function(numeroChamado, matriculaProfissional, codigoPatrimonio, numeroMatriculaProfissionalEntrega, observacaoDaEntrega){
          $scope.loadingShow('Vinculando...');
          vinculosService.vincular(numeroChamado, matriculaProfissional, codigoPatrimonio, numeroMatriculaProfissionalEntrega, observacaoDaEntrega).then(function (response) {
           if(response == true){
            var informacoes = {
              title: 'Sucesso!',
              body: 'Patrimônio Vinculado com Sucesso',
              btbBody: 'Ok'
            };
            popupService.acionaPopupSucesso(informacoes); 
            $ionicLoading.hide();
            $scope.vinculo = {};
            $scope.listarPatrimonios(5);
           }else{
            var informacoes = {
              title: 'Erro!',
              body: 'Ocorreu um erro ao Vincular o patrimônio',
              btbBody: 'Tentar Novamente'
            };
            popupService.acionaPopupErro(informacoes);
            $ionicLoading.hide();
           }
          },
          function (err) {
          });

          $scope.closeModal();

  }

  $scope.desvincular = function(codigoPatrimonioProfissional, numeroChamado, matriculaProfissional, matriculaResponsavelVinculo, codigoPatrimonio, NomeProfissional){
    
    var confirmPopup = $ionicPopup.confirm({
      title: 'Desvincular Patrimônio',
      template: 'Tem certeza que deseja desvincular o patrimônio de '+NomeProfissional+'?',
      buttons: [
      { text: 'Não' },
      {
        text: 'Sim',
        type: 'button-positive',
        onTap: function() { 
          $scope.loadingShow('Desvinculando...');
          vinculosService.desvincular(codigoPatrimonioProfissional, numeroChamado, matriculaProfissional, matriculaResponsavelVinculo, codigoPatrimonio).then(function (response) {
           if(response == true){
            var informacoes = {
              title: 'Sucesso!',
              body: 'Patrimônio desvinculado com sucesso',
              btbBody: 'Ok'
            };
            $ionicLoading.hide();
            popupService.acionaPopupSucesso(informacoes); 
            $scope.listarPatrimonios(1);

           }else{
            var informacoes = {
              title: 'Erro!',
              body: 'Ocorreu um erro ao desvincular o patrimônio',
              btbBody: 'Tentar Novamente'
            };
            popupService.acionaPopupErro(informacoes);
            $ionicLoading.hide();
           }
          },
          function (err) {
          });

          $scope.closeModal();
        }
      }
    ]
  });

  }

    // Inicialização do modal de cadastro bloqueado
    $ionicModal.fromTemplateUrl('templates/app/vinculos/modal/detalhes.html', {
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


    $scope.loadingShow = function(mensagem) {
    $ionicLoading.show({
      template: '<i class="icon ion-ios7-reloading"></i>  '+ mensagem
    });
    };

    // Encerra Loading
    $scope.loadingHide = function(){
    $ionicLoading.hide();
    }; 
  })