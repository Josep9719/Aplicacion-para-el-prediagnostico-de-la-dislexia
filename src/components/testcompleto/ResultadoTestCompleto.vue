<template>
    <div>
        <h1>RESULTADO TEST COMPLETO</h1>
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
            logo_actual: 'logo.jpeg',
            ref_semejanza: 'mono1.png',
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
            valor_ejercicio1_profundo: this.$route.query.valor_ejercicio1_profundo,
            valor_ejercicio2_profundo: this.$route.query.valor_ejercicio2_profundo,
            valor_ejercicio3_profundo: this.$route.query.valor_ejercicio3_profundo
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
        let img_b64 = await vm.convertirImagen64(vm.logo_actual);

        //--------------------------- RESULTADOS TEST FONOLOGICO --------------------------
            //Resultados 'Completar palabras'
            let sum_completar_palabras1 = vm.valor_ejercicio1.puntuacion_ej1 == 2 ? 1:0;
            let sum_completar_palabras2 = vm.valor_ejercicio2.puntuacion_ej2 == 2 ? 1:0;
            let sum_completar_palabras3 = vm.valor_ejercicio3.puntuacion_ej3 == 2 ? 1:0;
            let sum_completar_palabras4 = vm.valor_ejercicio4.puntuacion_ej4 == 3 ? 1:0;
            let sum_completar_palabras5 = vm.valor_ejercicio5.puntuacion_ej5 == 3 ? 1:0;
            let result_completar_palabras_correctas = sum_completar_palabras1+sum_completar_palabras2+sum_completar_palabras3+sum_completar_palabras4+sum_completar_palabras5;
            let result_completar_palabras_incorrectas = 5-result_completar_palabras_correctas;
            //----------------------------------
            //Resultados 'Diferencias entre palabras'
            let result_diferencia_palabras_correctas = vm.valor_ejercicio6.puntuacion_ej6 + vm.valor_ejercicio7.puntuacion_ej7+vm.valor_ejercicio8.puntuacion_ej8+vm.valor_ejercicio9.puntuacion_ej9;
            let result_diferencia_palabras_incorrectas = 4-result_diferencia_palabras_correctas;
            //---------------------------------------

            //Totales - fonologico
            let total_correctas_fonologico = result_completar_palabras_correctas+result_diferencia_palabras_correctas;
            let total_incorrectas_fonologico = result_completar_palabras_incorrectas+result_diferencia_palabras_incorrectas;
            //-----------

            //Riesgo de dislexia fonologica
            let riesgo_dislexia_fonologica = total_incorrectas_fonologico <= 1 ? 
            '<td style="background-color: #00FE1B; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            total_incorrectas_fonologico == 2 ? 
            '<td style="background-color: #FEEB00; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            '<td style="background-color: #FF0B0B; border: 1px solid orange; height: 36px; width: 80px;"></td>';

            let grado_dislexia_fonologica = total_incorrectas_fonologico <=1 ? '0':
                                total_incorrectas_fonologico ==2 ? '1':'2'

            let tiene_riesgo_dislexia_fonologica = total_incorrectas_fonologico <=1 ? 'No':
                                                total_incorrectas_fonologico ==2 ? 'No':'Si';
            //-------------------------------
        //------------------------------------------------------------------------------------------------
        //--------------------------- RESULTADOS TEST VISUAL ---------------------------------------------
            let correctas_semejanzas = 0;
            let correctas_diferencias = 0;
            let referencia_semejanza = await vm.convertirImagen64(vm.ref_semejanza);
            let referencia_diferencias = await vm.convertirImagen64('carlos1.png');

            //Repuestas semejanzas
            let img_res1 = await vm.convertirImagen64(vm.valor_ejercicio1_visual.datos_ejercicio1[4].img);
            let img_res2 = await vm.convertirImagen64(vm.valor_ejercicio1_visual.datos_ejercicio1[3].img);
            let img_res3 = await vm.convertirImagen64(vm.valor_ejercicio1_visual.datos_ejercicio1[2].img);
            let img_res4 = await vm.convertirImagen64(vm.valor_ejercicio1_visual.datos_ejercicio1[1].img);
            let img_res5 = await vm.convertirImagen64(vm.valor_ejercicio1_visual.datos_ejercicio1[0].img);

            for(let i in vm.valor_ejercicio1_visual.datos_ejercicio1){
                if(vm.valor_ejercicio1_visual.datos_ejercicio1[i].correcto){
                    correctas_semejanzas +=1;
                }
            }
            let incorrectas_semejanzas = 5-correctas_semejanzas;
            //--------------------

            //Respuestas diferencias
            let img_res1_dif = await vm.convertirImagen64(vm.valor_ejercicio2_visual.datos_ejercicio2[4].img);
            let img_res2_dif = await vm.convertirImagen64(vm.valor_ejercicio2_visual.datos_ejercicio2[3].img);
            let img_res3_dif = await vm.convertirImagen64(vm.valor_ejercicio2_visual.datos_ejercicio2[2].img);
            let img_res4_dif = await vm.convertirImagen64(vm.valor_ejercicio2_visual.datos_ejercicio2[1].img);
            let img_res5_dif = await vm.convertirImagen64(vm.valor_ejercicio2_visual.datos_ejercicio2[0].img);

            for(let i in vm.valor_ejercicio2_visual.datos_ejercicio2){
                if(vm.valor_ejercicio2_visual.datos_ejercicio2[i].correcto == false){
                    correctas_diferencias +=1;
                }
            }
            let incorrectas_diferencias = 5-correctas_diferencias;
            //----------------------

            //Respuesta distincion de colores
            let correctas_distincion_colores = vm.valor_ejercicio3_visual.amarillo + vm.valor_ejercicio3_visual.anaranjado + vm.valor_ejercicio3_visual.azul + vm.valor_ejercicio3_visual.rojo + vm.valor_ejercicio3_visual.verde;
            let incorrectas_distincion_colores = 10-correctas_distincion_colores;
            //-------------------------------
            
            //Totales - visual
            let total_correctas_visual =  correctas_semejanzas + correctas_diferencias + correctas_distincion_colores;
            let total_incorrectas_visual = 20-total_correctas_visual;
            //--------------------


            //Riesgo de dislexia
            let riesgo_dislexia_visual = total_incorrectas_visual <= 1 ? 
            '<td style="background-color: #00FE1B; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            total_incorrectas_visual == 2 ? 
            '<td style="background-color: #FEEB00; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            '<td style="background-color: #FF0B0B; border: 1px solid orange; height: 36px; width: 80px;"></td>';

            let grado_dislexia_visual = total_incorrectas_visual <=1 ? '0':
                                        total_incorrectas_visual ==2 ? '1':'2'

            let tiene_riesgo_dislexia_visual = total_incorrectas_visual <=1 ? 'No':
                                               total_incorrectas_visual ==2 ? 'No':'Si';
            //---------------------------
        //----------------------------------------------------------------------------------------------
        //--------------------------------- RESULTADOS TEST PROFUNDA -----------------------------------
            //relacion grafema y fonema
            let correctas_fonema = vm.valor_ejercicio1_profundo.punteo;
            let incorrectas_fonema = 5-correctas_fonema;
            //----------------------

            //Completar la frase
            let correctas_completar_frase = vm.valor_ejercicio2_profundo.ejercicio2_1.punteo + vm.valor_ejercicio2_profundo.ejercicio2_2.punteo + vm.valor_ejercicio2_profundo.ejercicio2_3.punteo;
            let incorrectas_completar_frase = 3-correctas_completar_frase;
            //-------------------------

            //Lateralidad
            let correctas_lateralidad = vm.valor_ejercicio3_profundo.ejercicio3_1.punteo + vm.valor_ejercicio3_profundo.ejercicio3_2.punteo;
            let incorrectas_lateralidad = 2-correctas_lateralidad;

            //-------------------

            //Lateralidad
            let letra_e = await vm.convertirImagen64(vm.valor_ejercicio3_profundo.ejercicio3_1.data[0].img);
            let letra_m = await vm.convertirImagen64(vm.valor_ejercicio3_profundo.ejercicio3_2.data[0].img);
            //-----------

            //Totales
            let total_correctas_profunda = correctas_completar_frase + correctas_lateralidad + correctas_fonema;
            let total_incorrectas_profunda = 10-total_correctas_profunda;
            //----------


            //Riesgo dislexia - profunda
            let riesgo_dislexia_profunda = total_incorrectas_profunda <= 1 ? 
            '<td style="background-color: #00FE1B; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            total_incorrectas_profunda == 2 ? 
            '<td style="background-color: #FEEB00; border: 1px solid orange; height: 36px; width: 80px;"></td>':
            '<td style="background-color: #FF0B0B; border: 1px solid orange; height: 36px; width: 80px;"></td>';

            let grado_dislexia_profunda = total_incorrectas_profunda <=1 ? '0':
                                        total_incorrectas_profunda ==2 ? '1':'2'

            let tiene_riesgo_dislexia_profunda = total_incorrectas_profunda <=1 ? 'No':
                                                total_incorrectas_profunda ==2 ? 'No':'Si';
            //--------------------------
        //----------------------------------------------------------------------------------------------



        let fecha = new Date();
        let fecha_actual = fecha.getDate() +"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+" hrs"; 

        let options = {
            documentSize: 'A4',
            type: 'share',
            fileName: 'myFile.pdf'
        }
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
                                <strong>Dislexia fonológica</strong>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><strong>Reactivos</strong></td>
                            <td><strong>Correctas</strong></td>
                            <td><strong>Incorrectas</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Completar palabras</strong></td>
                            <td>5</td>
                            <td>${result_completar_palabras_correctas}</td>
                            <td>${result_completar_palabras_incorrectas}</td>
                        </tr>
                        <tr>
                            <td><strong>Diferencias entre palabras</strong></td>
                            <td>4</td>
                            <td>${result_diferencia_palabras_correctas}</td>
                            <td>${result_diferencia_palabras_incorrectas}</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td>9</td>
                            <td>${total_correctas_fonologico}</td>
                            <td>${total_incorrectas_fonologico}</td>
                        </tr>
                    </table>
                    <table style="width:500px; border: black 5px solid;" border="1">
                        <tr>
                            <td>
                                Riesgo de dislexia: ${tiene_riesgo_dislexia_fonologica}
                            </td>
                            <td>
                                Grado: ${grado_dislexia_fonologica}
                            </td>
                            ${riesgo_dislexia_fonologica}
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
                            <td colspan="2">${total_correctas_visual}</td>
                            <td colspan="2">${total_incorrectas_visual}</td>
                        </tr>
                    </table>
                    <table style="width:500px; border: black 5px solid;" border="1">
                        <tr>
                            <td>
                                Riesgo de dislexia: ${tiene_riesgo_dislexia_visual}
                            </td>
                            <td>
                                Grado: ${grado_dislexia_visual}
                            </td>
                            ${riesgo_dislexia_visual}
                        </tr>
                    </table>
                    <table style="width:100%; border: black 5px solid;" border="1">
                        <tr>
                            Dislexia profunda
                        </tr>
                        <tr>
                            <td></td>
                            <td>Reactivos</td>
                            <td>Correctas</td>
                            <td>Incorrectas</td>
                        </tr>
                        <tr>
                            <td>Relación grafema y fonema</td>
                            <td>5</td>
                            <td>${correctas_fonema}</td>
                            <td>${incorrectas_fonema}</td>
                        </tr>
                        <tr>
                            <td>Completar la frase</td>
                            <td>3</td>
                            <td>${correctas_completar_frase}</td>
                            <td>${incorrectas_completar_frase}</td>
                        </tr>
                        <tr>
                            <td>Lateralidad</td>
                            <td>2</td>
                            <td>${correctas_lateralidad}</td>
                            <td>${incorrectas_lateralidad}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>10</td>
                            <td>${total_correctas_profunda}</td>
                            <td>${total_incorrectas_profunda}</td>
                        </tr>
                    </table>
                    <table style="width:500px; border: black 5px solid;" border="1">
                        <tr>
                            <td>
                                Riesgo de dislexia: ${tiene_riesgo_dislexia_profunda}
                            </td>
                            <td>
                                Grado: ${grado_dislexia_profunda}
                            </td>
                            <td>
                                ${riesgo_dislexia_profunda}
                            </td>
                        </tr>
                    </table> 
                    <h3><u>Completar palabras</u></h3>
                    <p> 1. Araña duración   ${vm.valor_ejercicio1.minutos_ej1}:${vm.valor_ejercicio1.segundos_ej1} min.</p>
                    <p> 2. Leon duración    ${vm.valor_ejercicio2.minutos_ej2}:${vm.valor_ejercicio2.segundos_ej2} min.</p>
                    <p> 3. Perro duración   ${vm.valor_ejercicio3.minutos_ej3}:${vm.valor_ejercicio3.segundos_ej3} min.</p>
                    <p> 4. Caballo duración ${vm.valor_ejercicio4.minutos_ej4}:${vm.valor_ejercicio4.segundos_ej4} min.</p>
                    <p> 5. Gusano duración  ${vm.valor_ejercicio5.minutos_ej5}:${vm.valor_ejercicio5.segundos_ej5} min.</p>
                    <h3><u>Diferencias entre palabras</u></h3>
                    <p> 6. Barco duración   ${vm.valor_ejercicio6.minutos_ej6}:${vm.valor_ejercicio6.segundos_ej6} min.</p>
                    <p> 7. Jabón duración   ${vm.valor_ejercicio7.minutos_ej7}:${vm.valor_ejercicio7.segundos_ej7} min.</p>
                    <p> 8. Hipopótamo       ${vm.valor_ejercicio8.minutos_ej8}:${vm.valor_ejercicio8.segundos_ej8} min.</p>
                    <p> 9. Helicóptero      ${vm.valor_ejercicio9.minutos_ej9}:${vm.valor_ejercicio9.segundos_ej9} min.</p>  
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
                    <p> Color amarillo tuvo ${vm.valor_ejercicio3_visual.amarillo} buenas de 2  </p>
                    <p> Color Naranja tuvo ${vm.valor_ejercicio3_visual.anaranjado} buenas de 2  </p>
                    <p> Color Azul tuvo ${vm.valor_ejercicio3_visual.azul} buenas de 2  </p>
                    <p> Color Verde tuvo ${vm.valor_ejercicio3_visual.verde} buenas de 2  </p>
                    <p> Color Rojo tuvo ${vm.valor_ejercicio3_visual.rojo} buenas de 2  </p>
                    <h3><u>Relación grafema y fonema</u></h3>
                    <p>1.- ${vm.valor_ejercicio1_profundo.text_result1}.</p>
                    <p>2.- ${vm.valor_ejercicio1_profundo.text_result2}.</p>
                    <p>3.- ${vm.valor_ejercicio1_profundo.text_result3}.</p>
                    <p>4.- ${vm.valor_ejercicio1_profundo.text_result4}.</p>
                    <p>5.- ${vm.valor_ejercicio1_profundo.text_result5}.</p>
                    <h3><u>Completar la frase</u></h3>
                    <p>1.- Para dormir necesito... ${vm.valor_ejercicio2_profundo.ejercicio2_1.data[0].name}</p>
                    <p>2.- Para sentarme necesito... ${vm.valor_ejercicio2_profundo.ejercicio2_2.data[0].name}</p>
                    <p>3.- Para beber agua necesito...${vm.valor_ejercicio2_profundo.ejercicio2_3.data[0].name}</p>
                    <h3><u>Lateralidad</u></h3>
                    <table style="width:100%; border: black 5px solid;" border="1">
                        <tr>
                            <td><img src='${letra_e}' width="40%"></td>
                            <td><img src='${letra_m}' width="40%"></td>
                        </tr>
                    </table>  
                </html>
            `, options)
                .then((stats)=> console.log('status', stats) )   // ok..., ok if it was able to handle the file to the OS.  
                .catch((err)=>console.log(err))
    }
}
</script>