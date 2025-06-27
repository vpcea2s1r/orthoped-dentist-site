let map;

// Инициализация карты
function initMap() {
    const clinicLocation = { lat: 56.3264, lng: 44.0032 }; // координаты Нижнего Новгорода
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: clinicLocation,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true,
        rotateControl: true,
        scaleControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
    });

    // Ставим метку на карте с клиникой
    const marker = new google.maps.Marker({
        position: clinicLocation,
        map: map,
        title: 'Консультация ортопеда',
    });
}

// Строим маршрут
function calculateRoute() {
    let address = document.getElementById('addressInput').value.trim();
    if (!address || !google) return alert('Укажите верный адрес');

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    const request = {
        origin: address,
        destination: {lat: 56.3264, lng: 44.0032},
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            alert('Ошибка при построении маршрута.');
        }
    });
}