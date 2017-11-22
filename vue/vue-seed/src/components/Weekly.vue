<template>
  <div>
    <p>{{name}}</p>
    <p>{{products}}</p>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: '周报模块'
    }
  },
  computed: {
    ...mapGetters({
      products: 'allProducts'
    })
  }
}
</script>
