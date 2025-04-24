<script>
import component2 from '/components/component2.vue'

export default {
  name: 'Page2',
  components: {component2},

  setup() {
    const title = 'Page Two'
    return {title}
  },
};
</script>

<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/"/>
      <q-breadcrumbs-el :label="title"/>
    </q-breadcrumbs>
    <component2></component2>
  </q-page>
</template>