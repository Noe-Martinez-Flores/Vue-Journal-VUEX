<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3">julio</span>
      <span class="mx-2 fs-4 fw-light">2023, jueves</span>
    </div>
    <div>
      <button class="btn btn-danger mx-2">
        Borrar
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <button class="btn btn-primary">
        Subir Foto
        <i class="fa-solid fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder=" Que sucedio el dia de hoy ? "></textarea>
  </div>
  <Fab icon = "fa-floppy-disk"/>
  <img src="https://www.treehugger.com/thmb/mcPhNcFlot9e20yY_kQYDR6_MG8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1247807601-14960e5e6ba04ce6b4d8d211b5d74dd4.jpg" alt=""
    class="img-thumbnail"
  >
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },
}
</script>

<style lang="scss" scoped>
textarea {
  font-size:  20px;
  border : none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
