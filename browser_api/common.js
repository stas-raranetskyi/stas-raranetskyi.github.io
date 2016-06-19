(function() {

	/*Видео*/


    var video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia,
    button = document.getElementById('button'),
    canvas = document.getElementById('canvas'),
    canvas_wrap = document.getElementById('canvas-wrap'),
    context = canvas.getContext('2d');
    canvas_wrap.style.display = "none";

    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream) {
        video.src = vendorUrl.createObjectURL(stream);
        video.play();
    }, function(error) {
        console.log('Ошибка! Что-то пошло не так, попробуйте позже.');
    });

     // функция которая будет выполнена при нажатии на кнопку захвата кадра
    var captureMe = function () {
      canvas_wrap.style.display = "inline-block";
      // переворачиваем canvas зеркально по горизонтали (см. описание внизу статьи)
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      // отрисовываем на канвасе текущий кадр видео
      context.drawImage(video, 0, 0, video.width, video.height);
      // получаем data: url изображения c canvas
      var base64dataUrl = canvas.toDataURL('image/png');
      context.setTransform(1, 0, 0, 1, 0, 0); // убираем все кастомные трансформации canvas
      // на этом этапе можно спокойно отправить  base64dataUrl на сервер и сохранить его там как файл (ну или типа того) 
      // но мы добавим эти тестовые снимки в наш пример:
      var img = new Image();
      img.src = base64dataUrl;
      window.document.body.appendChild(img);
    }

    button.addEventListener('click', captureMe);



    /*Карта*/

    navigator.geolocation.getCurrentPosition(showPosition,showError); 

    var lat,
        lng;
    function showPosition(position) {
        lat = parseFloat(position.coords.latitude);
        lng = parseFloat(position.coords.longitude);
        console.log(lat);
        console.log(lng);

    	ymaps.ready(init);
    }

    function showError(){
    	console.log("Не удалось получить геоданные!");
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
