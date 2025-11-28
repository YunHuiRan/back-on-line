<template>
  <div class="app-contianer">
    <RouterView></RouterView>

    <div class="bg-rotate-layer"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-contianer {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  position: relative;
  filter: saturate(1.2);
  background: radial-gradient(circle at 20% 30%, rgba(34, 211, 242, 0.2), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(255, 120, 196, 0.18), transparent 50%),
    linear-gradient(45deg, rgba(34, 211, 242, 0.35), rgba(255, 120, 196, 0.32));
}

.app-contianer::before {
  content: "";
  position: absolute;
  inset: -10%;
  background: radial-gradient(
      circle at 30% 20%,
      rgba(34, 211, 242, 0.25),
      transparent 40%
    ),
    radial-gradient(circle at 70% 80%, rgba(255, 120, 196, 0.2), transparent 45%);
  filter: blur(40px);
  mix-blend-mode: screen;
  pointer-events: none;

  animation: halo-drift 18s ease-in-out infinite alternate;
}

@keyframes halo-drift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(20px, -15px, 0) scale(1.03);
  }
  100% {
    transform: translate3d(-10px, 15px, 0) scale(1);
  }
}

.bg-rotate-layer {
  position: absolute;
  inset: -20%;
  z-index: -1;
  pointer-events: none;

  background: radial-gradient(circle at 20% 30%, rgba(34, 211, 242, 0.2), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(255, 120, 196, 0.18), transparent 50%),
    linear-gradient(45deg, rgba(34, 211, 242, 0.35), rgba(255, 120, 196, 0.32));

  animation: bg-spin 5s linear infinite;
  transform-origin: center;
  filter: blur(50px);
}

@keyframes bg-spin {
  from {
    transform: rotate(0deg) scale(1.2);
  }
  to {
    transform: rotate(360deg) scale(1.2);
  }
}
</style>
