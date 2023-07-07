<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isNotAgree: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '500px',
  },
});

const emit = defineEmits(['update:model-value', 'close-dialog', 'save']);

const handleClose = () => {
  emit('update:model-value', false);
  emit('close-dialog');
};

const handleSave = () => {
  emit('save');
};
</script>

<template>
  <div class="text-center">
    <v-dialog
      :model-value="modelValue"
      :width="width"
      persistent
    >
      <v-card>
        <v-card-title v-if="title" class="pl-6 pr-3 d-flex justify-space-between align-center">
          <span v-html="title"/>

          <v-btn v-if="!isNotAgree" icon="mdi-close" variant="plain" @click="handleClose"/>
        </v-card-title>

        <v-divider/>

        <v-card-text class="p-0">
          <slot/>
        </v-card-text>

        <template v-if="showFooter">
          <v-divider/>

          <v-card-actions>
            <v-spacer/>

            <slot name="footer">
              <v-btn color="error" @click="handleClose">
                Cancel
              </v-btn>

              <v-btn color="primary" @click="handleSave">
                Save
              </v-btn>
            </slot>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
