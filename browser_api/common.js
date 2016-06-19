(function() {
    var video = document.getElementById('video'),
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
    });

    navigator.geolocation.getCurrentPosition(showPosition); // Запрашиваем местоположение, и в случае успеха вызываем функцию showPosition

    var lat,
        lng;
    function showPosition(position) {
        lat = parseFloat(position.coords.latitude);
        lng = parseFloat(position.coords.longitude);
        console.log(lat);
        console.log(lng);

    	ymaps.ready(init);
    }

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
    }

})();
