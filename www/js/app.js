// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function ($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
        
        $ionicPlatform.registerBackButtonAction(function (e) {
            $ionicPopup.show({
            template: 'Willst du die Bioindikation-App wirklich schliessen? Alle nicht hochgeladenen oder gespeicherten Daten gehen verloren! ',
            title: 'App schliessen?',
            buttons: [
                {
                    text: 'Ja',
                    type: "button-positive",
                    onTap: function () {
                        ionic.Platform.exitApp();
                    }

                },
                {
                    text: 'Nein',
                    type: 'button-light',

                }]
        })
            e.preventDefault();
            return false;
        }, 101);
        
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"

    })

    .state('tab.home-index', {
        url: '/home',
        views: {
            'home-tab': {
                templateUrl: 'templates/home.html',
                controller: 'MainCtrl'
            }
        }
    })


    .state('tab.tutorial', {
        url: '/tutorial',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/tutorial.html',
                controller: "VideoCtrl"

            }
        }
    })
    
    .state('tab.video1', {
        url: '/video1',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video1.html'

            }
        }
    })
    
    .state('tab.video2', {
        url: '/video2',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video2.html'

            }
        }
    })
    
    .state('tab.video3', {
        url: '/video3',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video3.html'

            }
        }
    })
    
    .state('tab.video4', {
        url: '/video4',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video4.html'

            }
        }
    })
    
    .state('tab.video5', {
        url: '/video5',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video5.html'

            }
        }
    })
    
    .state('tab.video6', {
        url: '/video6',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video6.html'

            }
        }
    })
    
    .state('tab.video7', {
        url: '/video7',
        views: {
            'tutorial-tab': {
                templateUrl: 'templates/video7.html'

            }
        }
    })


    .state('tab.general', {
        url: '/general',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/general.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.general2', {
        url: '/general2',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/general2.html',
                controller: 'MainCtrl'
            }
        }
    })



    .state('tab.river1', {
        url: '/river1',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river1.html',
                controller: 'MainCtrl'

            }
        }
    })

    .state('tab.river2', {
        url: '/river2',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river2.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river3', {
        url: '/river3',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river3.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river4', {
        url: '/river4',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river4.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river5', {
        url: '/river5',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river5.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river6', {
        url: '/river6',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river6.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river7', {
        url: '/river7',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river7.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river8', {
        url: '/river8',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river8.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river9', {
        url: '/river9',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river9.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.river10', {
        url: '/river10',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/river10.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.datenaufnahme', {
        url: '/datenaufnahme',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/datenaufnahme.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.zusammenfassung', {
        url: '/zusammenfassung',
        views: {
            'datenaufnahme-tab': {
                templateUrl: 'templates/zusammenfassung.html',
                controller: 'MainCtrl'

            }
        }
    })


    .state('tab.information', {
        url: '/information',
        views: {
            'information-tab': {
                templateUrl: 'templates/information.html',

            }
        }
    })

    .state('tab.leitfragen', {
        url: '/leitfragen',
        views: {
            'information-tab': {
                templateUrl: 'templates/leitfragen.html'

            }
        }
    })

    .state('tab.auswertung', {
        url: '/auswertung',
        views: {
            'information-tab': {
                templateUrl: 'templates/auswertung.html'

            }
        }
    })

    .state('tab.links', {
        url: '/links',
        views: {
            'information-tab': {
                templateUrl: 'templates/links.html',
                controllers: 'MainCtrl'
            

            }
        }
    })

    ;

    // wenn keiner der tabs erreicht werden kann, fallback auf home-tab.
    $urlRouterProvider.otherwise('/tab/home');

});