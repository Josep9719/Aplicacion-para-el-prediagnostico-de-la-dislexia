<template>
    <v-container fluid grid-list-md>
        <v-layout row justify-space-around class="pt-3">
            <draggable  class="layout wrap list-group" :sort="false" :list="list2" group="people">
                <v-flex xs2  v-for="element in list2" :key="element.id">                        
                    <img :src="getImgUrl(element.img)" width="50%"/>
                </v-flex>
            </draggable>
        </v-layout>
                <v-layout row justify-space-around class="pt-3">
            <v-flex xs2>
                <draggable
                    class="row wrap fill-height align-center sortable-list"
                    :list="list_orange"
                    :change="observable"
                    style="background: rgb(255, 82, 0); height: 100px; width: 80px; border-radius: 10px;"
                    :group="{ name: 'people', pull: pullFunction }"
                    @start="start"
                >
                <v-flex xs2  v-for="element in list_orange" :key="element.id">                        
                    <img :src="getImgUrl(element.img)" width="25px" style="position: absolute;"/>
                </v-flex>
                </draggable>
            </v-flex>
            <v-flex xs2>
                <draggable
                    class="row wrap fill-height align-center sortable-list"
                    :list="list_blue"
                    :change="observable"
                    style="background: #2196f3; height: 100px; width: 80px; border-radius: 10px"
                    :group="{ name: 'people', pull: pullFunction }"
                    @start="start"
                >
                    <v-flex xs2  v-for="element in list_blue" :key="element.id">                        
                        <img :src="getImgUrl(element.img)" width="25px" style="position: absolute;"/>
                    </v-flex>
                </draggable>
            </v-flex>
            <v-flex xs2>
                <draggable
                    class="row wrap fill-height align-center sortable-list"
                    :list="list_red"
                    :change="observable"
                    style="background: #ff0000; height: 100px; width: 80px; border-radius: 10px"
                    :group="{ name: 'people', pull: pullFunction }"
                    @start="start"
                >
                    <v-flex xs2  v-for="element in list_red" :key="element.id">                        
                        <img :src="getImgUrl(element.img)" width="25px" style="position: absolute;"/>
                    </v-flex>
                </draggable>
            </v-flex>
            <v-flex xs2>
                <draggable
                    class="row wrap fill-height align-center sortable-list"
                    :list="list_green"
                    :change="observable"
                    style="background: rgb(24, 206, 2); height: 100px; width: 80px; border-radius: 10px"
                    :group="{ name: 'people', pull: pullFunction }"
                    @start="start"
                >
                    <v-flex xs2  v-for="element in list_green" :key="element.id">                        
                        <img :src="getImgUrl(element.img)" width="25px" style="position: absolute;"/>
                    </v-flex>
                </draggable>
            </v-flex>
            <v-flex xs2>
                <draggable
                    class="row wrap fill-height align-center sortable-list"
                    :list="list_yellow"
                    :change="observable"
                    style="background: rgb(228, 255, 0);; height: 100px; width: 80px; border-radius: 10px"
                    :group="{ name: 'people', pull: pullFunction }"
                    @start="start"
                >
                    <v-flex xs2  v-for="element in list_yellow" :key="element.id">                        
                        <img :src="getImgUrl(element.img)" width="25px" style="position: absolute;"/>
                    </v-flex>
                </draggable>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import draggable from "vuedraggable";
export default {
    components: {
        draggable
    },
    data(){
        return {
            list_orange: [],
            list_blue: [],
            list_red: [],
            list_green: [],
            list_yellow: [],
            list2: [
                {   id: 1,
                    name: "Luc",
                    img: 'adorno.png',
                    correcto: true,
                    color: 'rojo'
                },
                { 
                    id: 2,
                    name: "Thomas",
                    img: 'anaranjado.png',
                    correcto: false,
                    color: 'anaranjado'
                },
                { 
                    id: 3,
                    name: "John", 
                    img: 'banano.png',
                    correcto: true,
                    color: 'amarillo'
                },
                { 
                    id: 4,
                    name: "John", 
                    img: 'botas.png',
                    correcto: false,
                    color: 'azul'
                },
                { 
                    id: 5,
                    name: "John", 
                    img: 'cereza.png',
                    correcto: true,
                    color: 'rojo'
                },
                { 
                    id: 6,
                    name: "John", 
                    img: 'globo.png',
                    correcto: false,
                    color: 'verde'
                },
                {   id: 7,
                    name: "Luc",
                    img: 'mariposa.png',
                    correcto: false,
                    color: 'azul'
                },
                { 
                    id: 8,
                    name: "Thomas",
                    img: 'playera.png',
                    correcto: true,
                    color: 'anaranjado'
                },
                { 
                    id: 9,
                    name: "John", 
                    img: 'sol.png',
                    correcto: false,
                    color: 'amarillo'
                },
                { 
                    id: 10,
                    name: "John", 
                    img: 'sombrero.png',
                    correcto: true,
                    color: 'verde'
                }
            ],
            controlOnStart: true,
            results_exercise1: this.$route.params.resultado1,
            results_exercise2: this.$route.params.resultado2,
            valor_ejercicio1: this.$route.query.valor_ejercicio1,
            valor_ejercicio2: this.$route.query.valor_ejercicio2,

        }
    },
    computed: {
        observable(){
            let vm = this;
                //vm.$router.push({ path: `/testvisual2/${vm.resultado}`});
                if(vm.list2.length == 0){
                    console.log("PASAR A OTRA LISTA");
                    console.log("RESULTADO EJERCICIO 1");
                    console.log(parseInt(vm.results_exercise1));
                    console.log(parseInt(vm.results_exercise2));
                    vm.results();
                }
            
        }

    },
    created(){
        let vm = this;
        vm.playSound('agrupacion_colores.mp3');
    },
    methods:{
        results(){
            let vm = this;
            let orange_dots = 0;
            let blue_dots   = 0;
            let red_dots    = 0;
            let green_dots  = 0;
            let yellow_dots = 0;
            let summation   = 0;

            for(let i in vm.list_orange){
                if(vm.list_orange[i].color === 'anaranjado'){
                    orange_dots +=1;
                }
            }

            for(let i in vm.list_blue){
                if(vm.list_blue[i].color === 'azul'){
                    blue_dots +=1;
                }
            }

            for(let i in vm.list_red){
                if(vm.list_red[i].color === 'rojo'){
                    red_dots +=1;
                }
            }

            for(let i in vm.list_green){
                if(vm.list_green[i].color === 'verde'){
                    green_dots +=1;
                }
            }

            for(let i in vm.list_yellow){
                if(vm.list_yellow[i].color === 'amarillo'){
                    yellow_dots +=1;
                }
            }

            console.log("TOTAL IMAGENES EN EL LISTADO");
            console.log(orange_dots);
            console.log(blue_dots);
            console.log(red_dots);
            console.log(green_dots);
            console.log(yellow_dots);
            summation = orange_dots + blue_dots + red_dots + green_dots + yellow_dots + parseInt(vm.results_exercise1) + parseInt(vm.results_exercise2);
            console.log(summation);
            //vm.$router.push({ path: `/resultadovisual/${summation}`});
            vm.$router.push({ path: `/resultadovisual/`,
                    query: {
                        valor_ejercicio1: vm.valor_ejercicio1,
                        valor_ejercicio2: vm.valor_ejercicio2,
                        valor_ejercicio3: {
                            amarillo: yellow_dots,
                            anaranjado: orange_dots,
                            azul: blue_dots,
                            verde: green_dots,
                            rojo: red_dots
                        }
                    } 
                });


 
        },
        getImgUrl(pic) {
            return require('../../../assets/imagenes/visual/'+pic)
        },
        playSound (sound) {
            if(sound) {
                var audio = new Audio(require('../../../assets/audios/visual/'+sound));
                audio.play();
            }
        },
        pullFunction() {
            return this.controlOnStart ? "clone" : true;
        },
        start({ originalEvent }) {
            this.controlOnStart = originalEvent.ctrlKey;
        }
    }   
}
</script>