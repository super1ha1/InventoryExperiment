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
// A complex subclass of Parse.Object
var Monster = Parse.Object.extend("Monster", {
    // Instance methods
    hasSuperHumanStrength: function () {
        return this.get("strength") > 18;
    },
    // Instance properties go in an initialize method
    initialize: function (attrs, options) {
        this.sound = "Rawr"
    }
}, {
    // Class methods
    spawn: function(strength) {
        var monster = new Monster();
        monster.set("strength", strength);
        return monster;
    }
});

//var monster = Monster.spawn(200);
//alert(monster.get('strength'));  // Displays 200.
//alert(monster.sound); // Displays Rawr.