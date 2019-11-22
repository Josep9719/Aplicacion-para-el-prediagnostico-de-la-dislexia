<template>
    <div>
        <h1>RESULTADO TEST VISUAL</h1>
        <v-flex xs12 sm4 text-center>
                <div class="my-2">
                    <v-btn depressed large color="primary" to="/">IR AL INICIO</v-btn>
                    <img src="../../static/logo.jpeg" width="50%">
                </div>
        </v-flex>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                sum_result: this.$route.params.sumresult,
                logo_actual: 'logo.jpeg',
                ref_semejanza: 'mono1.png',
                valor_ejercicio1: this.$route.query.valor_ejercicio1,
                valor_ejercicio2: this.$route.query.valor_ejercicio2,
                valor_ejercicio3: this.$route.query.valor_ejercicio3,
            }
        },
        methods: {
            convertirImagen64(url){
                console.log("URL EN FUNCION CONVERTIR IMAGEN");
                console.log(url);
                return new Promise((resolve, reject) =>{
                    var request = new
                    XMLHttpRequest(); request.onload = function(){
                        var file = new FileReader();
                        file.onloadend = function(){
                            resolve(file.result);
                        }
                        file.readAsDataURL(request.response);
                    }
                    request.open('GET', url);
                    request.responseType = 'blob';
                    request.send();
                });
            }
        },
        async created(){
            let vm = this;
            let correctas_semejanzas = 0;
            let correctas_diferencias = 0;
            let img_b64 = await vm.convertirImagen64(vm.logo_actual);
            let referencia_semejanza = await vm.convertirImagen64(vm.ref_semejanza);
            let referencia_diferencias = await vm.convertirImagen64('carlos1.png');

            //Repuestas semejanzas
            let img_res1 = await vm.convertirImagen64(vm.valor_ejercicio1.datos_ejercicio1[4].img);
            let img_res2 = await vm.convertirImagen64(vm.valor_ejercicio1.datos_ejercicio1[3].img);
            let img_res3 = await vm.convertirImagen64(vm.valor_ejercicio1.datos_ejercicio1[2].img);
            let img_res4 = await vm.convertirImagen64(vm.valor_ejercicio1.datos_ejercicio1[1].img);
            let img_res5 = await vm.convertirImagen64(vm.valor_ejercicio1.datos_ejercicio1[0].img);

            for(let i in vm.valor_ejercicio1.datos_ejercicio1){
                if(vm.valor_ejercicio1.datos_ejercicio1[i].correcto){
                    correctas_semejanzas +=1;
                }
            }
            let incorrectas_semejanzas = 5-correctas_semejanzas;
            //--------------------

            //Respuestas diferencias
            let img_res1_dif = await vm.convertirImagen64(vm.valor_ejercicio2.datos_ejercicio2[4].img);
            let img_res2_dif = await vm.convertirImagen64(vm.valor_ejercicio2.datos_ejercicio2[3].img);
            let img_res3_dif = await vm.convertirImagen64(vm.valor_ejercicio2.datos_ejercicio2[2].img);
            let img_res4_dif = await vm.convertirImagen64(vm.valor_ejercicio2.datos_ejercicio2[1].img);
            let img_res5_dif = await vm.convertirImagen64(vm.valor_ejercicio2.datos_ejercicio2[0].img);

            for(let i in vm.valor_ejercicio2.datos_ejercicio2){
                if(vm.valor_ejercicio2.datos_ejercicio2[i].correcto == false){
                    correctas_diferencias +=1;
                }
            }
            let incorrectas_diferencias = 5-correctas_diferencias;
            //----------------------

            //Respuesta distincion de colores
            let correctas_distincion_colores = vm.valor_ejercicio3.amarillo + vm.valor_ejercicio3.anaranjado + vm.valor_ejercicio3.azul + vm.valor_ejercicio3.rojo + vm.valor_ejercicio3.verde;
            let incorrectas_distincion_colores = 10-correctas_distincion_colores;
            //-------------------------------
            
            let total_correctas =  correctas_semejanzas + correctas_diferencias + correctas_distincion_colores;
            let total_incorrectas = 20-total_correctas;


            //Riesgo de dislexia
            let riesgo_dislexia = total_incorrectas <= 1 ? 
            '<td style="background-color: #00FE1B; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            total_incorrectas == 2 ? 
            '<td style="background-color: #FEEB00; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            '<td style="background-color: #FF0B0B; border: 1px solid orange; height: 36px; width: 80px;"></td>';

            let grado_dislexia = total_incorrectas <=1 ? '0':
                                total_incorrectas ==2 ? '1':'2'

            let tiene_riesgo_dislexia = total_incorrectas <=1 ? 'No':
                                        total_incorrectas ==2 ? 'No':'Si';

            let fecha = new Date();
            let fecha_actual = fecha.getDate() +"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+" hrs"; 

            let options = {
                documentSize: 'A4',
                type: 'share',
                fileName: 'myFile.pdf'
            }
            console.log(device.platform);
            cordova.plugins.pdf.fromData( `
                <html>
                    <img src="${img_b64}" width="15% height="15%"/>
                    <h1>Informe pre diagnóstico de la dislexia</h1> 
                    <strong>Datos Generales: </strong>
                    <h5>Fecha: ${fecha_actual}</h5>
                    <h5>Nombre: ${vm.$store.state.info_personal.nombre}</h5>
                    <h5>Apellidos: ${vm.$store.state.info_personal.apellido_paterno} ${vm.$store.state.info_personal.apellido_materno}</h5>
                    <h5>Sexo: ${vm.$store.state.info_personal.sexo} </h5>
                    <h5>Fecha nacimiento: ${vm.$store.state.info_personal.fecha_nacimiento} </h5>
                    <table style="width:100%; border: black 5px solid;" border="1">
                        <tr>
                            <td colspan="3">
                                <strong>Semáforo</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #00FE1B; border: 1px solid orange; height: 30px;"     width: 100px;></td>
                            <td colspan="2"><strong>Tu desempeño fue sobresaliente, no hay indicios de presentar riesgo de dislexia.</strong></td>
                        </tr>
                        <tr>
                            <td style="background-color: #FEEB00; border: 1px solid orange; height: 30px;     width: 100px;"></td>
                            <td colspan="2"><strong>No hay señales de presentar riesgo de dislexia, sin embargo se recomienda acudir con un especialista.</strong></td>
                        </tr>
                        <tr>
                            <td style="background-color: #FF0B0B; border: 1px solid orange; height: 30px;     width: 100px;"></td>
                            <td colspan="2"><strong>Existe la posibilidad de estar en riesgo de presentar algún tipo de dislexia, se recomienda acudir con un especialista.</strong></td>
                        </tr>
                    </table>
                    <table style="width:100%; border: black 5px solid;" border="1">
                        <tr>
                            <td colspan="5">
                                <strong>Dislexia superficial y visual</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2"><strong>Reactivos</strong></td>
                            <td colspan="2"><strong>Correctas</strong></td>
                            <td colspan="2"><strong>Incorrectas</strong></td>
                        </tr>
                        <tr>
                            <td>Semejanzas</td>
                            <td>Diferencias</td>
                            <td>5</td>
                            <td>5</td>
                            <td>${correctas_semejanzas}</td>
                            <td>${correctas_diferencias}</td>
                            <td>${incorrectas_semejanzas}</td>
                            <td>${incorrectas_diferencias}</td>
                        </tr>
                        <tr>
                            <td colspan="2">Distincion de colores</td>
                            <td colspan="2">10</td>
                            <td colspan="2">${correctas_distincion_colores}</td>
                            <td colspan="2">${incorrectas_distincion_colores}</td>
                        </tr>
                        <tr>
                            <td colspan="2">Total</td>
                            <td colspan="2">20</td>
                            <td colspan="2">${total_correctas}</td>
                            <td colspan="2">${total_incorrectas}</td>
                        </tr>
                    </table>
                    <table style="width:500px; border: black 5px solid;" border="1">
                        <tr>
                            <td>
                                Riesgo de dislexia: ${tiene_riesgo_dislexia}
                            </td>
                            <td>
                                Grado: ${grado_dislexia}
                            </td>
                            ${riesgo_dislexia}
                        </tr>
                    </table>
                <h3><u>Semejanzas y diferencias</u></h3>
                <table style="width:500px; border: black 5px solid;" border="1">
                    <tr>
                        <td>Ejercicio</td>
                        <td>Referencia</td>
                        <td>Respuesta 1</td>
                        <td>Respuesta 2</td>
                        <td>Respuesta 3</td>
                        <td>Respuesta 4</td>
                        <td>Respuesta 5</td>
                    </tr>
                    <tr>
                        <td>Semejanza</td>
                        <td><img src='${referencia_semejanza}' width='80%'></td>
                        <td><img src='${img_res1}' width='80%'></td>
                        <td><img src='${img_res2}' width='80%'></td>
                        <td><img src='${img_res3}' width='80%'></td>
                        <td><img src='${img_res4}' width='80%'></td>
                        <td><img src='${img_res5}' width='80%'></td>
                    </tr>
                    <tr>
                        <td>Diferencias</td>
                        <td><img src='${referencia_diferencias}' width='80%'></td>
                        <td><img src='${img_res1_dif}' width='80%'></td>
                        <td><img src='${img_res2_dif}' width='80%'></td>
                        <td><img src='${img_res3_dif}' width='80%'></td>
                        <td><img src='${img_res4_dif}' width='80%'></td>
                        <td><img src='${img_res5_dif}' width='80%'></td>
                    </tr>
                </table>
                <h3><u>Distinción de colores</u></h3>
                <p> Color amarillo tuvo ${vm.valor_ejercicio3.amarillo} buenas de 2  </p>
                <p> Color Naranja tuvo ${vm.valor_ejercicio3.anaranjado} buenas de 2  </p>
                <p> Color Azul tuvo ${vm.valor_ejercicio3.azul} buenas de 2  </p>
                <p> Color Verde tuvo ${vm.valor_ejercicio3.verde} buenas de 2  </p>
                <p> Color Rojo tuvo ${vm.valor_ejercicio3.rojo} buenas de 2  </p>
                </html>
            `, options)
                .then((stats)=> console.log('status', stats) )   // ok..., ok if it was able to handle the file to the OS.  
                .catch((err)=>console.log(err))
        }
    }
</script>