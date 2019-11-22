<template>
    <v-container fluid>
        <div class="text-xs-center">
            <v-btn color="#3F51B5" dark @click="palabraSeleccionada('jamón')" :disabled="disable">jamón</v-btn>
            <v-btn color="#009688" dark @click="palabraSeleccionada('jabón')" class="white--text" :disabled="disable">jabón</v-btn>
            <v-btn color="#33691E" dark @click="palabraSeleccionada('jadón')" :disabled="disable">jadón</v-btn>
            <v-btn color="#FF9800" dark @click="palabraSeleccionada('jadón')" :disabled="disable">jadón</v-btn>
            <v-btn color="#01579B" dark @click="palabraSeleccionada('jafón')" :disabled="disable">jafón</v-btn>
        </div>
        <v-layout class="text-xs-center">
            <v-flex xs12 sm6 offset-sm3>
                <img src="../../../assets/imagenes/fonologica/ejercicio2/jabon.png" width="30%"  @click.prevent="playSound('Jabon.mp3')"/>
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
                 v-model="jabon"
                 disabled
                 id="styled-input-jabon"
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
            jabon:'',
            disable: false,
            valor_ejercicio1: {},
            valor_ejercicio2: {},
            valor_ejercicio3: {},
            valor_ejercicio4: {},
            valor_ejercicio5: {},
            valor_ejercicio6: {},
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
           vm.jabon = texto;
           vm.disable = true;

           vm.puntuacion = vm.jabon == 'jabón' ? vm.puntuacion+=1: 0;

           let obj = {
               puntuacion_ej7: vm.puntuacion,
               minutos_ej7: vm.contador_m,
               segundos_ej7: vm.contador_s
           }

           if(vm.disable){
            setTimeout(function(){
                vm.$router.push({ path: '/testfonologicocompleto8/',
                query: {
                    valor_ejercicio1: vm.valor_ejercicio1,
                    valor_ejercicio2: vm.valor_ejercicio2,
                    valor_ejercicio3: vm.valor_ejercicio3,
                    valor_ejercicio4: vm.valor_ejercicio4,
                    valor_ejercicio5: vm.valor_ejercicio5,
                    valor_ejercicio6: vm.valor_ejercicio6,
                    valor_ejercicio7: obj
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