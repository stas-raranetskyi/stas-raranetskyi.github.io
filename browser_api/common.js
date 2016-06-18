(function() {
    var video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    console.log(navigator.getUserMedia);
    console.log(navigator.webkitGetUserMedia);
    console.log(navigator.mozGetUserMedia);
    console.log(navigator.msGetUserMedia);


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
    function showPosition(position) {
        /* Выводим координаты */
        document.write("Широта: " + position.coords.latitude + "<br />");
        document.write("Долгота: " + position.coords.longitude);
    }

})();