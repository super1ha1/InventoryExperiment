'use strict';
var myApp = angular.module('myApp', ['ui.router', 'myApp.controller']);
myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/intro");
    //
    // Now set up the states
    $stateProvider
        .state('intro', {
            url: "/intro",
            templateUrl: "html/introduction.html"
        })

        .state('user_info', {
            url: "/user",
            templateUrl: "html/user_info.html",
            controller: 'UserController'

        })

        .state('scan', {
            url: "/scan",
            templateUrl: "html/scan_easy.html",
            controller: 'trialController'
        })

        .state('scan_hard', {
            url: "/scan2",
            templateUrl: "html/scan_hard.html",
            controller: 'trialHardController'
        })

        .state('truck', {
            url: "/truck",
            templateUrl: "html/truck.html",
            controller: 'trialController'
        })

        .state('test', {
            url: "/test",
            templateUrl: "html/test.html",
            controller: 'testController'
        })

});
Parse.initialize("8tR4QlSj9yIvErjnMHCvsielA5I3W7iQ5h6ACs4O", "LEPVlOIFyqPDHA8UyWskmjc0A9MyJ08pbyZbLlLn");

//var TestObject = Parse.Object.extend("TestObject");
//var testObject = new TestObject();
//testObject.save({foo: "bar"}).then(function(object) {
//    alert("yay! it worked");
//});
