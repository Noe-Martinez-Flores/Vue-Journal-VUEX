<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar Entrada" v-model="term" />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button class="btn btn-primary mx-5"
        @click="$router.push({ name : 'entry-enter' ,
        params : {id : 'new'}})"
      >
        <i class="fa fa-plus-circle"></i>
        Nueva Entrada
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry v-for="entry in EntriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters } from 'vuex'

export default {
  data(){
    return { 
      term : '',
    }
  },
  components: {
    Entry: defineAsyncComponent(() => import('../components/Entry.vue')),
  },
  computed : {
    ...mapGetters('journal', ['getEntriesByTerm']),
    EntriesByTerm(){
       return this.getEntriesByTerm( this.term )
    }

  }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 110px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>
