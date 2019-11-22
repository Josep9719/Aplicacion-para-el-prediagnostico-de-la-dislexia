<template>
    <v-container fluid grid-list-md>
        <h1 class="white--text text-align-center">Para tomar agua necesito...</h1>
        <v-layout row justify-space-around class="pt-5">
            <draggable  class="layout wrap list-group" :sort="false" :list="list2" group="people">
                <v-flex xs2  v-for="element in list2" :key="element.id">                        
                    <img :src="getImgUrl(element.img)" width="90%"/>
                </v-flex>
            </draggable>
        </v-layout>
        <v-layout>
            <v-flex xs12>
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
                    name: "ventana",
                    img: 'ventana.png',
                    correcto: false
                },
                { 
                    id: 3,
                    name: "vaso", 
                    img: 'vaso.png',
                    correcto: true
                },
                { 
                    id: 2,
                    name: "perro",
                    img: 'perro.png',
                    correcto: false
                }
            ],
            controlOnStart: true,
            resultado_ejercicio3: this.$route.params.result3,
            valor_ejercicio1: this.$route.query.valor_ejercicio1,
            valor_ejercicio2: this.$route.query.valor_ejercicio2
        }
    },
    computed: {
        observable(){
            let vm = this;
            let amount = 0;
            let result = 0;
            if(vm.list1.length == 1){
                for(let i in vm.list1){
                    if(vm.list1[i].correcto == true){
                        amount=1;
                    }
                }
                console.log(vm.list1);
                console.log(amount);
                let result = amount+parseInt(vm.resultado_ejercicio3);
                //vm.$router.push({ path: `/testprofundo5/${result}`});
                vm.$router.push({ path: `/testprofundo5/`,
                    query: {
                        valor_ejercicio1: vm.valor_ejercicio1,
                        valor_ejercicio2: {
                            ejercicio2_1: vm.valor_ejercicio2.ejercicio2_1,
                            ejercicio2_2: vm.valor_ejercicio2.ejercicio2_2,
                            ejercicio2_3: {
                                data: vm.list1,
                                punteo: amount
                            }
                        }
                    } 
                });
            }
        }
    },
    created(){
        let vm =this;
        vm.playSound('para_tomar_agua_necesito.mp3');
    },
    methods:{
        getImgUrl(pic) {
            return require('../../assets/imagenes/profunda/ejercicio2/'+pic)
        },
        playSound (sound) {
            if(sound) {
                var audio = new Audio(require('../../assets/audios/profunda/'+sound));
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