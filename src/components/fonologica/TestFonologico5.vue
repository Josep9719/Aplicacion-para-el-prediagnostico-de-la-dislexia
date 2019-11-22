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
            <v-flex xs12 sm6 offset-sm3>
                <img src="../../assets/imagenes/fonologica/ejercicio1/gusano.png" width="50%"  @click.prevent="playSound('Gusano.mp3')"/>
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
                 v-model="gusano.g"
                 disabled
                 id="styled-input-gus"
                ></v-text-field>
                </v-flex>

                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="gusano.u"
                  disabled
                  id="styled-input-gus2"
                ></v-text-field>
                </v-flex>

                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="gusano.s"
                  disabled
                  id="styled-input-gus3"
                ></v-text-field>
                </v-flex>
                
                <v-flex
                xs12
                md4
                >
                <v-text-field
                 v-model="gusano.a"
                 disabled
                 id="styled-input-gus4"
                ></v-text-field>
                </v-flex>
                <v-flex
                xs12
                md4
                >
                <v-text-field
                 v-model="gusano.n"
                 disabled
                 id="styled-input-gus5"
                ></v-text-field>
                </v-flex>
                 <v-flex
                xs12
                md4
                >
                <v-text-field
                 v-model="gusano.o"
                 disabled
                 id="styled-input-gus6"
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
            gusano: {
                g: 'g',
                u: '',
                s: 's',
                a: '',
                n: 'n',
                o: ''
            },
            disable: false,
            valor_ejercicio1: {},
            valor_ejercicio2: {},
            valor_ejercicio3: {},
            valor_ejercicio4: {},
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
                var audio = new Audio(require('../../assets/audios/fonologica/ejercicio1/'+sound));
                audio.play();
            }
       },
        playSoundVocales (sound) {
            let vm = this;
            if(sound) {
                console.log("sound");
                console.log(sound);
                vm.evaluarTexto(sound);
                var audio = new Audio(require('../../assets/audios/vocales/'+sound));
                audio.play();
            }
       },
       evaluarTexto(vocal){
           let vm = this;
           let texto = vocal == "A.mp3" ? 'a':
                       vocal == "E.mp3" ? 'e':
                       vocal == "I.mp3" ? 'i':
                       vocal == "O.mp3" ? 'o': 'u';

        if(vm.gusano.u){ 
            if(vm.gusano.a){
                vm.gusano.o = texto;
            }
            else {
                vm.gusano.a = texto;
            }
        }
        else  {
            vm.gusano.u = texto;
        }

         /* vm.gusano.u  =   vm.gusano.u  == '' ? texto:
                          vm.gusano.a  == '' ? vm.gusano.a = texto:
                          vm.gusano.o  == '' ? vm.gusano.o  = texto: ''; */
    
         vm.disable = vm.gusano.u != '' && vm.gusano.a != '' && vm.gusano.o != ''? true: false;

         vm.puntuacion  =   vm.gusano.u  == 'u' ? vm.puntuacion+=1:
                            vm.gusano.a  == 'a' ? vm.puntuacion+=1: 
                            vm.gusano.o  == 'o' ? vm.puntuacion+=1:0;
        
        let obj = {
            puntuacion_ej5: vm.puntuacion,
            minutos_ej5: vm.contador_m,
            segundos_ej5: vm.contador_s
        }
        
        if(vm.disable){
               setTimeout(function(){
             vm.$router.push({ path: '/testfonologico6/',
             query: {
                  valor_ejercicio1: vm.valor_ejercicio1,
                  valor_ejercicio2: vm.valor_ejercicio2,
                  valor_ejercicio3: vm.valor_ejercicio3,
                  valor_ejercicio4: vm.valor_ejercicio4,
                  valor_ejercicio5: obj
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