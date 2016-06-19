(function() {
    /*var video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
        video.src = vendorUrl.createObjectURL(stream);
        video.play();
    }, function(error) {
        console.log('Ошибка! Что-то пошло не так, попробуйте позже.');
    });*/


    /*ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init(){
        myMap = new ymaps.Map ("map", {
            center: [lat, lng],
            zoom: 18
        });

        myPlacemark = new ymaps.Placemark([lat, lng], {
            balloonContent: 'Вы находитесь здесь'
        });

        myMap.geoObjects.add(myPlacemark);
    }*/

})();

navigator.geolocation.getCurrentPosition(showPosition);

var latitude,
    longitude;

function showPosition(position) {
    latitude = parseFloat(position.coords.latitude.toFixed(2));
    longitude = parseFloat(position.coords.longitude.toFixed(2));
    console.log(latitude);
    console.log(longitude);
}

var map;
(function(map,latitude,longitude){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: latitude, lng: longitude},
            zoom: 8
        });
})(map,latitude,longitude);
