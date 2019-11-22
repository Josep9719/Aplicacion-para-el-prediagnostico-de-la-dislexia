import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import HelloWorld from '../components/HelloWorld'
import TestFonologico from '../components/fonologica/TestFonologico'
import TestFonologico2 from '../components/fonologica/TestFonologico2'
import TestFonologico3 from '../components/fonologica/TestFonologico3'
import TestFonologico4 from '../components/fonologica/TestFonologico4'
import TestFonologico5 from '../components/fonologica/TestFonologico5'

import TestFonologico6 from '../components/fonologica/ejercicio2/Testfonologico6'
import TestFonologico7 from '../components/fonologica/ejercicio2/Testfonologico7'
import TestFonologico8 from '../components/fonologica/ejercicio2/Testfonologico8'
import TestFonologico9 from '../components/fonologica/ejercicio2/Testfonologico9'
import ResultadoFonologico from '../components/fonologica/ResultadoFonologico'

import TestVisual1 from '../components/visual/ejercicio1/TestVisual1'
import TestVisual2 from '../components/visual/ejercicio1/TestVisual2'
import TestVisual3 from '../components/visual/ejercicio1/TestVisual3'
import ResultadoVisual from '../components/visual/ResultadoVisual'

import TestProfundo1 from '../components/profunda/TestProfundo1'
import TestProfundo2 from '../components/profunda/TestProfundo2'
import TestProfundo3 from '../components/profunda/TestProfundo3'
import TestProfundo4 from '../components/profunda/TestProfundo4'
import TestProfundo5 from '../components/profunda/TestProfundo5'
import TestProfundo6 from '../components/profunda/TestProfundo6'
import ResultadoProfunda from '../components/profunda/ResultadoProfunda'

import TestFonologicoCompleto1 from '../components/testcompleto/fonologico/TestFonologicoCompleto1'
import TestFonologicoCompleto2 from '../components/testcompleto/fonologico/TestFonologicoCompleto2'
import TestFonologicoCompleto3 from '../components/testcompleto/fonologico/TestFonologicoCompleto3'
import TestFonologicoCompleto4 from '../components/testcompleto/fonologico/TestFonologicoCompleto4'
import TestFonologicoCompleto5 from '../components/testcompleto/fonologico/TestFonologicoCompleto5'
import TestFonologicoCompleto6 from '../components/testcompleto/fonologico/TestFonologicoCompleto6'
import TestFonologicoCompleto7 from '../components/testcompleto/fonologico/TestFonologicoCompleto7'
import TestFonologicoCompleto8 from '../components/testcompleto/fonologico/TestFonologicoCompleto8'
import TestFonologicoCompleto9 from '../components/testcompleto/fonologico/TestFonologicoCompleto9'

import TestVisualCompleto1 from '../components/testcompleto/visual/TestVisualCompleto1'
import TestVisualCompleto2 from '../components/testcompleto/visual/TestVisualCompleto2'
import TestVisualCompleto3 from '../components/testcompleto/visual/TestVisualCompleto3'

import TestProfundoCompleto1 from '../components/testcompleto/profunda/TestProfundoCompleto1'
import TestProfundoCompleto2 from '../components/testcompleto/profunda/TestProfundoCompleto2'
import TestProfundoCompleto3 from '../components/testcompleto/profunda/TestProfundoCompleto3'
import TestProfundoCompleto4 from '../components/testcompleto/profunda/TestProfundoCompleto4'
import TestProfundoCompleto5 from '../components/testcompleto/profunda/TestProfundoCompleto5'
import TestProfundoCompleto6 from '../components/testcompleto/profunda/TestProfundoCompleto6'
import ResultadoTestCompleto from '../components/testcompleto/ResultadoTestCompleto.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/helloworld',
      name: 'helloworld',
      component: HelloWorld
    },
    {
      path: '/testfonologico',
      name: 'testfonologico',
      component: TestFonologico
    },
    {
      path: '/testfonologico2/',
      name: 'testfonologico2',
      component: TestFonologico2
    },
    {
      path: '/testfonologico3/',
      name: 'testfonologico3',
      component: TestFonologico3
    },
    {
      path: '/testfonologico4/',
      name: 'testfonologico4',
      component: TestFonologico4
    },
    {
      path: '/testfonologico5/',
      name: 'testfonologico5',
      component: TestFonologico5
    },
    {
      path: '/testfonologico6',
      name: 'testfonologico6',
      component: TestFonologico6
    },
    {
      path: '/testfonologico7',
      name: 'testfonologico7',
      component: TestFonologico7
    },
    {
      path: '/testfonologico8',
      name: 'testfonologico8',
      component: TestFonologico8
    },
    {
      path: '/testfonologico9',
      name: 'testfonologico9',
      component: TestFonologico9
    },
    {
      path: '/resultadofonologico',
      name: 'resultadofonologico',
      component: ResultadoFonologico
    },
    {
      path: '/testvisual',
      name: 'testvisual',
      component: TestVisual1
    },
    {
      path: '/testvisual2/',
      name: 'testvisual2',
      component: TestVisual2
    },
    {
      path: '/testvisual3/',
      name: 'testvisual3',
      component: TestVisual3
    },
    {
      path: '/resultadovisual/',
      name: 'resultadoVisual',
      component: ResultadoVisual
    },
    {
      path: '/testprofundo/',
      name: 'testprofundo',
      component: TestProfundo1
    },
    {
      path: '/testprofundo2/',
      name: 'testprofundo2',
      component: TestProfundo2
    },
    {
      path: '/testprofundo3/',
      name: 'testprofundo3',
      component: TestProfundo3
    },
    {
      path: '/testprofundo4/',
      name: 'testprofundo4',
      component: TestProfundo4
    },
    {
      path: '/testprofundo5/',
      name: 'testprofundo5',
      component: TestProfundo5
    },
    {
      path: '/testprofundo6/',
      name: 'testprofundo6',
      component: TestProfundo6
    },
    {
      path: '/resultadoprofunda/',
      name: 'resultadoprofunda',
      component: ResultadoProfunda
    },
    //----- Rutas test completo -----
    {
      path: '/testfonologicocompleto1',
      name: 'testfonologicocompleto1',
      component: TestFonologicoCompleto1
    },
    {
      path: '/testfonologicocompleto2',
      name: 'testfonologicocompleto2',
      component: TestFonologicoCompleto2
    },
    {
      path: '/testfonologicocompleto3',
      name: 'testfonologicocompleto3',
      component: TestFonologicoCompleto3
    },
    {
      path: '/testfonologicocompleto4',
      name: 'testfonologicocompleto4',
      component: TestFonologicoCompleto4
    },
    {
      path: '/testfonologicocompleto5',
      name: 'testfonologicocompleto5',
      component: TestFonologicoCompleto5
    },
    {
      path: '/testfonologicocompleto6',
      name: 'testfonologicocompleto6',
      component: TestFonologicoCompleto6
    },
    {
      path: '/testfonologicocompleto7',
      name: 'testfonologicocompleto7',
      component: TestFonologicoCompleto7
    },
    {
      path: '/testfonologicocompleto8',
      name: 'testfonologicocompleto8',
      component: TestFonologicoCompleto8
    },
    {
      path: '/testfonologicocompleto9',
      name: 'testfonologicocompleto9',
      component: TestFonologicoCompleto9
    },
    {
      path: '/testvisualcompleto1',
      name: 'testvisualcompleto1',
      component: TestVisualCompleto1
    },
    {
      path: '/testvisualcompleto2',
      name: 'testvisualcompleto2',
      component: TestVisualCompleto2
    },
    {
      path: '/testvisualcompleto3',
      name: 'testvisualcompleto3',
      component: TestVisualCompleto3
    },
    {
      path: '/testprofundocompleto1',
      name: 'testprofundocompleto1',
      component: TestProfundoCompleto1
    },
    {
      path: '/testprofundocompleto2',
      name: 'testprofundocompleto2',
      component: TestProfundoCompleto2
    },
    {
      path: '/testprofundocompleto3',
      name: 'testprofundocompleto3',
      component: TestProfundoCompleto3
    },
    {
      path: '/testprofundocompleto4',
      name: 'testprofundocompleto4',
      component: TestProfundoCompleto4
    },
    {
      path: '/testprofundocompleto5',
      name: 'testprofundocompleto5',
      component: TestProfundoCompleto5
    },
    {
      path: '/testprofundocompleto6',
      name: 'testprofundocompleto6',
      component: TestProfundoCompleto6
    },
    {
      path: '/resultadotestcompleto',
      name: 'resultadotestcompleto',
      component: ResultadoTestCompleto
    }    
    //-------------------------------
  ]
})
