/**
 * Created by karthik on 7/14/17.
 */
var myapp = angular.module('app',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('addController',function($scope,$http){
    $scope.addbook = function(){
        console.log($scope.bookName);

        var dataParams = {
            'bookName' : $scope.bookName,
            'authorName' : $scope.authorName,
            'noOfCopies' : $scope.noOfCopies,
            'edition' : $scope.edition,
            'ISBN':$scope.ISBN
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8087/create',dataParams);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message in add book: " + JSON.stringify({data: data}));
           // return req.send(error);
        });
    };
});


myapp.controller('homeController',function($scope,$http){

    $scope.getData=function(){
        var req = $http.get('http://127.0.0.1:8087/get');
        req.success(function(data, status, headers, config) {
            $scope.bookList = data;
            console.log(data+"hi");
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message in get: " + JSON.stringify({data: data}));
            //return req.send(error);

        });

    };

    $scope.delete = function(id,callback){
        var req= $http.get('http://127.0.0.1:8087/delete/'+id);

            req.success(function(data){
                console.log("Successfully deleted");
                $scope.getData();
            });

        req.error(function(data, status, headers, config) {
            alert( "failure message in get: " + JSON.stringify({data: data}));
            //return req.send(error);

        });
    };


    $scope.update = function(book,callback){

        console.log(book);
        var dataParams = {
            'bookName' : book.bookName,
            'authorName' : book.authorName,
            'ISBN': book.ISBN
        };
        $http.post('http://127.0.0.1:8081/update/'+book._id, dataParams)
            .success(function(data, status, headers, config){
                alert("Successfully updated");
                // $scope.getData();
            });
        alert('Successfully Updated');
    }

});

