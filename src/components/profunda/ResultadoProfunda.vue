<template>
    <div>
        <v-layout class="text-xs-center">
            <h1>Resultados</h1>
             <v-flex xs12 sm4 text-center>
                <div class="my-2">
                    <img src="../../static/logo.jpeg" width="50%">
                    <v-btn depressed large color="primary" to="/">IR AL INICIO</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data(){
            return { 
                resultado_profunda: this.$route.params.resultTotal,
                logo_actual: 'logo.jpeg',
                valor_ejercicio1: this.$route.query.valor_ejercicio1,
                valor_ejercicio2: this.$route.query.valor_ejercicio2,
                valor_ejercicio3: this.$route.query.valor_ejercicio3
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

        //relacion grafema y fonema
        let correctas_fonema = vm.valor_ejercicio1.punteo;
        let incorrectas_fonema = 5-correctas_fonema;
        //----------------------

        //Completar la frase
        let correctas_completar_frase = vm.valor_ejercicio2.ejercicio2_1.punteo + vm.valor_ejercicio2.ejercicio2_2.punteo + vm.valor_ejercicio2.ejercicio2_3.punteo;
        let incorrectas_completar_frase = 3-correctas_completar_frase;
        //-------------------------

        //Lateralidad
        let correctas_lateralidad = vm.valor_ejercicio3.ejercicio3_1.punteo + vm.valor_ejercicio3.ejercicio3_2.punteo;
        let incorrectas_lateralidad = 2-correctas_lateralidad;

        //-------------------

        //Lateralidad
        let letra_e = await vm.convertirImagen64(vm.valor_ejercicio3.ejercicio3_1.data[0].img);
        let letra_m = await vm.convertirImagen64(vm.valor_ejercicio3.ejercicio3_2.data[0].img);
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
            <h3><u>Relación grafema y fonema</u></h3>
            <p>1.- ${vm.valor_ejercicio1.text_result1}.</p>
            <p>2.- ${vm.valor_ejercicio1.text_result2}.</p>
            <p>3.- ${vm.valor_ejercicio1.text_result3}.</p>
            <p>4.- ${vm.valor_ejercicio1.text_result4}.</p>
            <p>5.- ${vm.valor_ejercicio1.text_result5}.</p>
            <h3><u>Completar la frase</u></h3>
            <p>1.- Para dormir necesito... ${vm.valor_ejercicio2.ejercicio2_1.data[0].name}</p>
            <p>2.- Para sentarme necesito... ${vm.valor_ejercicio2.ejercicio2_2.data[0].name}</p>
            <p>3.- Para beber agua necesito...${vm.valor_ejercicio2.ejercicio2_3.data[0].name}</p>
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