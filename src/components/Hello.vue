<template>
  <div>
    这里是测试页面一
    <p>{{item}}</p>
    <router-link to="/hello1">链接到测试页面二</router-link>
  </div>
</template>

<script>
export default {
  asyncData: ({ store }) => {
    return store.dispatch('getDataAction')
  },
  computed: {
    item () {
      return this.$store.state.lists
    }
  }
}
</script>

<style lang="scss" scoped>
</style>