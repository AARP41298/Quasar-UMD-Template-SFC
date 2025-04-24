<script>

import component4 from '/components/component4.vue'

export default {
  name: 'Page4',
  components: {component4},

  setup() {
    const title = 'Page Four'
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
    <component4></component4>
  </q-page>

</template>