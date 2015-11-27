    'use strict';

    angular.module('starter.controller.login', [])

    .controller('ControllerLogin',function ($scope, $location, authService, popupService, $timeout, $ionicLoading, localStorageService, $state ) {

        $scope.loginData = {
            usuario: "",
            senha: ""
        };

        $scope.login = function () {
            $scope.loadingShow('Efetuando Login...'); 
            authService.login($scope.loginData).then(function (response) {
                $scope.loadingHide();  

                if(response.CredencialValida){

                    //Emit evento para carregar dados do usuário
                    $scope.$emit('loadDataUser', []);                    

                    localStorageService.set('credencialUsuario', $scope.loginData);
                    $state.go('app.dashboard');
                }else{
                    var informacoes = {
                        title: 'Ops, Ocorreu um erro!',
                        body: 'Credenciais Inválidas',
                        btbBody: 'Tentar novamente'
                    };
                    popupService.acionaPopupErro(informacoes);
                    $scope.loadingHide();                    
                    authService.logOut();
                }

            },
            function (err) {
                var informacoes = {
                    title: 'Ops, Ocorreu um erro!',
                    body: 'Credenciais Inválidas',
                    btbBody: 'Tentar novamente'
                };
                popupService.acionaPopupErro(informacoes);
                $scope.loadingHide();                    
                authService.logOut();

            });
        };

        $scope.loadingShow = function(mensagem) {
            $ionicLoading.show({
              template: '<i class="icon ion-ios7-reloading"></i>   '+ mensagem
            });
        };

        $scope.loadingHide = function(){
            $ionicLoading.hide();
        };    

});