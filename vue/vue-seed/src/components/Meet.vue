<template>
  <div>
    <p>{{name}}</p>
    <p>{{products}}</p>
    <p>{{total}}</p>
    <p>{{checkoutStatus}}</p>
    <p>
      <button @click="handleProducts">触发Vuex的action事件</button>
    </p>
    <p>
      {{userInfo}}
    </p>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: '会议模块'
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      products: 'allProducts',
      checkoutStatus: 'checkoutStatus',
      userInfo: 'userInfo'
    }),
    total () {
      return "哈哈哈："+this.products;
    }
  },
  methods: {
    handleProducts () {
      this.$store.dispatch('submitProducts', [1,2,3,4,5])
    }
  }
}
</script>
