<template>
    <v-container fluid>
        <div class="text-xs-center">
            <v-layout>
                <v-flex xs4>
                    <v-btn color="#3F51B5" medium dark @click="palabraSeleccionada('hipoqótamo')" :disabled="disable">hipoqótamo</v-btn>
                </v-flex>
                <v-flex xs4>
                    <v-btn color="#009688" medium dark @click="palabraSeleccionada('hipapatámo')" class="white--text" :disabled="disable">hipapatámo</v-btn>
                </v-flex>
                <v-flex xs4>
                    <v-btn color="#33691E" medium dark @click="palabraSeleccionada('hipopótamo')" :disabled="disable">hipopótamo</v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs6>
                    <v-btn color="#FF9800" medium dark  @click="palabraSeleccionada('hipopólamo')" :disabled="disable">hipopólamo</v-btn>
                </v-flex>
                <v-flex xs6>
                    <v-btn color="#01579B" medium dark  @click="palabraSeleccionada('hiqoqótamo')" :disabled="disable">hiqoqótamo</v-btn>
                </v-flex>
            </v-layout>
        </div>
        <v-layout class="text-xs-center">
            <v-flex xs12 sm6 offset-sm3>
                <img src="../../../assets/imagenes/fonologica/ejercicio2/hipopotamo.png" width="30%"  @click.prevent="playSound('Hipopotamo.mp3')"/>
               </v-flex>
        </v-layout>
        <v-form >
            <v-container>
            <v-layout>
                <v-flex
                xs12
                md4
                >
                <v-text-field
                 v-model="hipopotamo"
                 disabled
                 id="styled-input"
                ></v-text-field>
                </v-flex>
            </v-layout>
            </v-container>
        </v-form>
    </v-container>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            hipopotamo:'',
            disable: false,
            valor_ejercicio1: {},
            valor_ejercicio2: {},
            valor_ejercicio3: {},
            valor_ejercicio4: {},
            valor_ejercicio5: {},
            valor_ejercicio6: {},
            valor_ejercicio7: {},
            puntuacion: 0,
            contador_s: 0,
            contador_m: 0
        }
    },
    created(){
        console.log(this.$route);
        let vm = this;
        vm.valor_ejercicio1 = this.$route.query.valor_ejercicio1;
        vm.valor_ejercicio2 = this.$route.query.valor_ejercicio2;
        vm.valor_ejercicio3 = this.$route.query.valor_ejercicio3;
        vm.valor_ejercicio4 = this.$route.query.valor_ejercicio4;
        vm.valor_ejercicio5 = this.$route.query.valor_ejercicio5;
        vm.valor_ejercicio6 = this.$route.query.valor_ejercicio6;
        vm.valor_ejercicio7 = this.$route.query.valor_ejercicio7;
    },
     mounted(){
     let vm = this;
     vm.carga();
    },
    methods: {
        playSound (sound) {
            if(sound) {
                var audio = new Audio(require('../../../assets/audios/fonologica/ejercicio2/'+sound));
                audio.play();
            }
       },
       palabraSeleccionada(texto){
           let vm = this;
           console.log("PALABRA SELECCIONADA");
           console.log(texto)
           vm.hipopotamo = texto;
           vm.disable = true;

           vm.puntuacion = vm.hipopotamo == 'hipopótamo' ? vm.puntuacion+=1: 0;

           let obj = {
               puntuacion_ej8: vm.puntuacion,
               minutos_ej8: vm.contador_m,
               segundos_ej8: vm.contador_s
           }

           if(vm.disable){
            setTimeout(function(){
                vm.$router.push({ path: '/testfonologicocompleto9/',
                query: {
                    valor_ejercicio1: vm.valor_ejercicio1,
                    valor_ejercicio2: vm.valor_ejercicio2,
                    valor_ejercicio3: vm.valor_ejercicio3,
                    valor_ejercicio4: vm.valor_ejercicio4,
                    valor_ejercicio5: vm.valor_ejercicio5,
                    valor_ejercicio6: vm.valor_ejercicio6,
                    valor_ejercicio7: vm.valor_ejercicio7,
                    valor_ejercicio8: obj,
                  } 
                });
                },3000);
           }
       },
       carga(){
            let vm = this;
            vm.cronometro = setInterval(
            function(){
                if(vm.contador_s==60){
                    vm.contador_s=0;
                    vm.contador_m++;
                    if(vm.contador_m==60)
                    {
                        vm.contador_m=0;

                    }
                }
                vm.contador_s++;
            }
            ,1000);
       }
    }
}
</script>