<template>
  <div class="col body-spacing">
    <!-- {{ accountStore.accountQuotas }} -->

    <div class="col">
      <div class="col">
        <q-item dense class="q-px-sm text-h6">
          <q-item-section>
            <q-item-label class="text-h6"> Quotas Provisioned </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <q-separator spaced />

      <div class="flex q-gutter-sm">
        <q-item
          v-for="(quota, index) in quotasProvisioned"
          :key="index"
          class="bg-grey-2 q-pa-none border"
        >
          <q-item-section class="q-pa-md">
            <q-item-label lines="1" class="text-primary">
              {{ quota.QuotaName }}
            </q-item-label>
          </q-item-section>

          <q-item-section class="col-auto q-py-md q-px-lg text-body1 bg-white">
            <q-item-label>
              {{ quota.Value }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { useAccountStore } from "src/stores/store-account";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DashBoard",

  setup() {
    const accountStore = useAccountStore();
    const $route = useRoute();
    const ivsRegion = $route.params.region;

    const quotasProvisioned = computed(
      () => accountStore.accountQuotas[ivsRegion]
    );

    onMounted(() => {
      if (!quotasProvisioned.value?.length) {
        accountStore.getQuotaProvisioned("ivs", ivsRegion);
      }
    });

    return {
      quotasProvisioned,
      accountStore,
    };
  },

  components: {},
});
</script>
