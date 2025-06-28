let map;

// Инициализация карты
function initMap() {
    map = new ymaps.Map("map", {
        center: [56.3264, 44.0032], // координаты клиники
        zoom: 14,
        controls: ['zoomControl', 'typeSelector', 'geolocationControl']
    });

    // Добавляем маркер на карту
    var placemark = new ymaps.Placemark([56.3264, 44.0032], {}, {
        preset: 'islands#icon',
        iconColor: '#FF0000' // цвет маркера
    });

    map.geoObjects.add(placemark);
}

// Функция для расчета маршрута
function calculateRoute() {
    let address = document.getElementById('addressInput').value.trim();
    if (!address) return alert('Укажите ваш адрес');

    // Сначала определяем координаты введённого адреса
    ymaps.geocode(address).then(res => {
        let coords = res.geoObjects.get(0).geometry.getCoordinates();

        // Объект MultiRoute для построения маршрута
        var multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                coords, // стартовая точка (адрес пользователя)
                [56.3264, 44.0032] // конечная точка (клиника)
            ]
        }, {
            boundsAutoApply: true
        });

        // Добавляем маршрут на карту
        map.geoObjects.add(multiRoute);
    }).catch(err => {
        alert('Ошибка определения координат вашего адреса.');
    });
}

// Ждём готовности DOM и инициализируем карту
document.addEventListener('DOMContentLoaded', function () {
    ymaps.ready(initMap);
});