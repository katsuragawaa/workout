<script lang="ts" setup>
const initialTime = 120;
let timerId: ReturnType<typeof setInterval> | null = null;

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
            <Button variant="outline">
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
