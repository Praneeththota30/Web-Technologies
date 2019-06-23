angular.module('myapp', [])
    .controller('mycontroller', function($scope, $http,$log) {
        $scope.data = {
            model: null,
            availableOptions: [
                {id: 'en', name: 'English'},
                {id: 'hi', name: 'Hindi'},
                {id: 'es', name: 'Spanish'},
                {id:'ar', name: 'Arabic'},
                {id:'te', name: 'Telugu'},
                {id:'fr', name:'French'},
                {id:'ta', name:'Tamil'}

            ]
        };
        $scope.data1 = {
            model: null,
            availableOptions: [
                {id: 'en', name: 'English'},
                {id: 'hi', name: 'Hindi'},
                {id: 'es', name: 'Spanish'},
                {id:'ar', name: 'Arabic'},
                {id:'te', name: 'Telugu'},
                {id:'fr', name:'French'},
                {id:'ta', name: 'Tamil'}
            ]
        };
        $scope.translate = function()  {
            console.log("kdjfnm");
            var successCallBack = function (response) {
                console.log("SUCCESS");
                console.log(response.data);
                $scope.text = response.data.text[0];
            };
            var failureCallBack = function (response) {
                console.log("FAIL");
                $scope.error = response.data;
                $log.info(response);
            };
            var sourceText = document.getElementById("SourceLanguage").value;
            console.log(sourceText);
            console.log();
            console.log();
            $http({
                method: 'GET',
                url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190618T033951Z.0301f3e85e340178.03480fd3d44890a5a5473301683128a3e9855be5&text=' + sourceText + '&lang='+$scope.data.model+'-'+$scope.data1.model+'&[format=plain]&[options=1]&[callback=set]'
            })
                .then(successCallBack, failureCallBack);
        };
    });