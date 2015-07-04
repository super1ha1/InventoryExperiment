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


        var totalScore = 0 ;
        $("#score").text(totalScore);

        var interval = setInterval(function(){
        //for (var i = 0 ;i < 100; i ++){
            $(document).ready(function() {
                checkScore();
                function checkScore(){
                    console.log("Start new scan here " );
                    $("#resultScan").text(function(i, originalText){
                        console.log(" New round: Current Text is: " + originalText);
                        if( originalText === "TIMEOUT"){
                            console.log("result: " +  "TIMEOUT");
                        }else if(originalText === "CORRECT"){
                            totalScore += 10;
                            console.log("score: " +  totalScore);
                            $("#score").text(totalScore);
                        }else if(originalText ===  "INCORRECT"){
                            console.log("result: " +  "INCORRECT");
                        }
                        return "";
                    });
                }

                //$("#resultScan").text("");


                var correctImage =  getRandomImage() ;
                var correctImagePosition = getRandomPosition();
                $("#image" + correctImagePosition).attr('src',  "img/easy/easy" + correctImage + ".png")
                    .click(function(){
                        $("#resultScan").text("CORRECT");
                        $("#movingImage").stop(false, true);
                    });

                $("#movingImage")
                    .attr('src',  "img/easy/easy" + correctImage + ".png");

                $("#image" + correctImagePosition).siblings("img").click(function(){
                    $("#resultScan").text("INCORRECT");
                    $("#movingImage").stop(false, true);
                });

                var wrongImage = getAnotherRandomImage(correctImage);
                var wrongImagePosition = getAnotherRandomPosition(correctImagePosition);
                $("#image" + wrongImagePosition).attr('src',  "img/easy/easy" + wrongImage + ".png");

                wrongImage = getAnotherRandomImage(correctImage);
                wrongImagePosition = getAnotherRandomPosition(correctImagePosition);
                $("#image" + wrongImagePosition).attr('src',  "img/easy/easy" + wrongImage + ".png");

                $("#movingImage")
                    .animate({top: "+=350"}, 4000, function(){
                        $("#resultScan").text(function(i, originalText) {
                            console.log("End animate, Current Text is: " + originalText);
                            if (originalText === "") {
                                return "TIMEOUT";
                            }
                        });
                    })
                    .animate({opacity: "0"}, 200)
                    .animate({top: "20", opacity: "1"}, 10 );
            });

        }, 5000);

        $scope.cancel = function(){
            clearInterval(interval);
        };



        function getRandomImage(){
            return Math.floor((Math.random() * 20) + 1);
        }
        function getAnotherRandomImage ( firstImage ){
            var second =  Math.floor((Math.random() * 20) + 1);
            while ( second === firstImage){
                second =  Math.floor((Math.random() * 20) + 1);
            }
            return second;
        }

        function getRandomPosition(){
            return Math.floor((Math.random() * 4) + 1 );
        }

        function getAnotherRandomPosition(firstImage){
            var second =  Math.floor((Math.random() * 4) + 1);
            while ( second === firstImage){
                second =  Math.floor((Math.random() * 4) + 1);
            }
            return second;
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