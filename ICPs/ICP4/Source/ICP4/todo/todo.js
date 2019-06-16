var app = angular.module('myApp', []);
app.controller('todoCtrl', function($scope) {
    $scope.todoList = [{todoText:'Wake early', done:false}];

    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, done:false});
        console.log($scope.todoList);
        $scope.todoInput = "";
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
        console.log($scope.todoList);
    };
    $scope.remaining =function()
    {
        var count = 0;
        angular.forEach($scope.todoList, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    }

});
