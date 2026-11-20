<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue'
import NbsIcon from '@/components/NbsIcon.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: 'error',
  },
  close: {
    type: Boolean,
    default: false,
  },
  autoclose: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object, Boolean,],
    default: false,
  },
})
const emit = defineEmits(['onClose',])
const isVisible = ref(props.isVisible)
const closePercent = ref(0)

const closeAlert = () => {
  isVisible.value = false
  emit('onClose')
}

onMounted(() => {
  if (props.autoclose) {
    let i = 0
    const int = setInterval(() => {
      i++
      closePercent.value = i
      if (i === 100) {
        clearInterval(int)
        closeAlert()
      }
    }, 60)
  }
})
</script>

<template>
  <transition>
    <div
      v-if="isVisible"
      class="nbs-alert"
      :class="['nbs-alert--' + props.type, { 'nbs-alert--rounded': props.rounded }]"
    >
      <nbs-icon
        v-if="props.icon"
        :icon="props.icon.name"
        :size="props.icon.size.toString()"
        class="nbs-alert-icon"
      />
      <div class="nbs-alert-content">
        <div
          v-if="$slots.title"
          class="nbs-alert-title h4"
        >
          <slot name="title" />
        </div>
        <div
          v-if="$slots.default"
          class="nbs-alert-desc"
        >
          <slot />
        </div>
      </div>
      <button
        v-if="props.close"
        class="nbs-alert-close"
        style="--bd:4px;"
        @click="closeAlert"
      >
        <nbs-icon
          icon="rounded-delete"
          size="32"
        />
      </button>
    </div>
  </transition>
</template>

<style lang="scss">
@use '@/assets/styles/_functions.scss';
@use '@/assets/styles/_variables.scss';
.nbs-alert {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: functions.toRem(32px);
  text-align: center;
  color: variables.$white;

  &--rounded {
    border-radius: functions.toRem(12px);
  }

  &--info {
    background-color: variables.$blue;
  }

  &--warning {
    background-color: variables.$orange;
  }

  &--error {
    background-color: variables.$red;
  }

  &--success {
    background-color: variables.$green;
  }

  &-content {
    flex: 1 1 auto;
    margin-bottom: functions.toRem(32px);
  }

  &-icon {
    margin-bottom: functions.toRem(24px);
  }

  &-title {
      margin: 0;
      font-size: functions.toRem(24px);
  }

  &-desc {
    font-size: functions.toRem(20px);
  }

  &-close {
    --w: functions.toRem(32px);
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    border: 0;
    padding: 0;
    width: var(--w);
    height: var(--w);
    line-height: 1;
    color: variables.$white;

    &::before{
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 0;
      background: conic-gradient(variables.$white calc(v-bind('closePercent')*1%),#0000 0);
      -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - var(--bd)),#000 calc(100% - var(--bd)));
          mask:radial-gradient(farthest-side,#0000 calc(99% - var(--bd)),#000 calc(100% - var(--bd)));

    }
  }
}
</style>
