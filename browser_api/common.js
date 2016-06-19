(function() {

	/*Видео*/

var promisifiedOldGUM = function(constraints) {

  // First get ahold of getUserMedia, if present
  var getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia);

  // Some browsers just don't implement it - return a rejected promise with an error
  // to keep a consistent interface
  if(!getUserMedia) {
    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
  }

  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
  return new Promise(function(resolve, reject) {
    getUserMedia.call(navigator, constraints, resolve, reject);
  });
        
}

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if(navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if(navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
}


// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
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
      //window.document.body.appendChild(img);
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
