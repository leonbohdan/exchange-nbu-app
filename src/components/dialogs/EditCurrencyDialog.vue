<script setup>
import { ref, computed, watch } from 'vue';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';
import { DIALOG_TYPE } from '@/constants/dialogTypes.constants.js';
import BaseDialog from '@/components/base/BaseDialog.vue';

const savedExchangeRate = savedExchangeRateStore();

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:model-value']);

const editCurrencyFormRef = ref(null);
const editData = ref({});

watch(() => savedExchangeRate.editCurrencyDialog.editData,
  (value) => {
    if (value) {
      editData.value = {
        ...value,
      };
    }
  },
  { immediate: true },
);

const isEditType = computed(() => {
  return savedExchangeRate.editCurrencyDialog.type === DIALOG_TYPE.Edit;
});

const title = computed(() => {
  return isEditType.value ? 'Edit currency' : 'Add currency';
});

const closeDialog = () => {
  emit('update:model-value', false);
  savedExchangeRate.updateEditCurrencyDialog(false, null, null);
};

const handleSaveCurrency = () => {
  const data = {
    ...editData.value,
  };

  savedExchangeRate.setExchangeRates(data);

  closeDialog();
};
</script>

<template>
  <BaseDialog
    :model-value="modelValue"
    :title="title"
    @save="handleSaveCurrency"
    @close-dialog="closeDialog"
  >
    <v-form ref="editCurrencyFormRef">
      <v-row dense>
        <v-col cols="12" class="d-flex align-center justify-center">
          <span class="font-weight-bold mr-2">
            Date:
          </span>

          {{ editData.exchangedate }}
        </v-col>

        <v-col cols="12" class="d-flex align-center justify-center">
          {{ editData.txt }}
        </v-col>

        <v-col cols="12" class="d-flex align-center justify-center">
          {{ editData.cc }}: 1

          <v-icon size="small" icon="mdi-arrow-right" class="mx-6"/>

          UAH: {{ editData.rate }}
        </v-col>
      </v-row>
    </v-form>
  </BaseDialog>
</template>
