function mapaInicial(map) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude
        );
        var pin = new Microsoft.Maps.Pushpin(loc, {
            title: "Yo",
            color: "red"
        });
        map.entities.push(pin);

        pin = new Microsoft.Maps.Pushpin(loc, {
            icon: "images/circulo_rojo.png"
        });
        map.entities.push(pin);

        map.setView({ center: loc, zoom: 15 });
        colocaIconos(loc, map);
    });
}
function colocaIconos(loc, map) {
    var lat = loc.latitude;
    var lon = loc.longitude;
    $.getJSON("../res/JSON/ubicaciones.json", function (ubicaciones) {
        ubicaciones.datos.forEach(function (ubi) {
            var pos = new Microsoft.Maps.Location(lat - parseFloat(ubi.lat), lon - parseFloat(ubi.lon));
            var pin = new Microsoft.Maps.Pushpin(pos, {
                title: ubi.nombre,
                icon: ubi.src
            });
            map.entities.push(pin);
        });
    });
}