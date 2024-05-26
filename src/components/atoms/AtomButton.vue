<template>
    <button :class="props.class" @click="onClick" :type="props.type">{{ props.text }}</button>
</template>
   
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    text: String,
    type: {
        type: String,
        default: 'button',
    },
    class: String
});

const emit = defineEmits(['clicked']);

const onClick = () => {
    emit('clicked');
};
</script>