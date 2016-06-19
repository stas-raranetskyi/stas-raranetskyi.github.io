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

    console.log(navigator.geolocation.getCurrentPosition(showPosition));

    var lat,
        lng;
    function showPosition(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);
    }

    ymaps.ready(init);
    var myMap,
        myPlacemark;


    function init(yamaps,mymao,myPlacemark){
        myMap = new ymaps.Map ("map", {
            //center: [lat, lng],
            center: [55.76, 37.64],
            zoom: 7
        });

        //myPlacemark = new ymaps.Placemark([lat, lng], { content: 'Ваше', balloonContent: 'местонахождение' });
    }

})();
