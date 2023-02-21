<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ year }}</span>
      </div>
      <div>
        <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDelete">
          Borrar
          <i class="fa-solid fa-trash-can"></i>
        </button>

        <input type="file"
        @change="uploadImage"
        ref="imageSelector"
        v-show="false">


        <button class="btn btn-primary"
        @click="pressButon">
          Subir Foto
          <i class="fa-solid fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div  class="d-flex flex-column px-3 h-75">
      <textarea
        placeholder=" Que sucedio el dia de hoy ? "
        v-model="entry.text"
      ></textarea>
    </div>
  </template>

  <Fab icon="fa-floppy-disk" @on:click="saveEntry"/>

  <img
    :src="entry.picture"
    alt=""
    class="img-thumbnail"
  />

  <img
    v-if="localImage"
    :src="localImage"
    alt=""
    class="img-thumbnail"
  />

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthDay'
import Swal from 'sweetalert2'
import uploadImagetoCloudDinary from '@/modules/daybook/helpers/uploadImage'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },
  data() {
    return {
      entry: null,
      localImage : null,
      file : null
    }
  },
  computed: {
    ...mapGetters('journal', ['getEntriesById']),
    day() {
      const { day } = getDayMonthYear(this.entry.date)
      return day
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date)
      return month
    },
    year() {
      const { year } = getDayMonthYear(this.entry.date)
      return year
    },
  },
  methods: {
    ...mapActions('journal',['updateEntries','createEntries','deleteEntry']),
    
    getEntry() {
      let entry 

      if (this.id === 'new'){
        entry = {
          text : '',
          date : new Date().getTime()
        }
      }else{

        entry = this.getEntriesById(this.id)

        if (!entry) return this.$router.push({ name: 'no-entry' })

      }

      this.entry = entry
    },
    async saveEntry() {
      new Swal({
        title : 'wait please ...',
        allowOutsideClick : false
      })
      Swal.showLoading();

      const picture = await uploadImagetoCloudDinary(this.file)
      this.entry.picture = picture
      const entry = this.entry;
      if (this.entry.id){
        this.updateEntries(entry)
      }else{
          const id = await this.createEntries( entry );
          this.$router.push({ name : 'entry-enter', params : { id } } )
      }
      this.file = null
      Swal.fire('Guardado','Entrada registrada','success')
      
    },
    async onDelete () {

      const {isConfirmed} = await Swal.fire({
        title : `Esta seguro de eliminar este registro`,
        text : 'Una vez borrado no se podra modificar',
        showDenyButton : true,
        confirmButtonText : 'Si, estoy seguro',
        confirmButtonColor : '#53C6FC',
      })

      if ( isConfirmed ) {
        new Swal({
          title : 'Epere un momento',
          allowOutsideClick : true,
        }),
        Swal.showLoading()

        await this.deleteEntry( this.entry.id )
        this.$router.push({ name : 'no-entry'})

        Swal.fire('Borrado','','success')
      }

      
    },

    uploadImage( event ){
     console.log(event)
      const file = event.target.files[0]
      
      console.log(file)
      if ( !file ) {
        this.localImage = null
        this.file = null
        return 
      }

      this.file = file
      const fr = new FileReader()

      fr.onload = () => this.localImage = fr.result
    
      fr.readAsDataURL( file )

      console.log('picture', this.localImage);
      


    },

    pressButon(){
      this.$refs.imageSelector.click()
    }
  },
  created() {
    this.getEntry()
  },
  watch: {
    id() {
      this.getEntry()
    },
  },
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
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
