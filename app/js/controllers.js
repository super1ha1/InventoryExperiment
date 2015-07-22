/**
 * Created by Khue on 24/6/2015.
 */

var start = 0;
var totalScore = 0 ;
var scanInterval;
var truckInterval;
//angular.module('ui.bootstrap.demo', ['ui.bootstrap']).controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
//
//    $scope.items = items;
//    $scope.selected = {
//        item: $scope.items[0]
//    };
//
//    $scope.ok = function () {
//        $modalInstance.close($scope.selected.item);
//    };
//
//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//});



angular.module('myApp.controller', [])
    .controller('trialController',  function ($scope,  $state) {

        //$scope.items = ['item1', 'item2', 'item3'];
        //
        //$scope.animationsEnabled = true;
        //
        //$scope.open = function (size) {
        //
        //    var modalInstance = $modal.open({
        //        animation: $scope.animationsEnabled,
        //        templateUrl: 'myModalContent.html',
        //        controller: 'ModalInstanceCtrl',
        //        size: size,
        //        resolve: {
        //            items: function () {
        //                return $scope.items;
        //            }
        //        }
        //    });
        //
        //    modalInstance.result.then(function (selectedItem) {
        //        $scope.selected = selectedItem;
        //    }, function () {
        //        $log.info('Modal dismissed at: ' + new Date());
        //    });
        //};
        //
        //$scope.toggleAnimation = function () {
        //    $scope.animationsEnabled = !$scope.animationsEnabled;
        //};
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above
        $("#score").text(totalScore);
        $(document).ready(function() {
            if( start === 0){
                scanInterval  = setInterval(function(){
                    checkScore();
                    showOneScan();
                }, 9000);
                showOneTruck();
                truckInterval = setInterval(function () {
                    showOneTruck();
                }, 30 * 1000);
                start = 1;
                console.log("Start the trial here: " + start);
            }else{

            }
        });

        $scope.dispatchTruck = function(){

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


        function showOneTruck(){
            var truckTime = getRandomTruckTime();
            console.log("Truck Time: " + truckTime);

            var typeAlarm = getTypeAlarm();
            console.log("Type: " + typeAlarm);

            setTimeout(function(){
                console.log("Start new setTimeout here");
                notifyTruckFull();

                //$("#blue")
                //    .animate( {backgroundColor:'#fce3ac'}, 6 * 1000);
                $('tr')
                    .animate( {height: 300}, 6 * 1000);
                    //.animate({
                    //    'background-color': '#0000FF'
                    //}, truckTime * 1000, function () {
                    //    console.log("Callback when truck end here: animate color");
                    //    notifyTruckFull();
                    //});
                    //.delay(10 * 10000)
                    //.animate({
                    //    backgroundColor : '#FFFFFF'
                    //}, 10);

            }, truckTime * 1000);



            if( typeAlarm === 1 ){
                var alarmTimeout = setTimeout(function(){
                    console.log("Set False Alarm truck is full: ");
                    notifyTruckFull();
                },truckTime/2 * 1000);
            }
        }
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
        function notifyTruckFull(){
            $("#alarm").text("Truck is full");
            setTimeout(function(){
                $("#alarm").text("");
            }, 3 * 1000);
        }

        function getRandomTruckTime(){
            return Math.floor((Math.random() * 11) + 12);
        }
        function getTypeAlarm(){
            return ( Math.floor((Math.random() * 100) + 1) % 2) ;
        }
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

        $scope.goToTruck= function(){
            $state.go('truck');
        };
        $scope.goToScan= function(){
            $state.go('scan');
        };
        $scope.cancel = function(){
            clearInterval(scanInterval);
        };
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

