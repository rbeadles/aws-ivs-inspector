<template>
  <div class="col body-spacing q-gutter-y-lg">
    <div class="col">
      <div class="row q-col-gutter-md text-h6">
        <q-item-section class="col-12 col-sm">
          <q-item-label> Setting </q-item-label>
        </q-item-section>

        <q-item-section class="col-12 col-sm-auto">
          <q-item-label> Coming Soon </q-item-label>
        </q-item-section>
      </div>
      <q-separator />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSettingStore } from "src/stores/store-settings";

export default defineComponent({
  name: "BackendSetting",

  setup() {
    const settingStore = useSettingStore();
    const $route = useRoute();

    onMounted(() => {});
    return {};
  },

  components: {},
});
</script>
