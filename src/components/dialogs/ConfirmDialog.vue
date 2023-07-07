<script setup>
import { useConfirmDialog } from '@vueuse/core';
import BaseDialog from '@/components/base/BaseDialog.vue';

const {
  reveal,
  confirm,
} = useConfirmDialog();

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
  message: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:model-value', 'confirm-value']);

const handleAgreement = async () => {
  const { data, isCanceled } = await reveal();

  if (!isCanceled) {
    data ? emit('confirm-value') : emit('update:model-value', false);
  }
};
</script>

<template>
  <teleport to="#app">
    <BaseDialog
      :model-value="modelValue"
      :title="title"
      :width="'auto'"
      is-not-agree
      @close-dialog="emit('update:model-value', false)"
    >
      <h3 class="text-center">
        {{ message }}
      </h3>

      <template #footer>
        <v-btn
          color="red-darken-1"
          variant="text"
          @click="handleAgreement(), confirm(false)"
        >
          No
        </v-btn>

        <v-btn
          color="green-darken-1"
          variant="text"
          @click="handleAgreement(), confirm(true)"
        >
          Yes
        </v-btn>
      </template>
    </BaseDialog>
  </teleport>
</template>
