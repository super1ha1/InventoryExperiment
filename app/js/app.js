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
            templateUrl: "html/user_info.html"

        })

        .state('scan', {
            url: "/scan",
            templateUrl: "html/scan.html",
            controller: 'trialController'
        })

        .state('truck', {
            url: "/truck",
            templateUrl: "html/truck.html",
            controller: 'trialController'
        })


        .state('state1.list', {
            url: "/list",
            templateUrl: "partials/state1.list.html",
            controller: function($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('state2', {
            url: "/state2",
            templateUrl: "partials/state2.html"
        })
        .state('state2.list', {
            url: "/list",
            templateUrl: "partials/state2.list.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
});