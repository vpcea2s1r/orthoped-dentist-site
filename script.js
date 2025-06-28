document.addEventListener('DOMContentLoaded', function () {
    ymaps.ready(init);

    function init () {
        var myMap = new ymaps.Map("map", {
            center: [56.3264, 44.0032], // координаты клиники
            zoom: 14,
            controls: ['zoomControl'], // добавляем контроль зума
        });

        // Добавляем маркер на карту
        var placemark = new ymaps.Placemark([56.3264, 44.0032], {}, {
            preset: 'islands#icon',
            iconColor: '#FF0000' // цвет маркера
        });

        myMap.geoObjects.add(placemark);
    }
});