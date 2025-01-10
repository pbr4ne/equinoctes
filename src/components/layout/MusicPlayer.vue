<template>
    <div class="music-player">
      <audio hidden ref="audio" :loop="true">
        <source src="../../assets/ethereal.mp3" type="audio/mpeg" />
      </audio>
      <button @click="toggleMusic" class="icon-music-button">
        <MusicNoteOutlined v-if="musicOn" />
        <MusicOffOutlined v-else />
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue';
  import { MusicNoteOutlined, MusicOffOutlined } from '@vicons/material';
  
  const audio = ref<HTMLAudioElement | null>(null);
  const musicOn = ref(false);
  
  const FADE_DURATION = 2000;
  const FADE_INTERVAL = 100;
  
  let fadeIntervalId: number | null = null;
  
  const toggleMusic = () => {
    if (musicOn.value) {
      fadeOut();
    } else {
      fadeIn();
    }
  };
  
  const fadeIn = () => {
    if (!audio.value) return;
  
    audio.value.volume = 0;
    audio.value.play().catch((error) => {
      console.error('Error playing audio:', error);
      musicOn.value = false;
    });
  
    const step = FADE_INTERVAL / FADE_DURATION;
  
    if (fadeIntervalId !== null) {
      clearInterval(fadeIntervalId);
    }
  
    fadeIntervalId = window.setInterval(() => {
      if (audio.value) {
        if (audio.value.volume < 0.3) {
          audio.value.volume = Math.min(audio.value.volume + step, 1);
        } else {
          clearInterval(fadeIntervalId as number);
          fadeIntervalId = null;
        }
      }
    }, FADE_INTERVAL);
  
    musicOn.value = true;
  };
  
  const fadeOut = () => {
    if (!audio.value) return;
  
    const step = FADE_INTERVAL / FADE_DURATION;
  
    if (fadeIntervalId !== null) {
      clearInterval(fadeIntervalId);
    }
  
    fadeIntervalId = window.setInterval(() => {
      if (audio.value) {
        if (audio.value.volume > 0) {
          audio.value.volume = Math.max(audio.value.volume - step, 0);
        } else {
          clearInterval(fadeIntervalId as number);
          fadeIntervalId = null;
          audio.value.pause();
        }
      }
    }, FADE_INTERVAL);
  
    musicOn.value = false;
  };
  
  onBeforeUnmount(() => {
    if (fadeIntervalId !== null) {
      clearInterval(fadeIntervalId);
    }
  });
  </script>
  
  <style scoped>
  .icon-music-button {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    z-index: 700;
    background-color: #264653;
    border-color: #caf0f8;
    color: #caf0f8;
    }
  </style>
  