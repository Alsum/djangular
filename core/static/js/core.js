var profileEditApp = angular.module('commentsApp', []);


profileEditApp.config(['$httpProvider', '$interpolateProvider',
    function($httpProvider, $interpolateProvider) {
    /* for compatibility with django teplate engine */
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    /* csrf */
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
}]);


profileEditApp.controller('commmentsCtrl', function ($scope, $http) {
    $scope.data = {success: false, teste:"pinzi"};

    function getComments(){
        $http({method: 'GET', url: globals.commentsUrl}).
            success(function(data, status, headers, config) {
                $scope.data.comments = data;
        })
    }

    getComments();

    $scope.removeComment = function(comment){
        $http({method: 'DELETE', url: globals.commentsUrl + comment.id + "/", data: { id: comment.id }}).
        success(function(data, status, headers, config) {
            var index = $scope.data.comments.indexOf(comment);
            if (index != -1) {
                $scope.data.comments.splice(index, 1);
            }
        }).
        error(function(data, status, headers, config) {
            
        });
    }

    $scope.updateComment = function() {
        $http({method: 'POST', url: globals.commentsUrl, data: { title: $scope.data['title'], body: $scope.data['body'] }}).
        success(function(data, status, headers, config) {
            $scope.data['success'] = true;
            getComments();
        }).
        error(function(data, status, headers, config) {
            $scope.data['success'] = false;
        });
    }
});