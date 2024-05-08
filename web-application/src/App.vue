<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "App",

  setup() {
    onMounted(() => {
      console.log("env var:", JSON.parse(Object.values(import.meta.env)[0]));
    });
  },
});
</script>
