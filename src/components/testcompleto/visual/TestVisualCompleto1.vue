<template>
    <v-container fluid grid-list-md>
        <v-layout row justify-space-around class="pt-4">
            <v-flex class="text-xs-center" xs2>
                <img   src="../../../assets/imagenes/visual/mono1.png" width="100%">
            </v-flex>

            <v-flex xs2>
                <draggable
                    class="row wrap fill-height align-center sortable-list"
                    :list="list1"
                    :change="observable"
                    style="background: #130101; height: 80px; width: 80px; opacity: 0.5; border-radius: 10px"
                    :group="{ name: 'people', pull: pullFunction }"
                    @start="start"
                >
                </draggable>
            </v-flex>
        </v-layout>
        <v-layout row justify-space-around class="pt-5">
            <draggable  class="layout wrap list-group" :sort="false" :list="list2" group="people">
                <v-flex xs2  v-for="element in list2" :key="element.id">                        
                    <img :src="getImgUrl(element.img)" width="90%"/>
                </v-flex>
            </draggable>
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
            list1: [],
            list2: [
                {   id: 1,
                    name: "Luc",
                    img: 'mono1.png',
                    correcto: true
                },
                { 
                    id: 2,
                    name: "Thomas",
                    img: 'mono2.png',
                    correcto: false
                },
                { 
                    id: 3,
                    name: "John", 
                    img: 'mono1.png',
                    correcto: true
                },
                { 
                    id: 4,
                    name: "John", 
                    img: 'mono4.png',
                    correcto: false
                },
                { 
                    id: 5,
                    name: "John", 
                    img: 'mono1.png',
                    correcto: true
                },
                { 
                    id: 6,
                    name: "John", 
                    img: 'mono6.png',
                    correcto: false
                },
                {   id: 7,
                    name: "Luc",
                    img: 'mono2.png',
                    correcto: false
                },
                { 
                    id: 8,
                    name: "Thomas",
                    img: 'mono1.png',
                    correcto: true
                },
                { 
                    id: 9,
                    name: "John", 
                    img: 'mono3.png',
                    correcto: false
                },
                { 
                    id: 10,
                    name: "John", 
                    img: 'mono1.png',
                    correcto: true
                },
                { 
                    id: 11,
                    name: "John", 
                    img: 'mono5.png',
                    correcto: false
                },
                { 
                    id: 12,
                    name: "John", 
                    img: 'mono1.png',
                    correcto: true
                }   
            ],
            controlOnStart: true,
            valor_ejercicio1: this.$route.query.valor_ejercicio1,
            valor_ejercicio2: this.$route.query.valor_ejercicio2,
            valor_ejercicio3: this.$route.query.valor_ejercicio3,
            valor_ejercicio4: this.$route.query.valor_ejercicio4,
            valor_ejercicio5: this.$route.query.valor_ejercicio5,
            valor_ejercicio6: this.$route.query.valor_ejercicio6,
            valor_ejercicio7: this.$route.query.valor_ejercicio7,
            valor_ejercicio8: this.$route.query.valor_ejercicio8,
            valor_ejercicio9: this.$route.query.valor_ejercicio9
        }
    },
    computed: {
        observable(){
            let vm = this;
            let amount = 0;
            let result = 0;
            if(vm.list1.length == 5){
                for(let i in vm.list1){
                    if(vm.list1[i].correcto == true){
                        amount +=1;
                    }
                }
                result = amount == 5 ? 1:0;
                console.log(vm.list1);
                //vm.$router.push({ path: `/testvisual2/${result}`});

                vm.$router.push({ path: `/testvisualcompleto2/`,
                    query: {
                        valor_ejercicio1: vm.valor_ejercicio1,
                        valor_ejercicio2: vm.valor_ejercicio2,
                        valor_ejercicio3: vm.valor_ejercicio3,
                        valor_ejercicio4: vm.valor_ejercicio4,
                        valor_ejercicio5: vm.valor_ejercicio5,
                        valor_ejercicio6: vm.valor_ejercicio6,
                        valor_ejercicio7: vm.valor_ejercicio7,
                        valor_ejercicio8: vm.valor_ejercicio8,
                        valor_ejercicio9: vm.valor_ejercicio9,
                        valor_ejercicio1_visual: {
                            punteo: result,
                            datos_ejercicio1: vm.list1
                        }
                    } 
                });
            }
        }

    },
    created(){
        let vm = this;
        vm.playSound('encontrar_mono.mp3');
    },
    methods:{
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