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

		// The assessment page
		.when("/assessment", {
			headerText: "ASSESSMENT",
			headerIcon: "stats",
			footerText: "Home",
			footerIcon: "home",
			footerLink: "home",
			templateUrl: "partials/assessment.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The mood assessment page
		.when("/assessment/mood", {
			headerText: "MOOD ASSESSMENT",
			headerIcon: "dashboard",
			footerText: "Assessment Home",
			footerIcon: "stats",
			footerLink: "assessment",
			templateUrl: "partials/assessment/mood.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The sleep assessment page
		.when("/assessment/sleep", {
			headerText: "SLEEP ASSESSMENT",
			headerIcon: "adjust",
			footerText: "Mood Assessment",
			footerIcon: "dashboard",
			footerLink: "assessment/mood",
			templateUrl: "partials/assessment/sleep.html",
			controller: "viewController",
			animate: "slideLeft"
		})


		// The attitude assessment page
		.when("/assessment/attitude", {
			headerText: "ATTITUDE ASSESSMENT",
			headerIcon: "dashboard",
			footerText: "Sleep Home",
			footerIcon: "adjust",
			footerLink: "assessment/sleep",
			templateUrl: "partials/assessment/attitude.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The stress assessment page
		.when("/assessment/behavior", {
			headerText: "BEHAVIOR ASSESSMENT",
			headerIcon: "glass",
			footerText: "Attitude Assessment",
			footerIcon: "dashboard",
			footerLink: "assessment/attitude",
			templateUrl: "partials/assessment/behavior.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The stress assessment page
		.when("/assessment/physical", {
			headerText: "PHYSICAL ASSESSMENT",
			headerIcon: "heart",
			footerText: "Behavior Assessment",
			footerIcon: "glass",
			footerLink: "assessment/behavior",
			templateUrl: "partials/assessment/physical.html",
			controller: "viewController",
			animate: "slideLeft"
		})

		// The result assessment page
		.when("/assessment/result", {
			headerText: "ASSESSMENT RESULTS",
			headerIcon: "stats",
			footerText: "Assessment Home",
			footerIcon: "stats",
			footerLink: "assessment",
			templateUrl: "partials/assessment/result.html",
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
			headerIcon: "warning-sign",
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
			redirectTo: "/home"});
})

// Define routing service
.factory("routeService", function($location, animateService) {
	return {
		loadPage: function(page) {
			$location.path("/" + page);
		},
		loadURL: function(URL) {
			window.location.href = URL;
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

// Define assessment service
.factory("assessmentService", function() {
	return {
		getMentalState: function(moodValue, sleepValue, attitudeValue, behaviorValue, physicalValue) {
			var mentalStates = {
				healthy: {
					name: "Healthy",
					level: 1,
					recommendations: [
						{
							text: "Go Outside",
							link: "http://www.env.gov.bc.ca/bcparks/"
						},
						{
							text: "Contact CMHA",
							link: "http://www.cmha.bc.ca/documents/improving-mental-health/"
						}
					]
				},
				reacting: {
					name: "Reacting",
					level: 2,
					recommendations: [
						{
							text: "Talk to a Friend",
							link: ""
						},
						{
							text: "Contact Peer Support",
							link: ""
						}
					]
				},
				injured: {
					name: "Injured",
					level: 3,
					recommendations: [
						{
							text: "Talk to a Counsellor",
							link: ""
						},
						{
							text: "Contact a Psychiatrist",
							link: ""
						}
					]
				},
				ill: {
					name: "Ill",
					level: 4,
					recommendations: [
						{
							text: "Connect to EAP",
							link: ""
						},
						{
							text: "Talk to Your Doctor",
							link: ""
						}
					]
				}
			}
			var total = moodValue + sleepValue + attitudeValue + behaviorValue + physicalValue;
			console.log(moodValue, sleepValue, attitudeValue, behaviorValue, physicalValue);
			var average = total / 5;
			console.log(average);
			if (average <= 1) {
				return mentalStates["healthy"];
			} else if (average > 1 && average < 2) {
				return mentalStates["reacting"];
			} else if (average >= 2 && average < 3) {
				return mentalStates["injured"];
			} else if (average >= 3 && average < 4) {
				return mentalStates["ill"];
			} else {
				return null;
			}
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
.controller('viewController', function($scope, $rootScope, $route, $http, $location, routeService, authenticateService, assessmentService) {
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

	// Load route service functions
	$scope.loadPage = routeService.loadPage;
	$scope.loadURL = routeService.loadURL;

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

	// Return user
	$scope.getUser = function() {
		return $scope.user;
	}

	
	// Load assessment functions
	$scope.setMood = function(value) {
		$rootScope.moodValue = value;
	}

	$scope.setSleep = function(value) {
		$rootScope.sleepValue = value;
	}

	$scope.setAttitude = function(value) {
		$rootScope.attitudeValue = value;
	}

	$scope.setBehavior = function(value) {
		$rootScope.behaviorValue = value;
	}

	$scope.setPhysical = function(value) {
		$rootScope.physicalValue = value;
	}

	$scope.setMentalState = function() {
		$scope.mentalState = assessmentService.getMentalState(
			$rootScope.moodValue,
			$rootScope.sleepValue,
			$rootScope.attitudeValue,
			$rootScope.behaviorValue,
			$rootScope.physicalValue
		);
	}
});