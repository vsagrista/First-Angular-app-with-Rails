// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

angular.module('flapperNews', ['ui.router'])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });
        $urlRouterProvider.otherwise('home');
    }
])


.factory('posts', [

    function() {
        var o = {
            posts: []
        };
        return o;
    }
])
.controller('MainCtrl', [
        '$scope',
        '$stateParams',
        'posts',
        function($scope, $stateParams, posts){
            $scope.posts = posts.posts;
            $scope.post = posts.posts[$stateParams.id];

            $scope.addPost = function() {
                if (!$scope.title || $scope.title === '') {
                    return;
                }
                $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 0,
                    comments: 
                    [
                      {author: 'Joe', body: 'Cool post!', upvotes: 0},
                      {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                    ]
                });
                $scope.title = '';
                $scope.link = '';
            };

            $scope.incrementUpvotes = function(post) {
                post.upvotes += 1
            }
            $scope.addComment = function(){
              if($scope.body === '') { return; }
              $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
              });
              $scope.body = '';
            };
            $scope.title = '';
            $scope.link = '';
        }

]);