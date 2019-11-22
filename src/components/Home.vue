<template>
    <v-container grid-list-md>
        <v-btn color="primary" dark @click="$store.state.modal_info_usuario = true">Nuevo usuario</v-btn>
          <v-layout>
              <v-flex xs12>
                <v-card>
                  <v-img
                    class="white--text"
                    height="100px"
                    :src="require('../static/app/ninosjugando4.jpg')"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">Dislexia fonologica</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title>
                    <div>
                      <span class="grey--text">Realiza el test</span><br>
                      <span>La fonología estudia el sistema de los sonidos de la lengua en general, y de cada lengua en particular, incluyendo las sílabas, la entonación, la acentuación, etc., a un nivel abstracto o mental.</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn to="/testfonologico/" flat color="orange">Iniciar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
                <v-flex xs12>
                <v-card>
                  <v-img
                    class="white--text"
                    height="100px"
                    :src="require('../static/app/ninosjugando3.jpg')"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">Dislexia visual</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title>
                    <div>
                      <span class="grey--text">Number 10</span><br>
                      <span>Tiene que ver con los problemas para procesar el lenguaje. Causa problemas con la lectura, la escritura y otras habilidades.</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange" to="/testvisual/">Iniciar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex xs12>
                <v-card>
                  <v-img
                    class="white--text"
                    height="100px"
                    :src="require('../static/app/ninosjugando.jpg')"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">Dislexia profunda</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title>
                    <div>
                      <span class="grey--text">Realizar test</span><br>
                      <span>se caracteriza por dificultades en los dos tipos de procesamiento de la lectura. Ambas rutas, fonológica y visual, están dañadas, por lo que se producen tanto errores semánticos como visuales.</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange" to="/testprofundo/">Iniciar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
                <v-flex xs12>
                <v-card>
                  <v-img
                    class="white--text"
                    height="100px"
                    :src="require('../static/app/ninosjugando2.jpg')"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">Test Completo</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title>
                    <div>
                      <span class="grey--text">Realiza el test</span><br>
                      <span>Tiene que ver con los problemas para procesar el lenguaje. Causa problemas con la lectura, la escritura y otras habilidades.</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange" to="/testfonologicocompleto1/">Iniciar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
          </v-layout>
          <InformacionPrincipal></InformacionPrincipal>
    </v-container>
</template>
<script>
import InformacionPrincipal from './InformacionPrincipal.vue';
export default {
    name: 'Home',
    components:{
      InformacionPrincipal
    },
    data() {
        return {

        }
    },
    created(){
      let vm = this;
      vm.$store.state.modal_info_usuario = true
    }
}
</script>