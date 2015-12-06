/**
 * Controllers
 */

var start = 0;
var totalScore = 0 ;
var scanInterval;
var truckInterval;
var imageCombinationArray = [
    1111,
    1112,
    1113,
    1114,
    1121,
    1122,
    1123,
    1124,
    1131,
    1132,
    1133,
    1134,
    1141,
    1142,
    1143,
    1144,
    1211,
    1212,
    1213,
    1214,
    1221,
    1222,
    1223,
    1224,
    1231,
    1232,
    1233,
    1234,
    1241,
    1242,
    1243,
    1244,
    1311,
    1312,
    1313,
    1314,
    1321,
    1322,
    1323,
    1324,
    1331,
    1332,
    1333,
    1334,
    1341,
    1342,
    1343,
    1344,
    1411,
    1412,
    1413,
    1414,
    1421,
    1422,
    1423,
    1424,
    1431,
    1432,
    1433,
    1434,
    1441,
    1442,
    1443,
    1444,
    2111,
    2112,
    2113,
    2114,
    2121,
    2122,
    2123,
    2124,
    2131,
    2132,
    2133,
    2134,
    2141,
    2142,
    2143,
    2144,
    2211,
    2212,
    2213,
    2214,
    2221,
    2222,
    2223,
    2224,
    2231,
    2232,
    2233,
    2234,
    2241,
    2242,
    2243,
    2244,
    2311,
    2312,
    2313,
    2314,
    2321,
    2322,
    2323,
    2324,
    2331,
    2332,
    2333,
    2334,
    2341,
    2342,
    2343,
    2344,
    2411,
    2412,
    2413,
    2414,
    2421,
    2422,
    2423,
    2424,
    2431,
    2432,
    2433,
    2434,
    2441,
    2442,
    2443,
    2444,
    3111,
    3112,
    3113,
    3114,
    3121,
    3122,
    3123,
    3124,
    3131,
    3132,
    3133,
    3134,
    3141,
    3142,
    3143,
    3144,
    3211,
    3212,
    3213,
    3214,
    3221,
    3222,
    3223,
    3224,
    3231,
    3232,
    3233,
    3234,
    3241,
    3242,
    3243,
    3244,
    3311,
    3312,
    3313,
    3314,
    3321,
    3322,
    3323,
    3324,
    3331,
    3332,
    3333,
    3334,
    3341,
    3342,
    3343,
    3344,
    3411,
    3412,
    3413,
    3414,
    3421,
    3422,
    3423,
    3424,
    3431,
    3432,
    3433,
    3434,
    3441,
    3442,
    3443,
    3444,
    4111,
    4112,
    4113,
    4114,
    4121,
    4122,
    4123,
    4124,
    4131,
    4132,
    4133,
    4134,
    4141,
    4142,
    4143,
    4144,
    4211,
    4212,
    4213,
    4214,
    4221,
    4222,
    4223,
    4224,
    4231,
    4232,
    4233,
    4234,
    4241,
    4242,
    4243,
    4244,
    4311,
    4312,
    4313,
    4314,
    4321,
    4322,
    4323,
    4324,
    4331,
    4332,
    4333,
    4334,
    4341,
    4342,
    4343,
    4344,
    4411,
    4412,
    4413,
    4414,
    4421,
    4422,
    4423,
    4424,
    4431,
    4432,
    4433,
    4434,
    4441,
    4442,
    4443,
    4444
];
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
            $("#movingRow")
                .animate({opacity: "0"}, 200)
                .animate({top: "20", opacity: "1"}, 10 );

            $("#resultScan").text(function(i, originalText){
                if( originalText === "TIMEOUT"){

                }else if(originalText === "CORRECT"){
                    totalScore += 10;
                    $("#score").text(totalScore);
                }else if(originalText ===  "INCORRECT"){
                    //console.log("result: " +  "INCORRECT");
                }
                return "";
            });
        }


        function showOneTruck(){

            var truckTime = getRandomTruckTime();
            var typeAlarm = getTypeAlarm();
            var currentPosition = 1;
            var eachRowSecond = truckTime / 5 * 1000;
            var eachRowInterval;
            console.log("Truck Time: " + truckTime + " Type Alarm: " + typeAlarm);

            displayOneTruck();

            //setTimeout(function(){
            //    displayOneTruck();
            //}, truckTime * 1000);

            //if( typeAlarm === 1 ){
            //    var alarmTimeout = setTimeout(function(){
            //        console.log("Set False Alarm truck is full: ");
            //        notifyTruckFull();
            //    },truckTime/2 * 1000);
            //}



            function displayOneTruck() {
                console.log("Start new setTimeout to show one truck here");
                eachRowInterval = setInterval(function(){
                    if (currentPosition <= 5){
                        animateOneRow();
                    }else{
                        console.log("Stop animate row here ");
                        clearInterval(eachRowInterval);
                        $('tr')
                            .animate({
                                'background-color': '#fce3ac'
                            }, 10);
                    }
                }, eachRowSecond);
                //$("#blue")
                //    .animate( {backgroundColor:'#fce3ac'}, 6 * 1000);
                //$('tr')
                //    //.animate( {height: 300}, 6 * 1000);
                //    .animate({
                //        'background-color': '#0000FF'
                //    }, truckTime * 1000, function () {
                //        console.log("Callback when truck end here: animate color");
                //        notifyTruckFull();
                //    })
                //    //.delay(10 * 10000)
                //    .animate({
                //        'background-color': '#fce3ac'
                //    }, 10);
            }

            function animateOneRow() {
                console.log("Current row: " + currentPosition);
                //$('#' + currentPosition)
                //    //.show()
                //    .animate({
                //        'background-color': '#0000FF'
                //    },eachRowSecond , function(){
                //        currentPosition++;
                //    });

                $('#animateDiv')
                    //.show()
                    .animate({
                        'height': '+=20'
                    },eachRowSecond , function(){
                        currentPosition++;
                    });

                //$("#animateDiv")
                //    .animate()
            }

            function notifyTruckFull(){
                $("#alarm").text("Truck is full");
                setTimeout(function(){
                    $("#alarm").text("");
                }, 3 * 1000);
            }

            function getRandomTruckTime(){
                return Math.floor((Math.random() * 11) + 12); //12-24 seconds
            }

            function getTypeAlarm(){
                // 0 Miss Alarm or 1 False Alarm +  normal > alarm when truck is full
                return ( Math.floor((Math.random() * 100) + 1) % 2) ;
            }

        }
        function showOneScan(){
            var correctImage =  getRandomImage() ;
            var correctImagePosition = getRandomPosition();
            var wrongImage = getAnotherRandomImage(correctImage);
            var wrongImagePosition = getAnotherRandomPosition(correctImagePosition);

            setDisplayMovingImage( correctImage);
            setDisplayCorrectImage(correctImagePosition, correctImage);
            setDisplayWrongImage(wrongImagePosition, wrongImage);

            setCorrectImageClick(correctImagePosition);
            setWrongImageClick(correctImagePosition);

            setMoveMovingImage();

            function setDisplayWrongImage(wrongImagePosition,wrongImage ) {
                $("#image" + wrongImagePosition + "1").attr('src',  "img/easy/item" + getOrder(wrongImage, 4) + ".png");
                $("#image" + wrongImagePosition + "2").attr('src',  "img/easy/item" + getOrder(wrongImage, 3) + ".png");
                $("#image" + wrongImagePosition + "3").attr('src',  "img/easy/item" + getOrder(wrongImage, 2) + ".png");
                $("#image" + wrongImagePosition + "4").attr('src',  "img/easy/item" + getOrder(wrongImage, 1) + ".png");
            }

            function setMoveMovingImage() {
                $(  "#movingRow")
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

            function setWrongImageClick(correctImagePosition) {
                $("#row" + correctImagePosition).siblings("div.row")
                    .click(function(){
                        $("#resultScan").text("INCORRECT");
                        stopMovingImage();
                });
            }

            function setCorrectImageClick(correctImagePosition) {
                //$(  "#image" + correctImagePosition + "1",
                //    "#image" + correctImagePosition + "2",
                //    "#image" + correctImagePosition + "3",
                //    "#image" + correctImagePosition + "4"
                //)
                $(  "#row" + correctImagePosition)
                    .click(function(){
                        $("#resultScan").text("CORRECT");
                        stopMovingImage();
                    });
            }

            function stopMovingImage() {
                $("#movingRow").stop(true, false);
            }

            function setDisplayCorrectImage(correctImagePosition , correctImage) {
                $("#image" + correctImagePosition + "1").attr('src',  "img/easy/item" + getOrder(correctImage, 4) + ".png");
                $("#image" + correctImagePosition + "2").attr('src',  "img/easy/item" + getOrder(correctImage, 3) + ".png");
                $("#image" + correctImagePosition + "3").attr('src',  "img/easy/item" + getOrder(correctImage, 2) + ".png");
                $("#image" + correctImagePosition + "4").attr('src',  "img/easy/item" + getOrder(correctImage, 1) + ".png");
            }

            function setDisplayMovingImage( orderImage) {
                $("#movingImage1")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 4) + ".png");
                $("#movingImage2")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 3) + ".png");
                $("#movingImage3")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 2) + ".png");
                $("#movingImage4")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 1) + ".png");
            }

            function getOrder( number, position){
                return parseInt(number / Math.pow(10, position -1 )) % 10;
            }

            function getRandomImage(){
                return imageCombinationArray[Math.floor((Math.random() * 255) )];
            }

            function getAnotherRandomImage ( firstImage ){
                var second = imageCombinationArray[Math.floor((Math.random() * 255) )];
                while ( second === firstImage){
                    second =  imageCombinationArray[Math.floor((Math.random() * 255) )];
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

