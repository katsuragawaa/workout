<script lang="ts" setup>
import { useWebNotification } from '@vueuse/core';

const initialTime = 90;
let timerId: ReturnType<typeof setInterval> | null = null;
const {
  isSupported,
  show,
  ensurePermissions,
} = useWebNotification({
  title: 'O intervalo acabou, vambora!',
  dir: 'auto',
  lang: 'pt-BR',
  renotify: true,
  tag: 'endOfInterval',
  vibrate: [200, 100, 200],
  icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPjxkZWZzPjxtYXNrIGlkPSJpcFRNdXNjbGUwIj48ZyBmaWxsPSJub25lIj48cGF0aCBmaWxsPSIjNTU1IiBkPSJNMjEuMzcgMzZjMS40NS01LjI1IDYuNTItOSAxMi4zNi04LjM4YzUuNTYuNTkgOS45OCA1LjI4IDEwLjI2IDEwLjg2Yy4wNyAxLjQ3LS4xMyAyLjg4LS41NiA0LjE5Yy0uMjYuOC0xLjA0IDEuMzMtMS44OSAxLjMzSDExLjc1OGMtNS4wNDggMC04LjgzNC00LjYxOS03Ljg0NC05LjU2OUwxMCA0aDEybDQgN2wtOC41NyA2LjEzTDE1IDE0Ii8+PHBhdGggc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIiBzdHJva2Utd2lkdGg9IjQiIGQ9Ik0yMS4zNyAzNmMxLjQ1LTUuMjUgNi41Mi05IDEyLjM2LTguMzhjNS41Ni41OSA5Ljk4IDUuMjggMTAuMjYgMTAuODZjLjA3IDEuNDctLjEzIDIuODgtLjU2IDQuMTljLS4yNi44LTEuMDQgMS4zMy0xLjg5IDEuMzNIMTEuNzU4Yy01LjA0OCAwLTguODM0LTQuNjE5LTcuODQ0LTkuNTY5TDEwIDRoMTJsNCA3bC04LjU3IDYuMTNMMTUgMTRtMi40NCAzLjEzTDIyIDM0Ii8+PC9nPjwvbWFzaz48L2RlZnM+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMCAwaDQ4djQ4SDB6IiBtYXNrPSJ1cmwoI2lwVE11c2NsZTApIi8+PC9zdmc+',
  
})

const time = ref(initialTime);
const isRunning = ref(false);

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

const clearTimer = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
};

const startTimer = () => {
  clearTimer();
  time.value = initialTime;
  timerId = setInterval(() => {
    time.value = time.value > 0 ? time.value - 1 : 0;
  }, 1000);
  isRunning.value = true;
};

const pauseTimer = () => {
  clearTimer();
  isRunning.value = false;
};

const resumeTimer = () => {
  if (!timerId && time.value > 0) {
    timerId = setInterval(() => {
      time.value = time.value > 0 ? time.value - 1 : 0;
    }, 1000);
    isRunning.value = true;
  }
};

onUnmounted(clearTimer);

if(isSupported.value) {
  watch(isRunning, async(value) => {
    if(!value && time.value <= 0) {
      await show();
    }
  })
  watch(time, () => {
    ensurePermissions();
  })
}

</script>

<template>
  <Drawer>
    <DrawerTrigger
      as-child
      @click="startTimer"
    >
      <slot />
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Descanso</DrawerTitle>
          <DrawerDescription>Pausa até a próxima atividade</DrawerDescription>
        </DrawerHeader>

        <div class="p-4 text-center text-7xl font-bold tracking-tighter">
          {{ formattedTime }}
        </div>

        <DrawerFooter>
          <Button
            v-if="isRunning"
            @click="pauseTimer"
          >
            Pausar
          </Button>
          <Button
            v-else
            @click="resumeTimer"
          >
            Retomar
          </Button>
          <DrawerClose as-child>
            <Button
              variant="outline"
              @click.prevent="clearTimer"
            >
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
