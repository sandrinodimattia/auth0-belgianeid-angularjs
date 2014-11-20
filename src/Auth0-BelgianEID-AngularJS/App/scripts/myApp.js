var myApp = angular.module('myApp', [
  'ngCookies', 'auth0', 'ui.router', 'angular-jwt', 'angular-storage'
]);

myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, authProvider, $locationProvider, jwtInterceptorProvider) {

    // For any unmatched url, redirect to /login
    $urlRouterProvider.otherwise('/home');

    // Now set up the states
    $stateProvider
        .state('logout', {
            url: '/logout',
            templateUrl: 'views/logout.html',
            controller: 'LogoutCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('root', {
            url: '/home',
            templateUrl: 'views/root.html',
            controller: 'RootCtrl',
            data: {
                requiresLogin: true
            }
        });


    authProvider.init({
        domain: 'mydomain.auth0.com',
        clientID: 'myid',
        loginState: 'login'
    });

})

.run(function ($rootScope, auth, store, jwtHelper, $state) {
    $rootScope.$on('$locationChangeStart', function() {
        if (!auth.isAuthenticated) {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    auth.authenticate(store.get('profile'), token);
                } else {
                    $state.go('login');
                }
            }
        }

    });
});
