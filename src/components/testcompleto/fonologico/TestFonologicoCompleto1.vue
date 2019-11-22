<template>
    <v-container fluid>
        <div class="text-xs-center">
            <v-btn color="#3F51B5" dark @click.prevent="playSoundVocales('A.mp3')" :disabled="disable" large>a</v-btn>
            <v-btn color="#009688" class="white--text" @click.prevent="playSoundVocales('E.mp3')" :disabled="disable" large>e</v-btn>
            <v-btn color="#33691E" dark @click.prevent="playSoundVocales('I.mp3')" :disabled="disable" large>i</v-btn>
            <v-btn color="#FF9800" dark @click.prevent="playSoundVocales('O.mp3')" :disabled="disable" large>o</v-btn>
            <v-btn color="#01579B" dark @click.prevent="playSoundVocales('U.mp3')" :disabled="disable" large>u</v-btn>
        </div>
        <v-layout class="text-xs-center">
            <v-flex xs12 sm6 offset-sm3>
                <img src="../../../assets/imagenes/fonologica/ejercicio1/arania.png"  @click.prevent="playSound('Arania.mp3')" width="50%"/>
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
                 v-model="arania.a"
                 disabled
                 id="styled-input"
                ></v-text-field>
                </v-flex>

                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="arania.r"
                  disabled
                  id="styled-input2"
                ></v-text-field>
                </v-flex>

                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="arania.a2"
                  disabled
                  id="styled-input3"
                ></v-text-field>
                </v-flex>
                
                <v-flex
                xs12
                md4
                >
                <v-text-field
                 v-model="arania.n"
                 disabled
                 id="styled-input4"
                ></v-text-field>
                </v-flex>
                
                <v-flex
                xs12
                md4
                >
                <v-text-field
                  v-model="arania.a3"
                  disabled
                  id="styled-input5"
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
            arania: {
                a: 'a',
                r: 'r',
                a2: '',
                n: 'ñ',
                i: 'i',
                a3: '',
            },
            disable: false,
            puntuacion: 0,
            cronometro: '',
            contador_s: 0,
            contador_m: 0
        }
    },
    mounted(){
        let vm = this;
        vm.carga();
        vm.playSound('INDICACIONES_EJ1.mp3');
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
                vm.evaluarTexto(sound);
                var audio = new Audio(require('../../../assets/audios/vocales/'+sound));
                audio.play();
            }
       },
       evaluarTexto(vocal){
           let vm = this;
           let texto = vocal == "A.mp3" ? 'a':
                       vocal == "E.mp3" ? 'e':
                       vocal == "I.mp3" ? 'i':
                       vocal == "O.mp3" ? 'o': 'u';

        if(vm.arania.a2){
            vm.arania.a3 = texto;
        }
        else {
            vm.arania.a2 = texto;
        }


         vm.disable     =   vm.arania.a2 != '' && vm.arania.a3 !='' ? true: false;

         vm.puntuacion  =   vm.arania.a2 == 'a' ? vm.puntuacion+=1:
                            vm.arania.a3 == 'a' ? vm.puntuacion+=1: 0;

        let obj = {
            puntuacion_ej1: vm.puntuacion,
            minutos_ej1: vm.contador_m,
            segundos_ej1: vm.contador_s
        }
          if(vm.disable){
            setTimeout(function(){
                vm.$router.push({ path: `/testfonologicocompleto2/`,
                query: {valor_ejercicio1: obj} 
                });
            }, 3000);
          }

       },
       carga(){
            let vm = this;
        //s = document.getElementById("segundos");
        //m = document.getElementById("minutos");
        vm.cronometro = setInterval(
            function(){
                if(vm.contador_s==60){
                    vm.contador_s=0;
                    vm.contador_m++;
                    //m.innerHTML = contador_m;
                    if(vm.contador_m==60)
                    {
                        vm.contador_m=0;

                    }
                }
                //s.innerHTML = contador_s;
                vm.contador_s++;
            }
            ,1000);

       }
    }
}
</script>
<style>
  /* .v-text-field input {
    font-size: 2.7em;
  }
  .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot input {
    color: white;
    font-weight: 600;
  } */
  .v-btn__content {
    font-size: 20pt;
  }
  .v-input input {
    max-height: 120px;
  }

  #styled-input-jabon {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input-gus {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input-gus2 {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input-gus3 {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }
  #styled-input-gus4 {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }
  #styled-input-gus5 {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }
  #styled-input-gus6 {
    height: 110px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }
  
  #styled-input {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input2 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input3 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input4 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input5 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input6 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input7 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

  #styled-input8 {
    height: 80px;
    font-size: 70pt;
    color: white;
    font-weight: 600;
  }

</style>