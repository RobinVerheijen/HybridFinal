angular.module('starter.controllers', [])

        .controller('DashCtrl', function ($scope) {
        })

        .controller('MapCtrl', function ($scope, $ionicLoading, $compile) {

//            google.maps.event.addDomListener(window, 'load', function () {

//            var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
//
//            var mapOptions = {
//                center: myLatlng,
//                zoom: 16,
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            };
//
//            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
//            navigator.geolocation.getCurrentPosition(function (pos) {
//
//                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//                var myLocation = new google.maps.Marker({
//                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
//                    map: map,
//                    title: "My Location"
//                });
//            });

//            $scope.map = map;
//            });

            function initialize() {
                
                var mapOptions = {
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                
                var map = new google.maps.Map(document.getElementById("map"),
                        mapOptions);

                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });

                $scope.map = map;
                
                $ionicLoading.show({
                    content: 'Getting current location...',
                    showBackdrop: false
                });
                setTimeout(function() {
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        $ionicLoading.hide();

                        $scope.currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                        var marker = new google.maps.Marker({
                            position: $scope.currentPos,
                            map: map,
                            title: 'Uluru (Ayers Rock)'
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(map, marker);
                        });

                    }, function (error) {
                        alert('Unable to get location: ' + error.message);
                    });
                }, 500);
                
            }
            
            ionic.Platform.ready(initialize);
//            initialize();
//            google.maps.event.addDomListener(window, 'load', initialize);

            $scope.clickTest = function () {
                alert('Example of infowindow with ng-click');
            };
        })
        .controller('ChatsCtrl', function ($scope, Chats) {
            $scope.chats = Chats.all();
            $scope.remove = function (chat) {
                Chats.remove(chat);
            }
        })

        .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
        })

        .controller('AccountCtrl', function ($scope) {
            $scope.settings = {
                enableFriends: true
            };
        });
