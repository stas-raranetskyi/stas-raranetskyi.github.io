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

    navigator.geolocation.getCurrentPosition(showPosition);

    var latitude_с,
        longitude_с;

    function showPosition(position) {
        (function(position,latitude_с,longitude_с){
            latitude_с = parseFloat(position.coords.latitude);
            longitude_с = parseFloat(position.coords.longitude);
            console.log(latitude_с);
            console.log(longitude_с);
        })(position,latitude_с,longitude_с)
    }
    console.log(latitude_с);
    console.log(longitude_с);

})();

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude_с, lng: longitude_с},
        zoom: 8
    });
}