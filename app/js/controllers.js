/**
 * Controllers
 */

var start = 0;
var totalScore = 0 ;
var scanInterval;
var truckInterval;
var EASY_IMAGE_ARRAY = [
    111,
    112,
    113,
    121,
    122,
    123,
    131,
    132,
    133,
    211,
    212,
    213,
    221,
    222,
    223,
    231,
    232,
    233,
    311,
    312,
    313,
    321,
    322,
    323,
    331,
    332,
    333
];
const MIN_TRUCK_FULL = 12;
const MAX_TRUCK_FULL = 22;
const FULL_TO_OVERLOAD = 10;
const TOTAL_TRIAL = 20;
const CORRECT_DISPATCH_POINT = 100;
const CORRECT_SCAN_LOW_POINT = 10;
const CORRECT_SCAN_HIGH_POINT = 20;
const SCAN_TIMEOUT = 20;
var AI_success_rate = 0.8;

var AI_Initial_suggestion = [];
var  AI_suggestion = [];
var  AI_random = [];
const AI_CORRECT = 0, AI_FALSE_ALARM = 1, AI_MISS_ALARM = 2;
const SCAN_INTERVAL = 9, TRUCK_INTERVAL = 30;
var EASY;
var currentFourAnswerArray = [123, 123, 123, 123];

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
        AI_Initial_suggestion = generateAIInitialArray(TOTAL_TRIAL * AI_success_rate);
        AI_random = getRandomArray(TOTAL_TRIAL);
        AI_suggestion = sortArrayAccordingToRandom(AI_Initial_suggestion, AI_random);

        $("#score").text(totalScore);
        $(document).ready(function() {
            if( start === 0){
                scanInterval  = setInterval(function(){
                    checkScore();
                    showOneScan();
                }, SCAN_INTERVAL * 1000);

                showOneTruck();

                truckInterval = setInterval(function () {
                    showOneTruck();
                }, TRUCK_INTERVAL * 1000);

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
                return Math.floor((Math.random() * (MAX_TRUCK_FULL - MIN_TRUCK_FULL + 1))
                + MIN_TRUCK_FULL); //12-24 seconds
            }

            function getTypeAlarm(){
                // 0 Miss Alarm or 1 False Alarm +  normal > alarm when truck is full
                return ( Math.floor((Math.random() * 100) + 1) % 2) ;
            }

        }
        function showOneScan(){
            var correctImage =  getRandomImage(currentFourAnswerArray) ;
            var correctImagePosition = getRandomPositionForCorrectAnswer();
            currentFourAnswerArray[correctImagePosition -1 ] = correctImage;

            var wrongImage = getAnotherRandomImage(correctImage);
            var wrongImagePosition = getAnotherRandomPosition(correctImagePosition);
            currentFourAnswerArray[wrongImagePosition -1 ] = wrongImage;
            console.log(correctImage + " " + correctImagePosition + " " + wrongImage
                +  " " + wrongImagePosition );
            console.log(currentFourAnswerArray);

            setDisplayMovingImage( correctImage);
            setDisplayCorrectImage(correctImagePosition, correctImage);
            setDisplayWrongImage(wrongImagePosition, wrongImage);

            setCorrectImageClick(correctImagePosition);
            setWrongImageClick(correctImagePosition);

            setMoveMovingImage();

            function setDisplayWrongImage(wrongImagePosition,wrongImage ) {
                $("#image" + wrongImagePosition + "1").attr('src',  "img/easy/item" + getOrder(wrongImage, 3) + ".png");
                $("#image" + wrongImagePosition + "2").attr('src',  "img/easy/item" + getOrder(wrongImage, 2) + ".png");
                $("#image" + wrongImagePosition + "3").attr('src',  "img/easy/item" + getOrder(wrongImage, 1) + ".png");
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
                $("#image" + correctImagePosition + "1").attr('src',  "img/easy/item" + getOrder(correctImage, 3) + ".png");
                $("#image" + correctImagePosition + "2").attr('src',  "img/easy/item" + getOrder(correctImage, 2) + ".png");
                $("#image" + correctImagePosition + "3").attr('src',  "img/easy/item" + getOrder(correctImage, 1) + ".png");
            }

            function setDisplayMovingImage( orderImage) {
                $("#movingImage1")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 3) + ".png");
                $("#movingImage2")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 2) + ".png");
                $("#movingImage3")
                    .attr('src',  "img/easy/item" + getOrder(orderImage, 1) + ".png");
            }

            function getOrder( decimalNumber, baseOf10InDecimal){
                //Ex : number 1234, position 4 return 1, position 3 return 2
                return parseInt(decimalNumber / Math.pow(10, baseOf10InDecimal -1 )) % 10;
            }

            function getRandomImage(currentFourAnswerArray){
                var value = EASY_IMAGE_ARRAY[Math.floor((Math.random() * EASY_IMAGE_ARRAY.length) )];
                while(currentFourAnswerArray.indexOf(value) !== -1){
                    value = EASY_IMAGE_ARRAY[Math.floor((Math.random() * EASY_IMAGE_ARRAY.length) )];
                }
                return value;
            }

            function getAnotherRandomImage ( firstImage ){
                var second = EASY_IMAGE_ARRAY[Math.floor((Math.random() * EASY_IMAGE_ARRAY.length) )];
                while ( second === firstImage){
                    second =  EASY_IMAGE_ARRAY[Math.floor((Math.random() * EASY_IMAGE_ARRAY.length) )];
                }
                return second;
            }

            function getRandomPositionForCorrectAnswer(){
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

        function getRandomArray(N){
            var randomArray = [];
            for ( var i = 0 ; i < N; i++){
                randomArray[i] = Math.random();
            }
            return randomArray;
        }
        function generateAIInitialArray(correctGuess){
            var array = [];
            var each_wrong_alarm = (TOTAL_TRIAL - correctGuess)/2;
            for ( var i = 0 ; i < TOTAL_TRIAL; i ++){
                if(i < each_wrong_alarm)
                    array[i] = AI_FALSE_ALARM;
                else if( i < 2 * each_wrong_alarm)
                    array[i] = AI_MISS_ALARM;
                else
                    array[i] = AI_CORRECT;
            }
            return array;
        }
        function sortArrayAccordingToRandom(sortArray, randomArray){
            var sortedArray = [], indexArray = [], i, j;
            var originalRandomArray = randomArray.slice(0);
            randomArray.sort(function(a, b){return a-b;});
            for( i = 0 ; i < originalRandomArray.length; i ++){
                for ( j = 0 ; j < randomArray.length; j++){
                    if( originalRandomArray[i] === randomArray[j]){
                        indexArray[i] = j;
                        break;
                    }
                }
            }
            for( i = 0 ; i < sortArray.length; i ++){
                sortedArray[i] = sortArray[indexArray[i]];
            }
            return sortedArray;
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
    .controller("trialHardController", function($scope, $state){
        console.log("Scan hard here");

        $(document).ready(function() {
            $("row2").animate({
                backgroundColor: "#000"
            },5000);
        });
    })

    .controller("UserController", function($scope, $state){
        EASY = getRandomEasyOrHardRound();
        console.log(EASY + " currently, set EASY to true as default > always show the easy level");
        EASY = true;
        $scope.goToEasyOrHard = function(){
            if(EASY )
                $state.go("scan");
            else $state.go("scan_hard");
        };
        function getRandomEasyOrHardRound(){
            return Math.floor( (Math.random() * 100) + 1) % 2 === 1;
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

