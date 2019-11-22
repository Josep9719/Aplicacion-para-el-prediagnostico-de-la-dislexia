<template>
    <v-container fluid>
        <div class="text-xs-center">
            <v-btn color="#3F51B5" large dark @click.prevent="playSoundVocales('A.mp3')" :disabled="disable">a</v-btn>
            <v-btn color="#009688" large dark class="white--text" @click.prevent="playSoundVocales('E.mp3')" :disabled="disable">e</v-btn>
            <v-btn color="#33691E" large dark @click.prevent="playSoundVocales('I.mp3')" :disabled="disable">i</v-btn>
            <v-btn color="#FF9800" large dark @click.prevent="playSoundVocales('O.mp3')" :disabled="disable">o</v-btn>
            <v-btn color="#01579B" large dark @click.prevent="playSoundVocales('U.mp3')" :disabled="disable">u</v-btn>
        </div>
        <v-layout class="text-xs-center">
            <p>{{resultado}}</p>
            <v-flex xs12 sm6 offset-sm3>
                <img src="../../../assets/imagenes/fonologica/ejercicio1/leon.png" width="50%"  @click.prevent="playSound('Leon.mp3')"/>
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
                 v-model="leon.l"
                 disabled
                 id="styled-input"
                ></v-text-field>
                </v-flex>

                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="leon.e"
                  disabled
                  id="styled-input2"
                ></v-text-field>
                </v-flex>

                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="leon.o"
                  disabled
                  id="styled-input3"
                ></v-text-field>
                </v-flex>
                
                <v-flex
                xs12
                md4
                >
                <v-text-field
                 v-model="leon.n"
                 disabled
                 id="styled-input4"
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
            leon: {
                l: 'l',
                e: '',
                o: '',
                n: 'n'
            },
            disable: false,
            resultado: this.$route.params.resultado1,
            valor_ejercicio1: {},
            cronometro: '',
            puntuacion: 0,
            contador_s: 0,
            contador_m: 0
        }
    },
    created(){
        console.log(this.$route);
        let vm = this;
        vm.valor_ejercicio1 = this.$route.query.valor_ejercicio1;

    },
    mounted(){
        let vm = this;
         vm.carga();
    },
    methods: {
        validarPalabra(){
            let vm = this;
        },
        playSound (sound) {
            if(sound) {
                var audio = new Audio(require('../../../assets/audios/fonologica/ejercicio1/'+sound));
                audio.play();
            }
       },
        playSoundVocales (sound) {
            let vm = this;
            if(sound) {
                console.log("sound");
                console.log(sound);
                vm.evaluarTexto(sound);
                var audio = new Audio(require('../../../assets/audios/vocales/'+sound));
                audio.play();
            }
       },
       evaluarTexto(vocal){
           let vm = this;
           console.log("EVALUAR");
           console.log(vocal);
           let texto = vocal == "A.mp3" ? 'a':
                       vocal == "E.mp3" ? 'e':
                       vocal == "I.mp3" ? 'i':
                       vocal == "O.mp3" ? 'o': 'u';

            console.log(texto); 
        
        if(vm.leon.e){ vm.leon.o = texto;}
        else { vm.leon.e = texto; }
        
         vm.disable = vm.leon.e != '' && vm.leon.o != '' ? true: false;

         vm.puntuacion  =   vm.leon.e == 'e' ? vm.puntuacion+=1:
                            vm.leon.o == 'o' ? vm.puntuacion+=1: 0;
        
        let obj = {
            puntuacion_ej2: vm.puntuacion,
            minutos_ej2: vm.contador_m,
            segundos_ej2: vm.contador_s
        }

        if(vm.disable){
            setTimeout(function(){
                vm.$router.push({ path: `/testfonologicocompleto3/`,
                    query: {
                        valor_ejercicio1: vm.valor_ejercicio1,
                        valor_ejercicio2: obj
                    } 
                });
            }, 3000);
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