<template>
     <v-layout justify-center>
    <v-dialog v-model="$store.state.modal_info_usuario" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Registro de usuario</span>
        </v-card-title>
        <v-card-text>
          <small>*Indican campos requeridos</small>
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            @click.prevent="guardarInfomacion(info_personal)"
            >
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                      >
                          <template v-slot:activator="{ on }">
                          <v-text-field
                              v-model="info_personal.fecha_nacimiento"
                              label="Fecha de nacimiento"
                              prepend-icon="event"
                              :rules="fechanacReg"
                              readonly
                              v-on="on"
                          ></v-text-field>
                          </template>
                          <v-date-picker
                          ref="picker"
                          v-model="info_personal.fecha_nacimiento"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                          locale="es"
                          ></v-date-picker>
                  </v-menu>
                  <v-flex xs12>
                      <v-text-field label="Nombre*" :rules="nombreReg" v-model="info_personal.nombre" prepend-icon="person" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-text-field label="Apellido paterno" :rules="apellidoPaReg" v-model="info_personal.apellido_paterno" prepend-icon="person"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-text-field label="Apellido materno" :rules="apellidoMaReg" v-model="info_personal.apellido_materno" prepend-icon="person"></v-text-field>
                  </v-flex>
                  <v-radio-group v-model="info_personal.sexo" :rules="sexoReg" row>
                      <v-radio label="Hombre" value="Hombre"></v-radio>
                      <v-radio label="Mujer" value="Mujer"></v-radio>
                  </v-radio-group>
                </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed large color="primary"  text @click="$store.state.modal_info_usuario = false">Cerrar</v-btn>
          <v-btn depressed large color="primary" @click="guardarInfomacion(info_personal)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
    data(){
        return {
            lazy: false,
            valid: true,
            date: null,
            menu: false,
            row: null,
            info_personal:{
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                fecha_nacimiento: null,
                sexo: ''
            },
            nombreReg: [
                v => !!v || 'Nombre es requerido'
            ],
            apellidoPaReg: [
                v => !!v || 'Apellido paterno es requerido'
            ],
            apellidoMaReg: [
                v => !!v || 'Apellido materno es requerido'
            ],
            fechanacReg: [
                v => !!v || 'fecha de nacimiento es requerido'
            ],
            sexoReg: [
                v => !!v || 'sexo es requerido'
            ],
        }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      guardarInfomacion(info){
          let vm = this;
          if (vm.$refs.form.validate()){ 
            console.log("GUARDAR INFORMACION");
            console.log(info);
            let fecha = new Date(info.fecha_nacimiento);
            vm.$store.state.info_personal.nombre = info.nombre;
            vm.$store.state.info_personal.apellido_paterno = info.apellido_paterno;
            vm.$store.state.info_personal.apellido_materno = info.apellido_materno;
            vm.$store.state.info_personal.fecha_nacimiento = info.fecha_nacimiento;
            vm.$store.state.info_personal.sexo = info.sexo;
            vm.$store.state.modal_info_usuario = false;
          }
      }
    },
}
</script>

