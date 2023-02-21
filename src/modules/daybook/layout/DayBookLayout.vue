<template>
    <Navbar/>

    <div v-if="isLoading" class = "row justify-content-md-center">
        <div class = "col -3 alert-info text-center mt-5">
            Espere un momento ...
            <h3 class = "mt=2">
                <i class = "fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>

    <div v-else class="d-flex">
        <div class="col-4">
            <EntryList/>
        </div>
        <div class="col">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapState } from 'vuex';

export default {
    components : {
        Navbar : defineAsyncComponent( () => import ( '../components/NavBar.vue') ),
        EntryList : defineAsyncComponent( () => import ( '../components/EntryList.vue') ),
    },
    // Aquellas acciiones capaces de tener asyncronia se pondran dentro de 
    // los metodos
    methods : {
        ...mapActions('journal',['loadEntries']),
        
    },
    // el mapState se pondra dentro de los metodos de computacion ya que
    // solo necesitan traer datos del stroe o del state
    computed : {
        ...mapState('journal',['isLoading']),
    },
    created(){
        this.loadEntries();
    }
}
</script>