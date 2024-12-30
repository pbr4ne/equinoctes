<template>
  <div class="split-screen">
    <div class="side day">
      <n-card title="Day">
        Day
      </n-card>
    </div>

    <div class="side night">
      <n-card title="Night">
        Night
      </n-card>
    </div>
  </div>
</template>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.split-screen {
  display: flex;
  height: 100vh;
}

.side {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.day {
  background: linear-gradient(to bottom, #fdfbda, #ffeb88);
}

.night {
  background: linear-gradient(to bottom, #2a2b4e, #000022);
  color: white;
}
</style>
