<script>
import component3 from '/components/component3.vue'

export default {
  name: 'Page3',
  components: {component3},

  setup() {
    const title = 'Page Three'
    return {title}
  },
}

</script>

<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/"/>
      <q-breadcrumbs-el :label="title"/>
    </q-breadcrumbs>
    <component3></component3>
  </q-page>
</template>