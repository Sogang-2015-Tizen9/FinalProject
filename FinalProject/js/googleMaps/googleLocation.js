/*******************************************************************************
 * @author Tomasz Scislo <<ahref='mailto:t.scislo@samsung.com'>t.scislo@samsung.com</a>>
 * @author Lukasz Jagodzinski <<ahref='mailto:l.jagodzinsk@samsung.com'>l.jagodzinsk@samsung.com</a>>
 * Copyright (c) 2013 Samsung Electronics All Rights Reserved.
 ******************************************************************************/

var googleLocation = (function ($, logger, view, network, ajax) {
    var appKey, internetConnectionCheck;

    appKey = "AIzaSyBSoT1wqRczujvxKtreO6O7a4RJ-GF61o4";

    /**
     * Asynch method to check the network connection
     * @private
     */
    internetConnectionCheck = function () {
        network.isInternetConnection(function (isConnection) {
            if (!isConnection) {
                view.hideLoader();
                view.showPopup("No Internet connection. Application may not work properly.");
            }
        });
    };
    return {
        /**
         * Provides initialization for the app
         */
        initialize: function () {
            var that = this;
            ajax();
            $.extend($.mobile, {
                defaultPageTransition: "flip",
                loadingMessageTextVisible: true,
                pageLoadErrorMessage: "Unable to load page",
                pageLoadErrorMessageTheme: "d",
                touchOverflowEnabled: true,
                loadingMessage: "Please wait...",
                allowCrossDomainPages: true,
                ajaxEnabled: false
            });
            
            internetConnectionCheck();
            
            return that.createMapForGivenContainer("map_canvas", {
                zoom: 6,
                lat: 37.3359,
                lon: 126.5840,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            view.getScreenHeight();
            view.getScreenWidth();
        },
        initializePolice: function () {
            var that = this;
            ajax();
            $.extend($.mobile, {
                defaultPageTransition: "flip",
                loadingMessageTextVisible: true,
                pageLoadErrorMessage: "Unable to load page",
                pageLoadErrorMessageTheme: "d",
                touchOverflowEnabled: true,
                loadingMessage: "Please wait...",
                allowCrossDomainPages: true,
                ajaxEnabled: false
            });
            
            internetConnectionCheck();
            
            return that.createMapForGivenContainer("map_police", {
                zoom: 6,
                lat: 37.3359,
                lon: 126.5840,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            view.getScreenHeight();
            view.getScreenWidth();
        },
        
        /**
         * Method that can be used for basic google.maps.Map creation for given container
         * @param container
         * @param options
         * @returns {Object} google.maps.Map
         */
        createMapForGivenContainer: function (container, options) {
            var mapOptions, map;

            mapOptions = {
                center: new google.maps.LatLng(options.lat, options.lon),
                zoom: options.zoom,
                mapTypeId: options.mapTypeId,
                streetViewControl: options.streetViewControl
            };
            map = new google.maps.Map(document.getElementById(container), mapOptions);
            return map;
        },

        /**
         * @param request {Object} - JSON with options for route calculation
         * @param map {Object} - map to draw the directions on
         * @returns
         */
        calculateDirections: function (request, map) {
            var directionsService, directionsDisplay;

            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsService.route(request, function (result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                } else {
                    view.showPopup('Unable to get directions');
                    logger.err('Unable to get directions');
                }
                view.hideLoader();
            });
        },

        /**
         * Method that can be used to get current device geolocation according to W3C Geolocation API
         * @returns
         */
        getCurrentLocation: function (map, pos) {
            logger.info('getCurrentLocation');
            if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    view.hideLoader();
                    // Currently Tizen returns coords as 0 0 and we should treat this as an error
                    if (position.coords.latitude === 0 && position.coords.longitude === 0) {
                        view.showPopup('Unable to acquire your location');
                    } else {
                    	// view.showPopup('Latitude: ' + position.coords.latitude + "<br />" + 'Longitude: ' + position.coords.longitude);
                    	map.setCenter({lat: position.coords.latitude,
                    					lng: position.coords.longitude});
                    	pos.latitude = position.coords.latitude;
                    	pos.longitude = position.coords.longitude;
                    	new google.maps.Marker({position: {lat: position.coords.latitude,
                    										lng: position.coords.longitude},
                    										map: map}); 
                    	map.setZoom(17);
                    }
                }, function (error) {
                    view.hideLoader();
                    view.showPopup('Unable to acquire your location');
                    logger.err('GPS error occurred. Error code: ', JSON.stringify(error));
                });
            } else {
                view.hideLoader();
                view.showPopup('Unable to acquire your location');
                logger.err('No W3C Geolocation API available');
            }
        },
        getCurrentLocationPolice: function (map, pos) {
            logger.info('getCurrentLocationPolice');
            if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    view.hideLoader();
                    // Currently Tizen returns coords as 0 0 and we should treat this as an error
                    if (position.coords.latitude === 0 && position.coords.longitude === 0) {
                        view.showPopup('Unable to acquire your location');
                    } else {
                    	// view.showPopup('Latitude: ' + position.coords.latitude + "<br />" + 'Longitude: ' + position.coords.longitude);
                    	map.setCenter({lat: position.coords.latitude,
                    					lng: position.coords.longitude});
                    	pos.latitude = position.coords.latitude;
                    	pos.longitude = position.coords.longitude;
                    	map.setZoom(17);
                    }
                }, function (error) {
                    view.hideLoader();
                    view.showPopup('Unable to acquire your location');
                    logger.err('GPS error occurred. Error code: ', JSON.stringify(error));
                });
            } else {
                view.hideLoader();
                view.showPopup('Unable to acquire your location');
                logger.err('No W3C Geolocation API available');
            }
        },
        
        focusToCurrentLocation: function (map) {
            logger.info('getCurrentLocation');
            if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    view.hideLoader();
                    // Currently Tizen returns coords as 0 0 and we should treat this as an error
                    if (position.coords.latitude === 0 && position.coords.longitude === 0) {
                        view.showPopup('Unable to acquire your location');
                    } else {
                    	// view.showPopup('Latitude: ' + position.coords.latitude + "<br />" + 'Longitude: ' + position.coords.longitude);
                    	map.setCenter({lat: position.coords.latitude,
                    					lng: position.coords.longitude});
                    }
                }, function (error) {
                    view.hideLoader();
                    view.showPopup('Unable to acquire your location');
                    logger.err('GPS error occurred. Error code: ', JSON.stringify(error));
                });
            } else {
                view.hideLoader();
                view.showPopup('Unable to acquire your location');
                logger.err('No W3C Geolocation API available');
            }
        }
    };
}($, tlib.logger, tlib.view, tlib.network, tlib.ajax));