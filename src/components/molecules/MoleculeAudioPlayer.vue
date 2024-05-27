<template>
  <div class="audio-player">
    <AtomButton text="Reproducir Sonido" :clicked="playAudio"/>
    <audio ref="audio">
      <source :src="src" type="audio/ogg">
    </audio>
  </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import AtomButton from '../atoms/AtomButton.vue';

defineProps<{
  src: string;
}>();

const audio = ref<HTMLAudioElement | null>(null);

const playAudio = async () => {
  if (audio.value) {
    await audio.value.play();
  }
};

onMounted(async () => {
  if (audio.value) {
    await audio.value.play();
  }
});
</script>
  
<style scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
