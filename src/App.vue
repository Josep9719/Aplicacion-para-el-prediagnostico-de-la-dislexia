<template>
    <v-app>
        <v-content 
            :class="(vista =='testvisual') ? 'fondo_selva' : 
            (vista == 'testvisual2') ? 'fondo_ejercicio2_visual': 
            (vista == 'testvisual3') ? 'fondo_ejercicio3_visual':'fondo'"
        >
            <router-view></router-view>
            <div class="text-xs-center">
                <v-dialog
                 v-model="dialog"
                 width="500"
                >
                <v-card>
                    <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                    >
                    Debes completar el test
                    </v-card-title>

                    <v-card-text>
                     Por favor debes continuar con el test.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="dialog = false"
                    >
                        Entendido
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
        </v-content>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                { icon: 'home', title: 'Home', linkpath: '/' },
                { icon: 'star', title: 'Hello Vue', linkpath: '/helloworld' },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
            vista: ''
        }
    },
    created(){
        let vm = this;
        document.addEventListener("backbutton", onBackKeyDown, false);  
        function onBackKeyDown(e) { 
            e.preventDefault(); 
            //alert('Back Button is Pressed!');
            vm.dialog = true;
        }
    },
     watch: {
        $route(to, from) {
            let vm = this;
            console.log("VISTA EN LA QUE ME ENCUENTRO");
            console.log(to);
            vm.vista = to.name;
            console.log(vm.vista);
        }
    },
    methods: {
        linkto(pathname) {
            this.$router.push({ path: pathname })
        },
    }
}
</script>
<style scoped>
.fondo {
    background-image: url("static/app/fondo.jpg");
}

.fondo_selva {
    background-image: url("static/app/fondo_selva.jpg");
}
.fondo_ejercicio2_visual {
    background-image: url("static/app/fondo_ejercicio2_visual.jpg");
}
.fondo_ejercicio3_visual {
    background-image: url("static/app/fondo_ejercicio3_visual.jpg");
}
</style>
