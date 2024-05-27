<template>
    <button :class="props.class" @click="onClick" :type="props.type">{{ props.text }}</button>
</template>
   
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    text: String,
    type: {
        type: String,
        default: 'button',
    },
    class: String
});

const emit = defineEmits<{
    (e: 'clicked'): void;
}>();

const onClick = () => {
    emit('clicked');
};
</script>
