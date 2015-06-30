/**
 * Created by Khue on 24/6/2015.
 */

angular.module('myApp.controller', [])
.controller('trialController', function($state, $scope) {
      $scope.goToTruck= function(){
          $state.go('truck');
      };
        $scope.goToScan= function(){
            $state.go('scan');
        }

    });