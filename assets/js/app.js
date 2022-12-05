var url = window.location.href;
var swLocation = '/ra/sw.js';

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        swLocation='sw.js'
        navigator.serviceWorker.register(swLocation);
    }
    navigator.serviceWorker.register(swLocation);
}
// Referencias de jQuery

// Referencias de jQuery
var googleMapKey = 'AIzaSyA5mjCwx1TRLuBAjwQw84WE6h5ErSe7Uj8';

var btnTomarFoto     = $('#tomar-foto-btn');
var btnPhoto         = $('#photo-btn');
var contenedorCamara = $('.camara-contenedor');

var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');
var btnLocation = $('#location-btn');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

var lat  = null;
var lng  = null; 
var foto = null; 

// El usuario, contiene el ID del héroe seleccionado
var usuario;

var btnPhoto = $('#photo-btn');
var contenedorCamara = $('.camara-contenedor');

const camera = new Camara($('#player')[0]);

// Crear mapa en el modal
function mostrarMapaModal(lat, lng) {

    $('.modal-mapa').remove();
    
    var content = `
            <div class="modal-mapa">
                <iframe
                    width="100%"
                    height="250"
                    frameborder="0"
                    src="https://www.google.com/maps/embed/v1/view?key=${ googleMapKey }&center=${ lat },${ lng }&zoom=17" allowfullscreen>
                    </iframe>
            </div>
    `;
    modal.append( content );
}

// Obtener la geolocalización
btnLocation.on('click', () => {
    console.log('creando map.');
    $.mdtoast('Cargando Maps... ',{
        interaction: true,
        interactionTimeout: 2000,
        actionText: 'Ok!'
    });
    // console.log('Botón geolocalización');
    navigator.geolocation.getCurrentPosition(pos =>{
        console.log(pos)
        mostrarMapaModal(pos.coords.latitude, pos.coords.longitude);
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
    });
    

});

// Boton de la camara
// usamos la funcion de fleca para prevenir
// que jQuery me cambie el valor del this
btnPhoto.on('click', () => {

    // console.log('Inicializar camara');
    contenedorCamara.removeClass('oculto');

    camera.encender();

});


// Boton para tomar la foto
btnTomarFoto.on('click', () => {

    console.log('Botón tomar foto');

    foto = camera.tomarFoto();

    camera.apagar();    
});

// Detectar cambios de conexión
function isOnline() {

    if ( navigator.onLine ) {
        // tenemos conexión
        console.log('online');
        $.mdtoast('Conectado', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!'
        });


    } else{
        // No tenemos conexión
        console.log('no conexión');
        $.mdtoast('Sin-internet', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });
    }

}
window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );
isOnline();