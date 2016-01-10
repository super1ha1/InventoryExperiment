
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
const SCAN_TIMEOUT = 7;
const AI_success_rate = 0.8;

const AI_CORRECT = 0, AI_FALSE_ALARM = 1, AI_MISS_ALARM = 2;
const SCAN_INTERVAL = SCAN_TIMEOUT + 1, TRUCK_INTERVAL = 30;
var EASY;
var currentFourAnswerArray = [123, 123, 123, 123];

export const AI_Initial_suggestion = generateAIInitialArray(TOTAL_TRIAL * AI_success_rate);
export const AI_random = getRandomArray(TOTAL_TRIAL);
export const AI_suggestion = sortArrayAccordingToRandom(AI_Initial_suggestion, AI_random);


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
                $("#resultScan").text("INCORRECT").css("color", "red");
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
                $("#resultScan").text("CORRECT").css("color", "#00b050");
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