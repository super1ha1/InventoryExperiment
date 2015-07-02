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
        };

        function moveImage(){
            var count = 0, //Work with actual number type
                image = document.getElementById('movingImage'),
                timerId = 0;
            var rect = image.getBoundingClientRect();
            console.log(rect.top, rect.right, rect.bottom, rect.left);
            var top = rect.height;
            timerId = setInterval( function() { //This function is called by the browser every 33 milliseconds
                top += 50;
                count++;
                if( count == 5 ) {
                    clearInterval( timerId ); //Stop the interval because left is > 200
                }
                var pixel = top + "px";
                console.log("top: " + top + " pixel: " + pixel);
               //angular.element('#movingImage').css('top' ,'pixel');
               // angular.element.find("#movingImage")[0].style.top = pixel;
                $("#movingImage").css("top" ,"pixel");
            }, 1000 );
        }
        //moveImage();
        $(document).ready(function() {
            $("#movingImage").animate({top: "+=350"}, 5000);
            //$("#movingImage").animate({left: "-=300"}, 1000);
        });

        //$(document).ready(function() {
        //    $("#").animate({left: "+=500"}, 2000);
        //    $("#b").animate({left: "-=300"}, 1000);
        //});

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