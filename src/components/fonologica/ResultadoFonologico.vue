<template>
    <v-container fluid>
        <v-layout class="text-xs-center">
            <h1>Resultados</h1>
             <v-flex xs12 sm4 text-center>
                <div class="my-2">
                    <img src="../../static/logo.jpeg" width="50%">
                    <v-btn depressed large color="primary" to="/">IR AL INICIO</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            helicoptero:'',
            disable: false,
            valor_ejercicio1: {},
            valor_ejercicio2: {},
            valor_ejercicio3: {},
            valor_ejercicio4: {},
            valor_ejercicio5: {},
            valor_ejercicio6: {},
            valor_ejercicio7: {},
            valor_ejercicio8: {},
            valor_ejercicio9: {},
            puntuacion: 0,
            contador_s: 0,
            contador_m: 0,
            logo_actual: 'logo.jpeg'
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

        console.log(this.$route);
        let img_b64 = await vm.convertirImagen64(vm.logo_actual);
          
        vm.valor_ejercicio1 = vm.$route.query.valor_ejercicio1;
        vm.valor_ejercicio2 = vm.$route.query.valor_ejercicio2;
        vm.valor_ejercicio3 = vm.$route.query.valor_ejercicio3;
        vm.valor_ejercicio4 = vm.$route.query.valor_ejercicio4;
        vm.valor_ejercicio5 = vm.$route.query.valor_ejercicio5;
        vm.valor_ejercicio6 = vm.$route.query.valor_ejercicio6;
        vm.valor_ejercicio7 = vm.$route.query.valor_ejercicio7;
        vm.valor_ejercicio8 = vm.$route.query.valor_ejercicio8;
        vm.valor_ejercicio9 = vm.$route.query.valor_ejercicio9;

        //Resultados 'Completar palabras'
        let sum_completar_palabras1 = vm.valor_ejercicio1.puntuacion_ej1 == 2 ? 1:0;
        let sum_completar_palabras2 = vm.valor_ejercicio2.puntuacion_ej2 == 2 ? 1:0;
        let sum_completar_palabras3 = vm.valor_ejercicio3.puntuacion_ej3 == 2 ? 1:0;
        let sum_completar_palabras4 = vm.valor_ejercicio4.puntuacion_ej4 == 3 ? 1:0;
        let sum_completar_palabras5 = vm.valor_ejercicio5.puntuacion_ej5 == 3 ? 1:0;
        let result_completar_palabras_correctas = sum_completar_palabras1+sum_completar_palabras2+sum_completar_palabras3+sum_completar_palabras4+sum_completar_palabras5;
        let result_completar_palabras_incorrectas = 5-result_completar_palabras_correctas;
        let minutos_completar_palabras = vm.valor_ejercicio1.minutos_ej1+vm.valor_ejercicio2.minutos_ej2+vm.valor_ejercicio3.minutos_ej3+vm.valor_ejercicio4.minutos_ej4+vm.valor_ejercicio5.minutos_ej5;
        let segundos_completar_palabras = vm.valor_ejercicio1.segundos_ej1+vm.valor_ejercicio2.segundos_ej2+vm.valor_ejercicio3.segundos_ej3+vm.valor_ejercicio4.segundos_ej4+vm.valor_ejercicio5.segundos_ej5;
        //----------------------------------
        //Resultados 'Diferencias entre palabras'
        let result_diferencia_palabras_correctas = vm.valor_ejercicio6.puntuacion_ej6 + vm.valor_ejercicio7.puntuacion_ej7+vm.valor_ejercicio8.puntuacion_ej8+vm.valor_ejercicio9.puntuacion_ej9;
        let result_diferencia_palabras_incorrectas = 4-result_diferencia_palabras_correctas;
        let minutos_diferencia_palabras = vm.valor_ejercicio6.minutos_ej6+vm.valor_ejercicio7.minutos_ej7+vm.valor_ejercicio8.minutos_ej8+vm.valor_ejercicio9.minutos_ej9;
        let segundos_diferencia_palabras = vm.valor_ejercicio6.segundos_ej6+vm.valor_ejercicio7.segundos_ej7+vm.valor_ejercicio8.segundos_ej8+vm.valor_ejercicio9.segundos_ej9;
        //---------------------------------------

        //Totales
        let total_correctas = result_completar_palabras_correctas+result_diferencia_palabras_correctas;
        let total_incorrectas = result_completar_palabras_incorrectas+result_diferencia_palabras_incorrectas;
        let tiempo_totalM = minutos_completar_palabras+minutos_diferencia_palabras;
        let tiempo_totalS = segundos_completar_palabras+segundos_diferencia_palabras;
        //-----------

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
                            <td><strong>Duración</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Completar palabras</strong></td>
                            <td>5</td>
                            <td>${result_completar_palabras_correctas}</td>
                            <td>${result_completar_palabras_incorrectas}</td>
                            <td>${minutos_completar_palabras} min ${segundos_completar_palabras} seg.</td>
                        </tr>
                        <tr>
                            <td><strong>Diferencias entre palabras</strong></td>
                            <td>4</td>
                            <td>${result_diferencia_palabras_correctas}</td>
                            <td>${result_diferencia_palabras_incorrectas}</td>
                            <td>${minutos_diferencia_palabras} min ${segundos_diferencia_palabras} seg.</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td>9</td>
                            <td>${total_correctas}</td>
                            <td>${total_incorrectas}</td>
                            <td>${tiempo_totalM} min ${tiempo_totalS} seg.</td>
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
            </html>
        `, options)
            .then((stats)=> console.log('status', stats) )   // ok..., ok if it was able to handle the file to the OS.  
            .catch((err)=>console.log(err))
    },
}
</script>