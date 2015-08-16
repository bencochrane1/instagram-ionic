angular.module('starter.services', [])

// .constant('API_ENDPOINT', 'https://instagram-api-endpoint.herokuapp.com/api')
.constant('API_ENDPOINT', 'http://localhost:8080/api')

.factory('auth', function($http, API_ENDPOINT, $window) {

  var auth = {}

  auth.saveToken = function(token) {
    $window.localStorage['ionic-mean-token'] = token;
  }

  auth.getToken = function() {
    return $window.localStorage['ionic-mean-token'];
  }

  auth.isLoggedIn = function() {
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    }
  }

  auth.register = function(user) {
    var endpoint = API_ENDPOINT + '/register';
    return $http.post(endpoint, user).success(function(data) {
      auth.saveToken(data.token);
    });
  }

  auth.logIn = function(user) {
    var endpoint = API_ENDPOINT + '/login';
    return $http.post(endpoint, user).success(function(data) {
      auth.saveToken(data.token);
    });
  }

  auth.logOut = function() {
    $window.localStorage.removeItem['ionic-mean-token'];
  }

  return auth;

})

.service('Posts', function($q, $http, API_ENDPOINT) {

  this.all = function() {
    var deferred = $q.defer();
    var endpoint = API_ENDPOINT + '/posts';

    $http.get(endpoint)
    .then(function(data) {
      console.log('we got these posts: ', data.data);
      deferred.resolve(data.data);
    })
    .catch(function(data) {
      console.log('we didnt get no posts: ', data);
      deferred.reject();
    })

    return deferred.promise;
  }

  this.like = function(post) {

    var deferred = $q.defer();
    var endpoint = API_ENDPOINT + '/posts/' + post._id + '/like';

    var headerObject = {
      Authorization: 'Bearer ' + auth.getToken() 
    }

    $http.put(endpoint, null, headerObject)
    .then(function() {
      console.log('you like it successfully');
      deferred.resolve();
    });
  }

  this.addNewPost = function(post) {
    console.log('data into service addnewpost: ', post);
    var deferred = $q.defer();
    var endpoint = API_ENDPOINT + '/posts';

    var params = {
      method: 'POST',
      url: endpoint,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Bearer ' + auth.getToken() },
      data: post
    }

    $http(params)
    .then(function(data) {
      console.log('you added this post: ', data);
      deferred.resolve(data);
    })
    .catch(function(data) {
      console.error(data);
      deferred.reject();
    })
    return deferred.promise;
  }
});
