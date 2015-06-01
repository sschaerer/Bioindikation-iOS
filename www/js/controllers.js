angular.module('starter.controllers', [])


.controller('VideoCtrl', function ($scope, $log, $document, $ionicPlatform, $ionicPopup) {

    //Videoplayer js

    $scope.video1 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video1.mp4");
    };

    $scope.video2 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video2.mp4");
    };

    $scope.video3 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video3.mp4");
    };

    $scope.video4 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video4.mp4");
    };

    $scope.video5 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video5.mp4");
    };

    $scope.video6 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video6.mp4");
    };

    $scope.video7 = function () {

        VideoPlayer.play("file:///android_asset/www/mov/video7.mp4");
    };

})



.controller('MainCtrl', function ($scope, $log, $document, $cordovaGeolocation, $ionicPopup, $ionicPlatform, $ionicHistory, $cordovaInAppBrowser, allgDatenService, landschaftService, insectDatenService) {

    //Beim Laden des Apps wird überprüft, ob noch Daten in der localStorage vorhanden sind. 

    $scope.uploadPopup = function () {

        $ionicPopup.show({
            template: 'In der App sind noch Daten von einer vergangenen Untersuchung gespeichert. Wollen Sie diese jetzt auf das WebGIS hochladen?',
            title: 'Hochladen der Daten',
            scope: $scope,
            buttons: [
                {
                    text: 'Ja',
                    type: "button-positive",
                    onTap: function () {
                        $scope.addFeatureSpaeter()
                    }

                },
                {
                    text: 'Nein',
                    type: 'button-light',

                }]
        });
    };

    $scope.checkLocalStorage = function () {

        if (localStorage.getItem("counter") === null) {

            localStorage.clear();

            //Sind noch Daten in der localStorage vorhanden, erscheint ein PopUp, der User kann entscheiden, ob er die Daten nun hochladen will oder nicht.

        } else {
            $scope.uploadPopup();
        }
    };

    //Services zum Speichern der Daten werden bereitgestellt --> 
    //auf Daten in Services kann templateübergreifend zugegriffen werden

    $scope.landschaft = landschaftService;
    $scope.allgemeineDaten = allgDatenService;


    //Datum und Uhrzeit werden ermittelt und gespeichert

    $scope.getDate = function () {

        var d = new Date();
        allgDatenService.CreationDate = d.getTime();

        $log.log(allgDatenService.CreationDate);
    };

    // Standortdaten werden ermittelt

    $scope.getPosition = function () {

        var posOptions = {
            timeout: 5000,
            enableHighAccuracy: true
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.lat = position.coords.latitude
                $scope.long = position.coords.longitude

                $log.log($scope.lat + "," + $scope.long)

                allgDatenService.lat = $scope.lat;
                allgDatenService.long = $scope.long;

                $log.log(allgDatenService.lat);



                $log.log(allgDatenService.rivername);

                window.location.href = "#/tab/river1";

            }, function (err) {

                //Popup erscheint, wenn GPS nicht eingeschaltet ist.

                $ionicPopup.show({
                    template: 'Bitte schalte deine GPS-Verbindung ein, damit der Standort des Gerätes ermittelt werden kann. Falls du kein GPS-Signal herstellen kannst, gib die Koordinaten manuell ein.',
                    title: 'GPS einschalten',
                    buttons: [
                        {
                            text: 'Nochmals versuchen',
                            type: "button-positive",
                            },

                        {
                            text: 'manuelle Eingabe',
                            type: "button-positive",
                            onTap: function () {

                                window.location.href = "#/tab/general2"

                            }

                        }
                    ]
                })
            })

    };

    // Speichern der allgemeinen Daten im allgDatenService
    $scope.allgemeinSpeichern = function (rivername, organisation, comments, lat, long) {

        allgDatenService.rivername = rivername;
        allgDatenService.organisation = organisation;
        allgDatenService.comments = comments;
        allgDatenService.lat = lat;
        allgDatenService.long = long;

        $log.log("Service: " + allgDatenService.rivername);
        $log.log("Breitengrad: " + allgDatenService.lat);

    };

    //speichert einen Wert value (1-3) in den landschaftService

    $scope.speichern = function (value) {
        landschaftService.push(value);
        $log.log(landschaftService);
    };

    //letzter Wert in landschaftService wird gelöscht --> 
    //wird gebraucht, wenn Zurück-Button gedrückt wird.

    $scope.loeschenLandschaft = function () {
        landschaftService.pop();
        $log.log(landschaftService);
    };

    //Durchschnitt der landschaftsökologischen Gewässerbeurteilung wird berechnet

    $scope.landschaftIndex = function () {
        $scope.total = 0;
        for (var i = 0; i < $scope.landschaft.length; i++) {
            $scope.total += $scope.landschaft[i];
        };

        $scope.landschaftIndex = $scope.total / $scope.landschaft.length;

        //Wert wird auf zwei Kommastellen gerundet und in AllgDatenService gespeichert

        allgDatenService.landscape_eco_number = Math.round($scope.landschaftIndex * 100) / 100;

        $log.log("Durchschnitt: " + allgDatenService.landscape_eco_number);

        //Speicherung der Landschaftsök. Gewässerbeurteilung als Text

        if (allgDatenService.landscape_eco_number >= 2.5 && allgDatenService.landscape_eco_number <= 3) {
            allgDatenService.LandscapeEcology = "artificial (2.5 - 3.0)";
        }
        if (allgDatenService.landscape_eco_number >= 2 && allgDatenService.landscape_eco_number < 2.5) {
            allgDatenService.LandscapeEcology = "strongly obstructed (2.0 - 2.4)"
        }
        if (allgDatenService.landscape_eco_number >= 1.5 && allgDatenService.landscape_eco_number < 2) {
            allgDatenService.LandscapeEcology = "obstructed (1.5 - 1.9)"
        }
        if (allgDatenService.landscape_eco_number >= 1 && allgDatenService.landscape_eco_number < 1.5) {
            allgDatenService.LandscapeEcology = "natural (1.0 - 1.4)"
        }
    };





    //Services zur Speicherung des SaprobienIndex werden bereitgestellt.

    $scope.saprobienIndex = insectDatenService;
    $scope.insectDatenEingabe = [];
    $scope.insectIndex = 0;

    //Die Funktion insectDatenSpeichern speichert die Werte für die gefundenen Anzahl Arten 
    $scope.insectDatenSpeichern = function () {

        insectDatenService = $scope.insectDatenEingabe;

        //summeInsect berechnet die Anzahl verschiedener Arten 
        $scope.summeInsect = 0;
        for (var i = 0; i < $scope.insectDatenEingabe.length; i++) {
            $scope.summeInsect += $scope.insectDatenEingabe[i];
        };

        // insectIndex berechnet die anspruchsvollste gefundene Art anhand der im Array eingetragenen Daten 
        for (var i = 0; i < $scope.insectDatenEingabe.length; i++) {
            if ($scope.insectDatenEingabe[i] > 0) {

                // bei den drei anspruchsvollsten Arten muss unterschieden werden, ob nur eine Art gefunden wurde oder mehr als eine. 
                // In der Auswertung wird deshalb hier für nur eine gefundene Art zum gespeicherten Index i eine 8 addiert. 
                if (i <= 2 && $scope.insectDatenEingabe[i] === 1) {
                    $scope.insectIndex = i + 8;
                } else {
                    $scope.insectIndex = i;
                }
                break;

            };
        };

        //für alle Fälle mit mehr als 20 gefundenen Arten (unwahrscheinlich) wird summeInsect als 20 definiert. 
        if ($scope.summeInsect >= 20) {
            $scope.summeInsect = 20;
        }

        //fur alle Fälle mit weniger als 2 gefundenen Arten (sehr unwahrscheinlich) wird summeInsect auf 2 gesetzt.

        if ($scope.summeInsect < 2) {
            $scope.summeInsect = 2;
        }

        //aus Gründen der Auswertung nötige Anpassung der Anzahl gefundenen Arten
        $scope.summeInsect = $scope.summeInsect - 2;


        // Matrix zur Berechnung des Saprobienindex --> aufgrund der Anzahl ausgefüllter Felder 
        // (also insetIndex) gelangt man zur entsprechenden Stelle in der Matrix
        // Die Anzahl gefundener Arten (also summeInsect) ergibt einen Wert von 
        // 1 - unbelastet bis 7 - übermässig belastet.
        $scope.matrix = new Array();
        $scope.matrix[0] = new Array(3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1);
        $scope.matrix[1] = new Array(4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2);
        $scope.matrix[2] = new Array(5, 5, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2);
        $scope.matrix[3] = new Array(5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3);
        $scope.matrix[4] = new Array(6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 3, 3);
        $scope.matrix[5] = new Array(6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4);
        $scope.matrix[6] = new Array(7, 7, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4);
        $scope.matrix[7] = new Array(7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4);
        $scope.matrix[8] = new Array(4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1);
        $scope.matrix[9] = new Array(4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2);
        $scope.matrix[10] = new Array(5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3);


        //$log.log("InsectIndex " + $scope.insectIndex);
        //$log.log("SummeInsect " + $scope.summeInsect);


        //$log.log("Matrix " + $scope.matrix[$scope.insectIndex][$scope.summeInsect]);


        //Array zur Definition der Namen des Saprobienindex
        $scope.indexName = ["unpolluted - I", "slightly polluted - I-II", "moderately polluted - II", "seriously polluted - II-III", "heavily polluted - III", "very heavily polluted - III-IV", "excessively polluted - IV"];


        //Hilfsvariable hilfsindex zur Berechnung der Namen (da das erste Element in einem Array immer dem Wert 0 entspricht)
        $scope.hilfsindex = $scope.matrix[$scope.insectIndex][$scope.summeInsect] - 1;


        //Speicherung des Saprobienindex als Text und Nummer im AllgDatenService
        allgDatenService.BioWaterQuality = $scope.indexName[$scope.hilfsindex];


    };


    //löscht aufgenommene Insektendaten, wird gebraucht, wenn zurück-Button bei der Zusammenfassung gedrückt wird.

    $scope.loeschenIndex = function () {
        while (insectDatenService.length > 0) {
            insectDatenService.pop();
        };
    };


    require([
    "esri/layers/FeatureLayer",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Geometry",
    "esri/SpatialReference"

  ], function (FeatureLayer, Graphic, Point, Geometry, SpatialReference) {

        var featureLayerUrl1 = "http://services1.arcgis.com/46913CWHRFmfQUln/ArcGIS/rest/services/RunningWaters_20141201/FeatureServer/0";

        var featureLayer1 = new FeatureLayer(featureLayerUrl1);

        $scope.addFeatureJetzt = function () {

            //create a graphic
            var pt = new Point(allgDatenService.long, allgDatenService.lat, new SpatialReference({
                wkid: 4326
            }));
            var attr = {
                "rivername": allgDatenService.rivername,
                "organisation": allgDatenService.organisation,
                "comments": allgDatenService.comments,
                "BioWaterQuality": allgDatenService.BioWaterQuality,
                "landscape_eco_number": allgDatenService.landscape_eco_number,
                "LandscapeEcology": allgDatenService.LandscapeEcology,
                "first_date": allgDatenService.CreationDate,
                "first_user": "PHBern_globe",
                "last_date": allgDatenService.CreationDate,
                "last_user": "PHBern_globe"

            };

            var addGraphic = new Graphic(pt, null, attr, null);

            $log.log(pt);
            $log.log(attr);
            $log.log(addGraphic);

            //you can add more attributes to the graphic
            /*var d = new Date();
addGraphic.attributes.Updated_By = loginName;
addGraphic.attributes.Updated_Date = d.getTime();
*/

            //Using your feature layer add the graphic
            featureLayer1.applyEdits([addGraphic], null, null,
                function () {


                    $ionicPopup.show({
                        template: 'Deine Daten wurden hochgeladen! Vielen Dank für Deinen Beitrag zur Bioindikation Fliessgewässer.',
                        title: 'Datenupload erfolgreich',
                        scope: $scope,
                        buttons: [
                            {
                                text: 'OK',
                                type: "button-positive",
                                onTap: function () {
                                    $scope.allesLoeschen();
                                }
                }]
                    });

                    //updateGrid();
                }, function () {
                    $log.log("Uploadfehler");
                });

        };

        //Funktion zur Speicherung der Daten in der localStorage

        $scope.storage = function () {

            //Speicherung eines Counters, womit die zu speichernden Daten indexiert werden. 

            var counter = 0;

            //falls noch kein Element im counter gespeichert ist (erste oder neue Datenaufnahmen), wird der counter auf 0 gesetzt.

            if (localStorage.getItem("counter") === undefined) {

                localStorage.setItem("counter", 0)
            } else {


                counter = localStorage.getItem("counter");

            };
            counter++;

            //Speicherung des counters
            localStorage.setItem("counter", counter);

            var pt = new Point(allgDatenService.long, allgDatenService.lat, new SpatialReference({
                wkid: 4326
            }));

            var pt_key = "pt_" + counter;

            var attr = {
                "rivername": allgDatenService.rivername,
                "organisation": allgDatenService.organisation,
                "comments": allgDatenService.comments,
                "BioWaterQuality": allgDatenService.BioWaterQuality,
                "landscape_eco_number": allgDatenService.landscape_eco_number,
                "LandscapeEcology": allgDatenService.LandscapeEcology,
                "first_date": allgDatenService.CreationDate,
                "first_user": "PHBern_globe",
                "last_date": allgDatenService.CreationDate,
                "last_user": "PHBern_globe"
            };

            var attr_key = "attr_" + counter;


            //Speicherung der von pt und attr als key-value Paare in der localStorage
            //der nächste aufgenommene Datensatz weisst dann den den Index counter + 1 auf

            localStorage.setItem(pt_key, JSON.stringify(pt));
            localStorage.setItem(attr_key, JSON.stringify(attr));

            $log.log(JSON.stringify(pt));
            $log.log(JSON.stringify(attr));

            $ionicPopup.show({
                template: 'Deine Daten wurden gespeichert. Du kannst nun eine neue Datenaufnahem beginnen. Beim nächsten Öffnen der App kannst du die Daten auf das WebGIS hochladen.',
                title: 'Daten wurden gespeichert',
                scope: $scope,
                buttons: [
                    {
                        text: 'OK',
                        type: "button-positive",
                        onTap: function () {
                            $scope.allesLoeschen();
                        }
                }]
            });








        };



        // Funktion zum Upload der Daten (Später)



        $scope.addFeatureSpaeter = function () {



            //for-Schleife, in der alle Werte von 0 bis counter ausgelesen und hochgeladen werden

            var counter = localStorage.getItem("counter");


            for (var i = 1; i <= counter; i++) {

                // keys werden zusammengesetzt

                var pt_key = "pt_" + i;
                var attr_key = "attr_" + i;

                //Auslesen der Daten aus der localStorage

                var pt = new Point(JSON.parse(localStorage.getItem(pt_key)));
                var attr = JSON.parse(localStorage.getItem(attr_key));

                $log.log(pt);
                $log.log(attr);


                //create a graphic


                var addGraphic = new Graphic(pt, null, attr, null);

                $log.log(addGraphic);


                //you can add more attributes to the graphic
                /*var d = new Date();
addGraphic.attributes.Updated_By = loginName;
addGraphic.attributes.Updated_Date = d.getTime();
*/

                //Using your feature layer add the graphic

                featureLayer1.applyEdits([addGraphic], null, null,
                    function () {

                        $log.log("hochgeladen")


                    }, function () {
                        $log.log("Uploadfehler");
                    })

            };
            $scope.dankePopup();

        };
    });

    $scope.dankePopup = function () {
        $ionicPopup.show({
            template: 'Deine Daten wurden hochgeladen! Vielen Dank für Deinen Beitrag zur Bioindikation Fliessgewässer.',
            title: 'Datenupload erfolgreich',
            scope: $scope,
            buttons: [
                {
                    text: 'OK',
                    type: "button button-positive",
                    onTap: function () {
                        $scope.allesLoeschen();
                        localStorage.clear();
                    }
                }]
        });

    };

    //Abbrechen-Button

    $scope.Abbrechen = function () {

        $ionicPopup.show({
            template: 'Willst du die Datenaufnahme wirklich abbrechen? Alle Daten gehen dabei verloren!',
            title: "Wirklich Abbrechen?",
            scope: $scope,
            buttons: [
                {
                    text: "Nein",
                    button: "button button-positive",
                },
                {
                    text: "Ja",
                    button: "button button-positive",
                    onTap: function () {
                        $scope.allesLoeschen();
                    }
                }]
        })
    };

    $scope.allesLoeschen = function () {

        while (allgDatenService.length > 0) {
            allgDatenService.pop();
        };
        while (landschaftService.length > 0) {
            landschaftService.pop();
        };
        while (insectDatenService.length > 0) {
            insectDatenService.pop();
        };

        $log.log(landschaftService);

        $ionicHistory.clearHistory();
        window.location.href = "#/tab/home";
    };



    //Öffnen von Links via Javascript in nativem Browser

    $scope.openLink = function (e) {

        var URL = document.getElementById(e).name;

        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        $cordovaInAppBrowser.open(URL, '_system', options)


    };

});