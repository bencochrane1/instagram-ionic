// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ion-affix', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

// .run(function($httpBackend) {

//   var posts = function() {
//     return [200, [
//       {
//         author: "anna",
//         image: "http://www.fillmurray.com/400/400",
//         liked: false,
//         likes: 56,
//         location: "town",
//         message: "at the town"      
//       },
//       {
//         author: "mary",
//         image: "http://www.fillmurray.com/400/400",
//         liked: false,
//         likes: 87,
//         location: "out of town",
//         message: "at the out of town"      
//       }
//     ], {}]
//   }

//   $httpBackend.whenGET('\/api/posts\/*').respond(posts);

// })

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {

  // $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'UploaderCtrl'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.posts', {
      url: '/posts',
      views: {
        'tab-posts': {
          templateUrl: 'templates/tab-posts.html',
          controller: 'PostsCtrl'
        }
      }
    })
    .state('tab.post-detail', {
      url: '/posts/:postId',
      views: {
        'tab-posts': {
          templateUrl: 'templates/post-detail.html',
          controller: 'PostDetailCtrl'
        }
      }
    })

  .state('tab.login', {
    url: '/login',
    views: {
      'login-modal': {
        templateUrl: 'templates/login-modal.html',
        controller: 'AuthCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/dash');

});
