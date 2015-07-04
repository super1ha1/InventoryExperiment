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
        function checkScore(){
            //console.log("Start new scan here " );
            $("#movingImage")
                .animate({opacity: "0"}, 200)
                .animate({top: "20", opacity: "1"}, 10 );

            $("#resultScan").text(function(i, originalText){
                //console.log(" New round: Current Text is: " + originalText);
                if( originalText === "TIMEOUT"){
                    //console.log("result: " +  "TIMEOUT");
                }else if(originalText === "CORRECT"){
                    totalScore += 10;
                    //console.log("score: " +  totalScore);
                    $("#score").text(totalScore);
                }else if(originalText ===  "INCORRECT"){
                    //console.log("result: " +  "INCORRECT");
                }
                return "";
            });
        }
        var totalScore = 0 ;
        var scanInterval;
        $("#score").text(totalScore);


        $(document).ready(function() {
            scanInterval  = setInterval(function(){
                checkScore();
                showOneScan();
            }, 9000);

        });

        function showOneScan(){
            var correctImage =  getRandomImage() ;
            var correctImagePosition = getRandomPosition();
            $("#image" + correctImagePosition).attr('src',  "img/easy/easy" + correctImage + ".png")
                .click(function(){
                    $("#resultScan").text("CORRECT");
                    $("#movingImage").stop(true, false);
                });

            $("#movingImage")
                .attr('src',  "img/easy/easy" + correctImage + ".png");

            $("#image" + correctImagePosition).siblings("img").click(function(){
                $("#resultScan").text("INCORRECT");
                $("#movingImage").stop(true, false);

            });

            var wrongImage = getAnotherRandomImage(correctImage);
            var wrongImagePosition = getAnotherRandomPosition(correctImagePosition);
            $("#image" + wrongImagePosition).attr('src',  "img/easy/easy" + wrongImage + ".png");

            //wrongImage = getAnotherRandomImage(correctImage);
            //wrongImagePosition = getAnotherRandomPosition(correctImagePosition);
            //$("#image" + wrongImagePosition).attr('src',  "img/easy/easy" + wrongImage + ".png");

            $("#movingImage")
                .delay(1.5 * 1000)
                .animate({top: "+=350"}, 7000, function(){
                    $("#resultScan").text(function(i, originalText) {
                        //console.log("End animate, Current Text is: " + originalText);
                        if (originalText === "") {
                            return "TIMEOUT";
                        }
                    });
                });
        }


        $scope.cancel = function(){
            clearInterval(scanInterval);
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


    })
    .controller("testController", function($scope, $state){
        $(document).ready(function() {
            $("row2").animate({
                backgroundColor: "#000"
            },5000);
        });
    })
    .controller("truckController", function($scope, $state){
        $(document).ready(function() {
            showOneTruck();
            var truckInterval = setInterval(function () {
                showOneTruck();
            }, 30 * 1000);
        });
        function showOneTruck(){
            var truckTime = getRandomTruckTime();
            console.log("Truck Time: " + truckTime);

            var typeAlarm = getTypeAlarm();
            console.log("Type: " + typeAlarm);

            $(".progress-bar")
                .animate({
                    width: "100%"
                }, truckTime * 1000, function () {
                    console.log("Callback when truck end here");
                }).delay(10 * 10000)
                .animate({
                    width: "0%"
                }, 10);

            if( typeAlarm === 1 ){
                var alarmTimeout = setTimeout(function(){
                    console.log("Set False Alarm truck is full: ");
                    $("#alarm").text("Truck is full");
                    setTimeout(function(){
                        $("#alarm").text("");
                    }, 3 * 1000);
                },truckTime/2 * 1000);
            }
        }
        function getRandomTruckTime(){
            return Math.floor((Math.random() * 11) + 12);
        }
        function getTypeAlarm(){
            return ( Math.floor((Math.random() * 1000) + 1) % 2) ;
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