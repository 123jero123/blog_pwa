class Camara {
    constructor(videoNode){
        this.videoNode=videoNode;
        console.log('Camara Inizializada');
    }

    encender(){
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {width:300, height:300}
        }).then(stream=>{
            this.videoNode.srcObject = stream;
            this.stream = stream;
        });
    }

    apagar(){
        this.videoNode.pause();

        if (this.stream) {
            this.stream.getTracks()[0].stop();
        }
    }

    tomarFoto(){
        //crear un elemento canvas para renderizar ahi la foto
        let canvas = document.createElement('canvas');

        //colocar las dimensiones al igual al video
        canvas.setAttribute('width',170)
        canvas.setAttribute('heigth',150)

        //obtenemos el contexto de canvas
        let context = canvas.getContext('2d'); //una simple imagen

        //dibujar la imagen dentro del canvas
        context.drawImage(this.videoNode, 0,0, canvas.width, canvas.height);
        this.foto = context.canvas.toDataURL(); // la imagen en base 64

        let a = document.createElement('a'); // Crear un <a>
        a.download = "foto";
        a.target = '_blank';
        a.href= this.foto;

        a.click();
        // enlace.download = "foto.me.png";
        // enlace.href = this.foto;

        //limpieza 
        canvas = null;
        context = null;

        return this.foto;
    }
}