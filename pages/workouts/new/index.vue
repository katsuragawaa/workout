<script lang="ts" setup>
import { ArrowLeftIcon } from "lucide-vue-next";

const openWorkoutForm = ref(false);
const openExerciseForm = ref(false);
const openAlert = ref(false);
const selectedId = ref("");

const handleNew = () => {
  openWorkoutForm.value = true;
};

const handleEdit = (id: string) => {
  openWorkoutForm.value = true;
  selectedId.value = id;
};

const handleDelete = (id: string) => {
  openAlert.value = true;
  selectedId.value = id;
};

const confirmDelete = () => {
  console.log("Deleting workout:", selectedId.value);
};

const handleNewExercise = (id: string) => {
  openExerciseForm.value = true;
  selectedId.value = id;
};
</script>

<template>
  <div>
    <header class="container flex max-w-4xl items-center justify-between pt-14">
      <Button
        variant="outline"
        size="icon"
      >
        <NuxtLink to="/">
          <ArrowLeftIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </header>

    <main class="container flex max-w-xl flex-col py-10">
      <h1 class="text-4xl font-extrabold">
        Plano de treino
      </h1>
      <p class="pb-6 text-sm text-muted-foreground">
        Planeje seu treco
      </p>

      <WorkoutAccordion
        :workout="selectedId"
        @edit="handleEdit"
        @delete="handleDelete"
        @new-exercise="handleNewExercise"
      />

      <ExerciseFormDialog
        :open="openExerciseForm"
        :workout-id="selectedId"
        @update:open="openExerciseForm = $event"
      />
    </main>
  </div>
</template>
