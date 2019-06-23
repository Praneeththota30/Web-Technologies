        // 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=CJCZQ01R05XJ1F0KTX0XWPHZQU4WYKBWOOZKCI3JFQ1FDWPT" +
                    "&client_secret=IMGPRWDGWYAXBRMARGZZW00KI0AYPZQPZU5KZ1JLXP2IWAKJ" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery +
                    "&categoryId=4d4b7105d754a06374d81259");

                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        // Tie an array named "venueList" to the scope which is an array of objects.
                        // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                        // Marks will be distributed between logic, implementation and UI
                        $scope.venueList = {};
                        $scope.venueList = data.response.venues;
                        console.log($scope.venueList);
                        return true;

                    }
                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                    return false;
                });
            }
        }
    });
