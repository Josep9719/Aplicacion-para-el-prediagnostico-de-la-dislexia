<template>
    <v-container>
        <!--<v-stage
            :config="configKonva2"
            ref="stage2">
            <v-layer ref="layer2">
                <v-image 
                 :config="{ image: image, draggable: false, width: 70, height: 70, x:30, y:0}"
                 @touchend="trazarLineaMano"
                 ref="imgMano"
                ></v-image>
                <v-image 
                 :config="{ image: image_mono, draggable: false, width: 70, height: 70, x: 130, y: 0}"
                 @touchend="trazarLineaMono"
                 ref="imgMono"
                ></v-image>
                <v-image 
                 :config="{ image: image_moto, draggable: false, width: 70, height: 70, x: 220, y: 0}"
                 @touchend="trazarLineaMoto"
                 ref="imgMoto"
                ></v-image>
                <v-image 
                 :config="{ image: image_paleta, draggable: false, width: 35, height: 70, x: 320, y: 0}"
                 @touchend="trazarLineaPaleta"
                 ref="imgPaleta"
                ></v-image>
                <v-image 
                 :config="{ image: image_pelota, draggable: false, width: 70, height: 70, x: 400, y: 0}"
                 @touchend="trazarLineaPelota"
                 ref="imgPelota"
                ></v-image>
            </v-layer>
        </v-stage>-->
        <v-stage 
            :config="configKonva" 
            ref="stage" 
            @touchmove="moviendoLinea" 
            @touchend="eliminarLinea"
            class="configkonva"
            style="position: fixed !important;"
        >
            <v-layer ref="layer">
                <v-image 
                 :config="{ image: image, draggable: false, width: 70, height: 70, x:30, y:0}"
                 @touchend="trazarLineaMano"
                 ref="imgMano"
                ></v-image>
                <v-image 
                 :config="{ image: image_mono, draggable: false, width: 70, height: 70, x: 130, y: 0}"
                 @touchend="trazarLineaMono"
                 ref="imgMono"
                ></v-image>
                <v-image 
                 :config="{ image: image_moto, draggable: false, width: 70, height: 70, x: 220, y: 0}"
                 @touchend="trazarLineaMoto"
                 ref="imgMoto"
                ></v-image>
                <v-image 
                 :config="{ image: image_paleta, draggable: false, width: 35, height: 70, x: 320, y: 0}"
                 @touchend="trazarLineaPaleta"
                 ref="imgPaleta"
                ></v-image>
                <v-image 
                 :config="{ image: image_pelota, draggable: false, width: 70, height: 70, x: 400, y: 0}"
                 @touchend="trazarLineaPelota"
                 ref="imgPelota"
                ></v-image>
                <v-line :config="configLine"></v-line>
                <v-line :config="configLineTxtMono" @touchend="lineadeltxtMono()"></v-line>
                <v-line :config="configLineTxtMoto"></v-line>
                <v-line :config="configLineTxtPaleta"></v-line>
                <v-line :config="configLineTxtPelota"></v-line>
                <v-image
                 :config="{image: img_text_mano, x: 510, y: 170}"
                 ref="manoRef"
                 @touchstart="iniciarLinea"
                >
                </v-image>
                <v-image
                 :config="{image: img_text_mono, x: 390, y: 170}"
                 ref="monoRef" 
                 @touchstart="iniciarLineaMono"
                >
                </v-image>
                <v-image
                 :config="{image: img_text_moto, x: 0, y: 170}"
                 ref="motoRef" 
                 @touchstart="iniciarLineaMoto"
                >
                </v-image>
                <v-image
                 :config="{image: img_text_paleta, x: 125, y: 170}"
                 ref="paletaRef" 
                 @touchstart="iniciarLineaPaleta"
                >
                </v-image>
                <v-image
                  :config="{image: img_text_pelota, x: 250, y: 170}"
                  ref="pelotaRef" 
                  @touchstart="iniciarLineaPelota"
                >
                </v-image>
            </v-layer>
        </v-stage>
        <!--<h1>{{$data.puntuacion}}</h1>-->
    </v-container>
</template>
<script>
    export default {
        data(){
            return {
                image: null,
                image_mono: null,
                image_moto: null,
                image_paleta: null,
                image_pelota: null,
                ir_generando_linea: '',
                ir_generando_linea_mono: '',
                ir_generando_linea_moto: '',
                ir_generando_linea_paleta: '',
                ir_generando_linea_pelota: '',
                mano_seleccionado: false,
                mono_seleccionado: false,
                moto_seleccionado: false,
                paleta_seleccionado: false,
                pelota_seleccionado: false,
                configKonva: {
                    width: 800,
                    height: 400
                },
                configKonva2: {
                    width: 800,
                    height: 90
                },
                configCircleA: new Konva.Circle({
                    x: 100,
                    y: 100,
                    radius: 70,
                    fill: "green",
                    stroke: "black",
                    strokeWidth: 4,
                    draggable: false
                }),
                configLine: {},
                configLineTxtMono: {},
                configLineTxtMoto: {},
                configLineTxtPaleta: {},
                configLineTxtPelota: {},
                permitir_trazado_rojo: true,
                img_text_mano: null,
                img_text_mono: null,
                img_text_moto: null,
                img_text_paleta: null,
                img_text_pelota: null,
                puntuacion: {
                    mano: 0,
                    mono: 0,
                    moto: 0,
                    paleta: 0,
                    pelota: 0
                },
                text_result1: '',                
                text_result2: '',                
                text_result3: '',                
                text_result4: '',                
                text_result5: '',
                valor_ejercicio1: this.$route.query.valor_ejercicio1,
                valor_ejercicio2: this.$route.query.valor_ejercicio2,
                valor_ejercicio3: this.$route.query.valor_ejercicio3,
                valor_ejercicio4: this.$route.query.valor_ejercicio4,
                valor_ejercicio5: this.$route.query.valor_ejercicio5,
                valor_ejercicio6: this.$route.query.valor_ejercicio6,
                valor_ejercicio7: this.$route.query.valor_ejercicio7,
                valor_ejercicio8: this.$route.query.valor_ejercicio8,
                valor_ejercicio9: this.$route.query.valor_ejercicio9, 
                valor_ejercicio1_visual: this.$route.query.valor_ejercicio1_visual,
                valor_ejercicio2_visual: this.$route.query.valor_ejercicio2_visual,
                valor_ejercicio3_visual: this.$route.query.valor_ejercicio3_visual,               
            }
        },
        created() {
            //Imagenes a trazar
            const image = new window.Image();
            image.src = require("../../../assets/imagenes/profunda/ejercicio1/mano.png");
            image.onload = () => {this.image = image;};

            const imagen_mono = new window.Image();
            imagen_mono.src = require("../../../assets/imagenes/profunda/ejercicio1/mono.png");
            imagen_mono.onload = () => {this.image_mono = imagen_mono;};

            const imagen_moto = new window.Image();
            imagen_moto.src = require("../../../assets/imagenes/profunda/ejercicio1/moto.png");
            imagen_moto.onload = () => {this.image_moto = imagen_moto;};

            const imagen_paleta = new window.Image();
            imagen_paleta.src = require("../../../assets/imagenes/profunda/ejercicio1/paleta.png");
            imagen_paleta.onload = () => {this.image_paleta = imagen_paleta;};

            const imagen_pelota = new window.Image();
            imagen_pelota.src = require("../../../assets/imagenes/profunda/ejercicio1/pelota.png");
            imagen_pelota.onload = () => {this.image_pelota = imagen_pelota;};
            //--------------------------
            //Imagenes texto
            const image_txtmano = new window.Image();
            image_txtmano.src = require("../../../assets/imagenes/profunda/ejercicio1/mano_text.jpg");
            image_txtmano.onload = () => {this.img_text_mano = image_txtmano;};

            const image_txtmono = new window.Image();
            image_txtmono.src = require("../../../assets/imagenes/profunda/ejercicio1/mono_text.jpg");
            image_txtmono.onload = () => {this.img_text_mono = image_txtmono;};

            const image_txtmoto = new window.Image();
            image_txtmoto.src = require("../../../assets/imagenes/profunda/ejercicio1/moto_text.jpg");
            image_txtmoto.onload = () => {this.img_text_moto = image_txtmoto;};
            
            const image_txtpaleta = new window.Image();
            image_txtpaleta.src = require("../../../assets/imagenes/profunda/ejercicio1/paleta_text.jpg");
            image_txtpaleta.onload = () => {this.img_text_paleta = image_txtpaleta;};

            const image_txtpelota = new window.Image();
            image_txtpelota.src = require("../../../assets/imagenes/profunda/ejercicio1/pelota_text.jpg");
            image_txtpelota.onload = () => {this.img_text_pelota = image_txtpelota;};

            //--------------------------
            this.playSound('indicaciones_trazado_lineas.mp3')
        },
        methods: {
            playSound (sound) {
                if(sound) {
                    var audio = new Audio(require('../../../assets/audios/profunda/'+sound));
                    audio.play();
                }
            },
            observable(){
                let vm = this;
                console.log("OBSERVABLE ");
                console.log(vm.mano_seleccionado);
                console.log(vm.mono_seleccionado);
                console.log(vm.moto_seleccionado);
                console.log(vm.paleta_seleccionado);
                console.log(vm.pelota_seleccionado);
                if((vm.mano_seleccionado && vm.mono_seleccionado) &&(vm.moto_seleccionado && vm.paleta_seleccionado && vm.pelota_seleccionado)){
                    console.log("TODAS LAS IMAGENES HAN SIDO SELECCIONADAS");
                    console.log(vm.puntuacion);
                    let result = vm.puntuacion.mano + vm.puntuacion.mono + vm.puntuacion.moto + vm.puntuacion.paleta + vm.puntuacion.pelota;
                    console.log(result);
                    //vm.$router.push({ path: `/testprofundo2/${result}`});
                    vm.$router.push({ path: `/testprofundocompleto2/`,
                    query: {
                        valor_ejercicio1: vm.valor_ejercicio1,
                        valor_ejercicio2: vm.valor_ejercicio2,
                        valor_ejercicio3: vm.valor_ejercicio3,
                        valor_ejercicio4: vm.valor_ejercicio4,
                        valor_ejercicio5: vm.valor_ejercicio5,
                        valor_ejercicio6: vm.valor_ejercicio6,
                        valor_ejercicio7: vm.valor_ejercicio7,
                        valor_ejercicio8: vm.valor_ejercicio8,
                        valor_ejercicio9: vm.valor_ejercicio9,
                        valor_ejercicio1_visual: vm.valor_ejercicio1_visual,
                        valor_ejercicio2_visual: vm.valor_ejercicio2_visual,
                        valor_ejercicio3_visual: vm.valor_ejercicio3_visual,
                        valor_ejercicio1_profundo:{
                            text_result1: vm.text_result1,
                            text_result2: vm.text_result2,
                            text_result3: vm.text_result3,
                            text_result4: vm.text_result4,
                            text_result5: vm.text_result5,
                            punteo: result
                        }
                    } 
                });
                }
            },
            iniciarLinea(){
                let vm = this;
                console.log("CREANDO LINEA");
                vm.playSound('mano.mp3');
                vm.ir_generando_linea = true;
                const mousePos = this.$refs.stage.getStage().getPointerPosition();
                vm.configLine = new Konva.Arrow({
                    points: [mousePos.x, mousePos.y, mousePos.x, mousePos.y],
                    pointerLength: 10,
                    pointerWidth: 10,
                    fill: 'green',
                    stroke: 'green',
                    strokeWidth: 4,
                    draggable: false
                });

            },
            iniciarLineaMono(){
                let vm = this;
                console.log("CREANDO LINEA MONO");
                vm.ir_generando_linea_mono = true;
                vm.playSound('mono.mp3');                
                const mousePos = this.$refs.stage.getStage().getPointerPosition();
                console.log(mousePos);
                vm.configLineTxtMono = new Konva.Arrow({
                    points: [mousePos.x, mousePos.y, mousePos.x, mousePos.y],
                    pointerLength: 10,
                    pointerWidth: 10,
                    fill: 'blue',
                    stroke: 'blue',
                    strokeWidth: 4,
                    draggable: false
                });
            },
            iniciarLineaMoto(){
                console.log("CREANDO LINEA MOTO");
                let vm = this;
                vm.ir_generando_linea_moto = true;
                vm.playSound('moto.mp3');
                const mousePos = this.$refs.stage.getStage().getPointerPosition();
                vm.configLineTxtMoto = new Konva.Arrow({
                    points: [mousePos.x, mousePos.y, mousePos.x, mousePos.y],
                    pointerLength: 10,
                    pointerWidth: 10,
                    fill: 'orange',
                    stroke: 'orange',
                    strokeWidth: 4,
                    draggable: false
                });
            },
            iniciarLineaPaleta(){
                console.log("CREANDO LINEA PALETA");
                let vm = this;
                vm.ir_generando_linea_paleta = true;
                vm.playSound('paleta.mp3');
                const mousePos = this.$refs.stage.getStage().getPointerPosition();
                vm.configLineTxtPaleta = new Konva.Arrow({
                    points: [mousePos.x, mousePos.y, mousePos.x, mousePos.y],
                    pointerLength: 10,
                    pointerWidth: 10,
                    fill: 'red',
                    stroke: 'red',
                    strokeWidth: 4,
                    draggable: false
                });
            },
            iniciarLineaPelota(){
                console.log("CREANDO LINEA PELOTA");
                let vm = this;
                vm.ir_generando_linea_pelota = true;
                vm.playSound('pelota.mp3');
                const mousePos = this.$refs.stage.getStage().getPointerPosition();
                vm.configLineTxtPelota = new Konva.Arrow({
                    points: [mousePos.x, mousePos.y, mousePos.x, mousePos.y],
                    pointerLength: 10,
                    pointerWidth: 10,
                    fill: 'black',
                    stroke: 'black',
                    strokeWidth: 4,
                    draggable: false
                });
            },
            trazarLineaMano(event){
                let vm = this;
                console.log("TRAZANDO LINEA MANO");
                if(vm.ir_generando_linea) {
                    console.log("SE ESTA CONECTANDO TEXTO MANO CON IMAGEN MANO, CORRECTO");
                    vm.ir_generando_linea = false;
                    vm.$refs.manoRef.getNode().off("touchstart");
                    vm.puntuacion.mano = 1;
                    vm.text_result1 = "Unió la imagen mano con la palabra mano";
                    vm.$refs.imgMano.getNode().off("touchend");
                    vm.mano_seleccionado = true; //La linea ha llegado a tocar la imagen 'mano' por tal razon es true, ha sido seleccionada.
                }
                else if(vm.ir_generando_linea_mono){
                    console.log("SE ESTA CONECTANDO TEXTO MONO CON IMAGEN MANO");
                    vm.ir_generando_linea_mono = false;
                    vm.$refs.monoRef.getNode().off("touchstart");
                    vm.text_result1 = "Unió la imagen mano con la palabra mono";
                    vm.$refs.imgMano.getNode().off("touchend");
                    vm.mano_seleccionado = true; //La linea ha llegado a tocar la imagen 'mano' por tal razon es true, ha sido seleccionada.
                }
                else if(vm.ir_generando_linea_moto){
                    console.log("SE ESTA CONECTANDO TEXTO MOTO CON IMAGEN MANO");
                    vm.ir_generando_linea_moto = false;
                    vm.$refs.motoRef.getNode().off("touchstart");
                    vm.text_result1 = "Unió la imagen mano con la palabra moto";
                    vm.$refs.imgMano.getNode().off("touchend");
                    vm.mano_seleccionado = true; //La linea ha llegado a tocar la imagen 'mano' por tal razon es true, ha sido seleccionada.
                }
                else if(vm.ir_generando_linea_paleta){
                    console.log("SE ESTA CONECTANDO TEXTO PALETA CON IMAGEN MANO");
                    vm.ir_generando_linea_paleta = false;
                    vm.$refs.paletaRef.getNode().off("touchstart");
                    vm.text_result1 = "Unió la imagen mano con la palabra paleta";
                    vm.$refs.imgMano.getNode().off("touchend");
                    vm.mano_seleccionado = true; //La linea ha llegado a tocar la imagen 'mano' por tal razon es true, ha sido seleccionada.
                }
                else if(vm.ir_generando_linea_pelota){
                    console.log("SE ESTA CONECTANDO TEXTO PELOTA CON IMAGEN MANO");
                    vm.ir_generando_linea_pelota = false;
                    vm.$refs.pelotaRef.getNode().off("touchstart"); 
                    vm.text_result1 = "Unió la imagen mano con la palabra pelota";
                    vm.$refs.imgMano.getNode().off("touchend");
                    vm.mano_seleccionado = true; //La linea ha llegado a tocar la imagen 'mano' por tal razon es true, ha sido seleccionada.
                }
                vm.observable();
            },
            trazarLineaMono(){
                let vm = this;
                console.log("TRAZANDO LA LINEA A MONO, SOLTANDO EL CLICK");
                console.log(vm.mono_seleccionado);
                console.log(vm.ir_generando_linea_mono);
                if(vm.ir_generando_linea) {
                    console.log("SE ESTA CONECTANDO TEXTO MANO CON IMAGEN MONO");
                    vm.ir_generando_linea = false;
                    vm.$refs.manoRef.getNode().off("touchstart"); 
                    vm.text_result2 = "Unió la imagen mono con la palabra mano";
                    vm.mono_seleccionado       = true;
                    vm.$refs.imgMono.getNode().off("touchend");

                }
                else if(vm.ir_generando_linea_mono){
                    console.log("SE ESTA CONECTANDO TEXTO MONO CON IMAGEN MONO, CORRECTO");
                    vm.ir_generando_linea_mono = false;
                    vm.$refs.monoRef.getNode().off("touchstart");
                    vm.puntuacion.mono = 1;
                    vm.text_result2 = "Unió la imagen mono con la palabra mono";
                    vm.mono_seleccionado       = true;
                    vm.$refs.imgMono.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_moto){
                    console.log("SE ESTA CONECTANDO TEXTO MOTO CON IMAGEN MONO");
                    vm.ir_generando_linea_moto = false;
                    vm.$refs.motoRef.getNode().off("touchstart");
                    vm.text_result2 = "Unió la imagen mono con la palabra moto";
                    vm.mono_seleccionado       = true;
                    vm.$refs.imgMono.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_paleta){
                    console.log("SE ESTA CONECTANDO TEXTO PALETA CON IMAGEN MONO");
                    vm.ir_generando_linea_paleta = false;
                    vm.$refs.paletaRef.getNode().off("touchstart");
                    vm.text_result2 = "Unió la imagen mono con la palabra paleta";
                    vm.mono_seleccionado       = true;
                    vm.$refs.imgMono.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_pelota){
                    console.log("SE ESTA CONECTANDO TEXTO PELOTA CON IMAGEN MONO");
                    vm.ir_generando_linea_pelota = false;
                    vm.$refs.pelotaRef.getNode().off("touchstart");
                    vm.text_result2 = "Unió la imagen mono con la palabra pelota";
                    vm.mono_seleccionado       = true;
                    vm.$refs.imgMono.getNode().off("touchend");
                }
                vm.observable();
            },
            trazarLineaMoto(){
                console.log("TRAZANDO LINEA A LA MOTO");
                let vm = this;
                if(vm.ir_generando_linea) {
                    console.log("SE ESTA CONECTANDO TEXTO MANO CON IMAGEN MOTO");
                    vm.ir_generando_linea = false;
                    vm.$refs.manoRef.getNode().off("touchstart");
                    vm.text_result3 = "Unió la imagen moto con la palabra mano";
                    vm.moto_seleccionado       = true;
                    vm.$refs.imgMoto.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_mono){
                    console.log("SE ESTA CONECTANDO TEXTO MONO CON IMAGEN MOTO");
                    vm.ir_generando_linea_mono = false;
                    vm.$refs.monoRef.getNode().off("touchstart");
                    vm.text_result3 = "Unió la imagen moto con la palabra mono";
                    vm.moto_seleccionado       = true;
                    vm.$refs.imgMoto.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_moto){
                    console.log("SE ESTA CONECTANDO TEXTO MOTO CON IMAGEN MOTO, CORRECTO");
                    vm.ir_generando_linea_moto = false;
                    vm.$refs.motoRef.getNode().off("touchstart");
                    vm.puntuacion.moto = 1;
                    vm.text_result3 = "Unió la imagen moto con la palabra moto";
                    vm.moto_seleccionado       = true;
                    vm.$refs.imgMoto.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_paleta){
                    console.log("SE ESTA CONECTANDO TEXTO PALETA CON IMAGEN MOTO");
                    vm.ir_generando_linea_paleta = false;
                    vm.$refs.paletaRef.getNode().off("touchstart");
                    vm.text_result3 = "Unió la imagen moto con la palabra paleta";
                    vm.moto_seleccionado       = true;
                    vm.$refs.imgMoto.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_pelota){
                    console.log("SE ESTA CONECTANDO TEXTO PELOTA CON IMAGEN MOTO");
                    vm.ir_generando_linea_pelota = false;
                    vm.$refs.pelotaRef.getNode().off("touchstart"); 
                    vm.text_result3 = "Unió la imagen moto con la palabra pelota";
                    vm.moto_seleccionado       = true;
                    vm.$refs.imgMoto.getNode().off("touchend");
                } 
                vm.observable();
            },
            trazarLineaPaleta(){
                console.log("TRAZANDO LINEA A LA PALETA");
                let vm = this;
                if(vm.ir_generando_linea) {
                    console.log("SE ESTA CONECTANDO TEXTO MANO CON IMAGEN PALETA");
                    vm.ir_generando_linea = false;
                    vm.$refs.manoRef.getNode().off("touchstart");
                    vm.text_result4 = "Unió la imagen paleta con la palabra mano";
                    vm.paleta_seleccionado       = true;
                    vm.$refs.imgPaleta.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_mono){
                    console.log("SE ESTA CONECTANDO TEXTO MONO CON IMAGEN PALETA");
                    vm.ir_generando_linea_mono = false;
                    vm.$refs.monoRef.getNode().off("touchstart");
                    vm.text_result4 = "Unió la imagen paleta con la palabra mono";
                    vm.paleta_seleccionado       = true;
                    vm.$refs.imgPaleta.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_moto){
                    console.log("SE ESTA CONECTANDO TEXTO MOTO CON IMAGEN PALETA");
                    vm.ir_generando_linea_moto = false;
                    vm.$refs.motoRef.getNode().off("touchstart");
                    vm.text_result4 = "Unió la imagen paleta con la palabra moto";
                    vm.paleta_seleccionado       = true;
                    vm.$refs.imgPaleta.getNode().off("touchend");           
                }
                else if(vm.ir_generando_linea_paleta){
                    console.log("SE ESTA CONECTANDO TEXTO PALETA CON IMAGEN PALETA, CORRECTO");
                    vm.ir_generando_linea_paleta = false;
                    vm.$refs.paletaRef.getNode().off("touchstart");
                    vm.puntuacion.paleta = 1;
                    vm.text_result4 = "Unió la imagen paleta con la palabra paleta";
                    vm.paleta_seleccionado       = true;
                    vm.$refs.imgPaleta.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_pelota){
                    console.log("SE ESTA CONECTANDO TEXTO PELOTA CON IMAGEN PALETA");
                    vm.ir_generando_linea_pelota = false;
                    vm.$refs.pelotaRef.getNode().off("touchstart");
                    vm.puntuacion.paleta = 1;
                    vm.text_result4 = "Unió la imagen paleta con la palabra pelota";
                    vm.paleta_seleccionado       = true;
                    vm.$refs.imgPaleta.getNode().off("touchend");
                } 
                vm.observable();
            },
            trazarLineaPelota(){
                console.log("TRAZANDO LINEA A LA PELOTA");
                let vm = this;
                
                if(vm.ir_generando_linea) {
                    console.log("SE ESTA CONECTANDO TEXTO MANO CON IMAGEN PELOTA");
                    vm.ir_generando_linea = false;
                    vm.$refs.manoRef.getNode().off("touchstart"); 
                    vm.text_result5 = "Unió la imagen pelota con la palabra mano";
                    vm.pelota_seleccionado       = true;
                    vm.$refs.imgPelota.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_mono){
                    console.log("SE ESTA CONECTANDO TEXTO MONO CON IMAGEN PELOTA");
                    vm.ir_generando_linea_mono = false;
                    vm.$refs.monoRef.getNode().off("touchstart");
                    vm.text_result5 = "Unió la imagen pelota con la palabra mono";
                    vm.pelota_seleccionado       = true;
                    vm.$refs.imgPelota.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_moto){
                    console.log("SE ESTA CONECTANDO TEXTO MOTO CON IMAGEN PELOTA");
                    vm.ir_generando_linea_moto = false;
                    vm.$refs.motoRef.getNode().off("touchstart");
                    vm.text_result5 = "Unió la imagen pelota con la palabra moto";
                    vm.pelota_seleccionado       = true;
                    vm.$refs.imgPelota.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_paleta){
                    console.log("SE ESTA CONECTANDO TEXTO PALETA CON IMAGEN PELOTA");
                    vm.ir_generando_linea_paleta = false;
                    vm.$refs.paletaRef.getNode().off("touchstart");
                    vm.text_result5 = "Unió la imagen pelota con la palabra paleta";
                    vm.pelota_seleccionado       = true;
                    vm.$refs.imgPelota.getNode().off("touchend");
                }
                else if(vm.ir_generando_linea_pelota){
                    console.log("SE ESTA CONECTANDO TEXTO PELOTA CON IMAGEN PELOTA, CORRECTO");
                    vm.ir_generando_linea_pelota = false;
                    vm.$refs.pelotaRef.getNode().off("touchstart");
                    vm.puntuacion.pelota = 1; 
                    vm.text_result5 = "Unió la imagen pelota con la palabra pelota";
                    vm.pelota_seleccionado       = true;
                    vm.$refs.imgPelota.getNode().off("touchend");
                }
                vm.observable();
            },
            moviendoLinea(){
                let vm = this;
                if(vm.ir_generando_linea){
                    const mousePos = this.$refs.stage.getStage().getPointerPosition();
                    let xManoTxt = vm.$refs.manoRef.getStage().attrs.x+50;
                    let yManoTxt = vm.$refs.manoRef.getStage().attrs.y;
                    vm.configLine = new Konva.Arrow({
                        points: [xManoTxt, yManoTxt, mousePos.x, mousePos.y+10],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'green',
                        stroke: 'green',
                        strokeWidth: 4,
                        draggable: false
                    });
                }
                else if(vm.ir_generando_linea_mono){
                    const mousePos = this.$refs.stage.getStage().getPointerPosition();
                    let xMonoTxt = vm.$refs.monoRef.getStage().attrs.x+50;
                    let yMonoTxt = vm.$refs.monoRef.getStage().attrs.y;
                    
                    vm.configLineTxtMono = new Konva.Arrow({
                        points: [xMonoTxt, yMonoTxt, mousePos.x, mousePos.y+10],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'blue',
                        stroke: 'blue',
                        strokeWidth: 4,
                        draggable: false
                    });
                }
                else if(vm.ir_generando_linea_moto){
                    const mousePos = this.$refs.stage.getStage().getPointerPosition();
                    let xMotoTxt = vm.$refs.motoRef.getStage().attrs.x+50;
                    let yMotoTxt = vm.$refs.motoRef.getStage().attrs.y;

                    vm.configLineTxtMoto =  new Konva.Arrow({
                        points: [xMotoTxt, yMotoTxt, mousePos.x, mousePos.y+10],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'orange',
                        stroke: 'orange',
                        strokeWidth: 4,
                        draggable: false
                    });
                }
                else if(vm.ir_generando_linea_paleta){
                    const mousePos = this.$refs.stage.getStage().getPointerPosition();
                    let xPaletaTxt = vm.$refs.paletaRef.getStage().attrs.x+50;
                    let yPaletaTxt = vm.$refs.paletaRef.getStage().attrs.y;
                    vm.configLineTxtPaleta =  new Konva.Arrow({
                        points: [xPaletaTxt, yPaletaTxt, mousePos.x, mousePos.y+10],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'red',
                        stroke: 'red',
                        strokeWidth: 4,
                        draggable: false
                    });
                }
                else if(vm.ir_generando_linea_pelota){
                    const mousePos = this.$refs.stage.getStage().getPointerPosition();
                    let xPelotaTxt = vm.$refs.pelotaRef.getStage().attrs.x+50;
                    let yPelotaTxt = vm.$refs.pelotaRef.getStage().attrs.y;
                    vm.configLineTxtPelota =  new Konva.Arrow({
                        points: [xPelotaTxt, yPelotaTxt, mousePos.x, mousePos.y+10],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'black',
                        stroke: 'black',
                        strokeWidth: 4,
                        draggable: false
                    });
                }
            },
            lineadeltxtMono(){
                console.log("SOLTO EL CLICK SOBRE LA LINEA DEL TEXTO MONO");
            },
            eliminarLinea(){
                let vm = this;
                console.log("SABER SI UNA IMAGEN YA HA SIDO SELECCIONADA");
                console.log(vm.mano_seleccionado);
                console.log(vm.mono_seleccionado);
                console.log(vm.moto_seleccionado);
                console.log(vm.paleta_seleccionado);
                console.log(vm.pelota_seleccionado);
                console.log("SABER QUE LINEA SE ESTA GENERANDO");
                console.log(vm.ir_generando_linea);
                if(vm.ir_generando_linea){
                    console.log("SIGNIFICA QUE TEXTO MANO NO HA SELECCIONADO NINGUNA IMAGEN");
                    vm.configLine = new Konva.Arrow({
                        points: [0, 0, 0, 0],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'green',
                        stroke: 'green',
                        strokeWidth: 4,
                        draggable: false
                    });
                    vm.ir_generando_linea = false;
                }
                else if(vm.ir_generando_linea_mono){
                    console.log("SIGNIFCA QUE TEXTO MONO NO HA SELECCIONADO NINGUNA IMAGEN");
                    vm.configLineTxtMono = new Konva.Arrow({
                        points: [0, 0, 0, 0],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'blue',
                        stroke: 'blue',
                        strokeWidth: 4,
                        draggable: false
                    });
                    vm.ir_generando_linea_mono = false;
                }
                else if(vm.ir_generando_linea_moto){
                    console.log("SIGNIFICA QUE TEXTO MOTO NO HA SELECCIONADO NINGUNA IMAGEN");
                    vm.configLineTxtMoto = new Konva.Arrow({
                        points: [0,0,0,0],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'orange',
                        stroke: 'orange',
                        strokeWidth: 4,
                        draggable: false
                    });
                    vm.ir_generando_linea_moto = false;
                }
                else if(vm.ir_generando_linea_paleta){
                    console.log("SIGNIFICA QUE TEXTO PALETA NO HA SELECCIONADO NINGUNA IMAGEN");
                    vm.configLineTxtPaleta = new Konva.Arrow({
                        points: [0,0,0,0],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'red',
                        stroke: 'red',
                        strokeWidth: 4,
                        draggable: false
                    });
                    vm.ir_generando_linea_paleta = false;
                }
                else if(vm.ir_generando_linea_pelota){
                    console.log("SIGNIFICA QUE TEXTO PELOTA NO HA SELECCIONADO NINGUNA IMAGEN");
                    vm.configLineTxtPelota = new Konva.Arrow({
                        points: [0,0,0,0],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'black',
                        stroke: 'black',
                        strokeWidth: 4,
                        draggable: false
                    });
                    vm.ir_generando_linea_pelota = false; 
                }
                /* if(vm.mano_seleccionado){
                    console.log("MANO HA SIDO SELECCIONADA");
                    vm.ir_generando_linea = false;
                    vm.mano_seleccionado  = false; */
                    //Ya no generara la linea si ya se selecciono alguna imagen 
                    /* vm.mano_seleccionado         = false; //Mano ha sido seleccionada
                    vm.mono_seleccionado         = false; //Mono ha sido seleccionado
                    vm.moto_seleccionado         = false; //Moto ha sido seleccionado
                    vm.paleta_seleccionado       = false; //Paleta ha sido seleccionado
                    vm.pelota_seleccionado       = false; */ //Pelota ha sido seleccionado

                    /* vm.ir_generando_linea        = false; //Pasa a ser false para ya no generar una nueva linea
                    vm.ir_generando_linea_mono   = false;
                    vm.ir_generando_linea_moto   = false;
                    vm.ir_generando_linea_paleta = false;
                    vm.ir_generando_linea_pelota = false; */
                /* }
                else if(vm.mono_seleccionado){
                    vm.ir_generando_linea_mono = false;
                    vm.mono_seleccionado       = false;
                }
                else{
                    console.log("ELIMINANDO LINEA, ESTA FUERA DEL CIRCULO");
 */
                    /* vm.mano_seleccionado = true;
                    vm.mono_seleccionado = true;
                    vm.moto_seleccionado = true;
                    vm.paleta_seleccionado = true;
                    vm.pelota_seleccionado = true;

                    vm.ir_generando_linea        = false;
                    vm.ir_generando_linea_mono   = false;
                    vm.ir_generando_linea_moto   = false;
                    vm.ir_generando_linea_paleta = false;
                    vm.ir_generando_linea_pelota = false; */
                    //---- Eliminando linea ----
                    

                        /*vm.configLine = new Konva.Arrow({
                            points: [0, 0, 0, 0],
                            pointerLength: 0,
                            pointerWidth: 0,
                            fill: 'green',
                            stroke: 'green',
                            strokeWidth: 4,
                            draggable: false
                        });

                        vm.configLineTxtMono = new Konva.Arrow({
                            points: [0, 0, 0, 0],
                            pointerLength: 0,
                            pointerWidth: 0,
                            fill: 'green',
                            stroke: 'green',
                            strokeWidth: 4,
                            draggable: false
                        });*/
                    //---------------------------
                /* } */
                
            }
        }
    }
</script>
<style  scoped>
.configkonva{
    position: unset !important;
}
</style>