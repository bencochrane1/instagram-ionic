angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('ChatDetailCtrl', function($scope, $stateParams, Posts) {
  $scope.post = Posts.get($stateParams.postId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('AuthCtrl', function($scope, auth, $ionicModal) {
    $scope.user = {
        username: '',
        password: ''        
    };


    alert('we are in the auth controller')
    // auth.isLoggedIn();
    // console.log('are they logged in? ', auth.isLoggedIn());

    $scope.isLoggedIn = false;

    $ionicModal.fromTemplateUrl('templates/login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openLoginModal = function() {
        $scope.modal.show();
    };

    $scope.closeLoginModal = function() {
        $scope.modal.hide();
        $scope.user = {
            username: '',
            password: ''
        }    
    }; 

    if (!$scope.isLoggedIn) {
        $scope.openLoginModal();
    }

    $scope.register = function(user) {
        auth.register(user)
        .then(function() {
            console.log('you registered successfully');
            $scope.closeLoginModal();
        })

        .error(function(error) {
            $scope.error = error;
            console.log('error registering');
        })
    }

    $scope.logIn = function(user) {
        auth.logIn(user)
        .then(function() {
            console.log('you logged in successfully');
            $scope.closeLoginModal();
        })

        .error(function(error) {
            $scope.error = error;
            console.log('error logging in');
        })
    }
})


.controller('PostsCtrl', function($scope, Posts, $stateParams, $ionicModal) {
    

    $scope.getAllPosts = function() {
        Posts.all()
        .then(function(posts) {
            $scope.posts = posts;
        })
    }

    $scope.getAllPosts();
   
    $scope.likePost = function(post) {
        Posts.like(post)
        .then(function() {
            console.log('its back at the controller')
            $scope.getAllPosts();
        })
    }

    $scope.remove = function(chat) {
        Posts.remove(post);
    };


})

.controller('UploaderCtrl', function($scope, $ionicModal, $ionicLoading, Posts, auth, $cordovaCamera, $timeout, $cordovaImagePicker) {


    $scope.user = {
        username: '',
        password: ''        
    };


    console.log('we are in the auth controller');
    // auth.isLoggedIn();
    // console.log('are they logged in? ', auth.isLoggedIn());
    $scope.loginModal = null;
    $scope.isLoggedIn = false;

    $ionicModal.fromTemplateUrl('templates/login-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    $scope.openLoginModal = function() {
        $scope.loginModal.show();
    };

    $scope.closeLoginModal = function() {
        $scope.loginModal.hide();
        $scope.user = {
            username: '',
            password: ''
        }    
    }; 

    if (!$scope.isLoggedIn) {
        $timeout(function() {
            $scope.openLoginModal();
        }, 1000);
    }

    $scope.register = function(user) {
        auth.register(user)
        .then(function() {
            console.log('you registered successfully');
            $scope.closeModal();
        })

        // .error(function(error) {
        //     $scope.error = error;
        //     console.log('error registering');
        //     $scope.closeModal();
        // })
    }

    $scope.logIn = function(user) {
        auth.logIn(user)
        .then(function() {
            console.log('you logged in successfully');
            $scope.closeModal();
        })

        .error(function(error) {
            $scope.error = error;
            console.log('error logging in');
            $scope.closeModal();
        })
    }


    $scope.modal = null;

    $scope.post = {
    author: '',
    message: ''
    }

    $ionicModal.fromTemplateUrl('templates/upload-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openUploaderModal = function() {
        $scope.modal.show();
    };

    $scope.closeUploadModal = function() {
        $scope.modal.hide();
        $scope.post = {
            author: '',
            message: ''
        }    
    }; 

    $scope.getPhoto = function() {
        Camera.getPicture()
        .then(function(imageURI) {
            console.log(imageURI);
        }, function(err) {
            console.log('theres an error loading the image')
        })
    }


    $scope.getAllImages = function() {
        var options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 80
        };

        $cordovaImagePicker.getPictures(options)
        .then(function (results) {
            $scope.images = results;
            console.log('all the images: ', $scope.images);
            $scope.theImage = results[0]
            console.log('the image: ', $scope.theImage)
          // for (var i = 0; i < results.length; i++) {
          //   console.log('Image URI: ' + results[i]);
          // }
        }, function(error) {
          // error getting photos
        });
    }

    // $timeout(function() {
    //     console.log('the images are ready!')
    //     $scope.getAllImages();

    // }, 5000);




    // $scope.takePicture = function() {
    //     var options = { 
    //         quality : 75, 
    //         destinationType : Camera.DestinationType.DATA_URL, 
    //         sourceType : Camera.PictureSourceType.CAMERA, 
    //         allowEdit : true,
    //         encodingType: Camera.EncodingType.JPEG,
    //         targetWidth: 300,
    //         targetHeight: 300,
    //         popoverOptions: CameraPopoverOptions,
    //         saveToPhotoAlbum: false
    //     };
 
    //     $cordovaCamera.getPicture(options).then(function(imageData) {
    //         $scope.imgURI = "data:image/jpeg;base64," + imageData;
    //     }, function(err) {
    //         console.log('error trying to take this photo');
    //     });
    // }



    $scope.addNewPost = function(post) {

        console.log('post data into form: ', post);
        if (!post.author || !post.message || !post.location) {
            return;
        }        

        post.image = 'http://www.fillmurray.com/400/400';
        Posts.addNewPost(post)
        .then(function() {
            Posts.all();
            $scope.closeUploadModal();
            $scope.post = {
                author: '',
                message: '',
                location: ''
            }           
        })
        .catch(function(data) {
            console.log('couldnt add this post :(', data)
            Posts.all();
            $scope.closeUploadModal();                
            $scope.post = {
                author: '',
                message: '',
                location: ''
            }                           
        });
    }
})