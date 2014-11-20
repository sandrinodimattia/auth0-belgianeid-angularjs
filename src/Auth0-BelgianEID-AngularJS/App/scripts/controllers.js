var myApp = angular.module('myApp');

myApp.controller('MsgCtrl', function ($scope, auth) {
  $scope.message = '';

});

myApp.controller('RootCtrl', function (auth, $scope) {
  auth.profilePromise.then(function() {
      $scope.$parent.message = 'Welcome ' + auth.profile.name + '!';
      $scope.$parent.photo = "data:image/gif;base64," + auth.profile['be:fedict:eid:idp:photo'];
  });

  $scope.auth = auth;
});

myApp.controller('LoginCtrl', function (auth, $scope, $cookies, $state) {
  $scope.user = '';
  $scope.pass = '';

  function onLoginSuccess() {
    $scope.$parent.message = '';
    $state.go('root');
    $scope.loading = false;
  }

  function onLoginFailed() {
    $scope.$parent.message = 'invalid credentials';
    $scope.loading = false;
  }
    
  $scope.loginUsingEID = function () {
    $scope.$parent.message = 'loading...';
    $scope.loading = true;
      
    auth.signin({
        popup: true, connection: 'SamlEid',
        popupOptions: { width: 800, height: 450 }
        
    }, onLoginSuccess, onLoginFailed);
  };
});

myApp.controller('LogoutCtrl', function (auth, $scope, $state, store) {
  auth.signout();
  store.remove('profile');
  store.remove('token');
  $scope.$parent.message = '';
  $state.go('login');
});
