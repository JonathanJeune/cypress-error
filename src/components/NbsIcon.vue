<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  folder: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '16',
  },
  position: {
    type: String,
    default: '',
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

const colorClass = computed(() => {
  return props.color ? 'icon--' + props.color : ''
})

const positionClass = computed(() => {
  return props.position ? 'icon--' + props.position : ''
})

const hiddenClass = computed(() => {
  return props.hidden ? 'icon--hidden' : ''
})

const folderPath = computed(() => {
  return props.folder ? props.folder + '/' : ''
})

const iconAnchor = computed(() => {
  return (props.folder ? '' : 'src--assets--icons--') + props.icon
})
</script>

<template>
  <svg
    class="icon"
    :class="[props.iconClass, colorClass, positionClass, hiddenClass]"
    :style="`--size: ${props.size}px;`"
  >
    <use v-bind="{ 'xlink:href': '/sprite/' + folderPath + 'defs/svg/sprite.' + (props.folder ? 'defs' : 'css') + '.svg#' + iconAnchor }" />
  </svg>
</template>

<style lang="scss">
@use '@/assets/styles/_functions.scss';
@use '@/assets/styles/_variables.scss';

.icon {
  width: var(--size);
  height: var(--size);
  vertical-align: middle;

  &--left {
    margin-right: functions.toRem(8px);
  }

  &--right {
    margin-left: functions.toRem(8px);
  }

  &--hidden {
    visibility: hidden;
  }

  &--white {
    color: variables.$white;
  }

  &--light {
    color: variables.$black-32;
  }

  &--medium {
    color: variables.$black-48;
  }

  &--dark {
    color: variables.$black-88;
  }

  &--grey {
    color: variables.$grey;
  }

  &--red {
    color: variables.$red
  }

  &--orange {
    color: variables.$orange
  }

  &--green {
    color: variables.$green
  }

  &--purple {
    color: variables.$purple;
  }

  &--blue {
    color: variables.$blue;
  }

  &--blue-pure {
    color: variables.$blue-pure;
  }

  &--pink {
    color: variables.$pink;
  }
}
</style>
