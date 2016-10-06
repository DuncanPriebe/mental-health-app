// Create the angular app with dependencies
var app = angular.module("myApp", [
	"ngRoute",
	"ngAnimate",
	"ngTouch"
])

.config(function($routeProvider) {

	// Set the routes
	$routeProvider

		// The login page
		.when("/login", {
			headerText: "LOGIN",
			headerIcon: "user",
			templateUrl: "partials/login.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The home page
		.when("/home", {
			headerText: "HOME",
			headerIcon: "home",
			templateUrl: "partials/home.html",
			controller: "viewController",
			animate: "slideRight"
		})

		// The Road to Mental Readiness page
		.when("/r2mr", {
			headerText: "R2MR",
			headerIcon: "road",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/r2mr.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The activities page
		.when("/activities", {
			headerText: "ACTIVITIES",
			headerIcon: "flash",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/activities.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The help page
		.when("/help", {
			headerText: "HELP",
			headerIcon: "exclamation-sign",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/help.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The forum page
		.when("/forum", {
			headerText: "FORUM",
			headerIcon: "th-list",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/forum.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The support page
		.when("/support", {
			headerText: "PEER SUPPORT",
			headerIcon: "earphone",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/support.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The medeo page
		.when("/medeo", {
			headerText: "MEDEO",
			headerIcon: "plus",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/medeo.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The leave page
		.when("/leave", {
			headerText: "LEAVE",
			headerIcon: "tasks",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/leave.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The pay page
		.when("/pay", {
			headerText: "PAY",
			headerIcon: "usd",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/pay.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The settings page
		.when("/settings", {
			headerText: "SETTINGS",
			headerIcon: "cog",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/settings.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The about page
		.when("/about", {
			headerText: "ABOUT",
			headerIcon: "info-sign",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/about.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The default page
		.otherwise({
			redirectTo: "/home"
		});
})

// Define routing service
.factory("routeService", function($location, animateService) {
	return {
		loadPage: function(page) {
			$location.path("/" + page);
		}
  	};
})

// Define animate service
.factory("animateService", function($animate) {
	var enabled = false;

	return {
		enable: function() {
			enabled = true;
		},
		disable: function() {
			enabled = false;
		},
		isEnabled: function() {
			return enabled;
		}
  	};
})

// Define animate service
.factory("authenticateService", function() {
	return {
		authenticate: function(username, password, actualUsername, actualPassword) {
			lowerUsername = username.toLowerCase();
			lowerActualUsername = actualUsername.toLowerCase();
			return (lowerUsername == lowerActualUsername && password == actualPassword);
		},
		unauthenticate: function() {
			return false;
		}
  	};
})

// Define slide class
.directive('slideClass', function($route, animateService){
	return {
		link: function(scope, element, attributes) {
			animateService.disable();
			var enterClass = $route.current.animate;
			element.addClass(enterClass);
			scope.$on('$destroy', function() {
				element.removeClass(enterClass);
				element.addClass($route.current.animate);
				setTimeout(animateService.enable, 500);
			});
		}
	}
})

// Define first slide preventer directive
.directive('firstSlidePreventer', function () {
    return {
        templateUrl: "partials/blank.html"
    }
})

// Define header directive
.directive('header', function(animateService) {
    return {
        //restrict: 'A',
        //replace: true,
        //scope: {user: '='},
        templateUrl: "partials/header.html"
        /*
        controller: ['$scope', function ($scope) {
			//$scope.headerMessage = "CSC Mental Health App";
			//animateService.enable();
			//$scope.checkSticky = animateService.isEnabled;
			//$scope.sticky = animateService.isEnabled();
			//console.log($scope.sticky);
        }],
        */
    }
})

// Define footer directive
.directive('footer', function() {
    return {
        templateUrl: "partials/footer.html"
    }
})

// Define view controller
.controller('viewController', function($scope, $route, $http, $location, routeService, authenticateService) {
	// Load user data
	$http.get('lib/user.json')
		.then(function(resource){
			$scope.user = resource.data;
		});

	// Set header and footers
	$scope.headerText = $route.current.headerText;
	$scope.headerIcon = $route.current.headerIcon;
	$scope.footerText = $route.current.footerText;
	$scope.footerIcon = $route.current.footerIcon;
	$scope.footerLink = $route.current.footerLink;

	// Load route service function
	$scope.loadPage = routeService.loadPage;

	// Load authenticate function
	$scope.authenticate = function(page) {
		$scope.authenticated = authenticateService.authenticate($scope.username, $scope.password, $scope.user.username, $scope.user.password);
		if ($scope.authenticated) {
			$scope.loadPage(page);
		} else {
			alert("Invalid credentials. Please try again.");
		}
	}

	// Load unauthenticate function
	$scope.unauthenticate = function() {
		$scope.authenticated = authenticateService.unauthenticate();
		$scope.loadPage("login");
	}

	$scope.getUser = function() {
		return $scope.user;
	}
});