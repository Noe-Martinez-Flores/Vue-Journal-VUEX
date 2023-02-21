<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button class="btn btn-primary" 
  @click="$emit('on:click')">
    <i class="fa fa-2x"
      :class="icon"
    ></i>
  </button>
</template>

<script>

export default {
  props : {
    icon : {
      type : String,
       default : 'fa-plus fa-beat-fade'
    } 
  },
  methods : {
    sentMessage() {
      this.$emit('saveEntry', () => {
        console.log('Will Register into Firebase');
        
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  button {
    position : fixed;
    bottom : 20px;
    right : 20px;
    height : 80px;
    width: 80px;
    border-radius: 100%;

  }
</style>