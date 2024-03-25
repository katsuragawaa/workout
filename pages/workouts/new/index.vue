<script lang="ts" setup>
import { ArrowLeftIcon } from "lucide-vue-next";
import type { Workout } from "~/types";

const openWorkoutForm = ref(false);
const openExerciseForm = ref(false);
const openAlert = ref(false);
const selectedId = ref("");
const selectedWorkout = ref<Workout>();

const { deleteWorkout } = useWorkouts();

const openUpdate = (open: boolean) => {
  openWorkoutForm.value = open;
  selectedWorkout.value = undefined;
};

const handleNew = () => {
  openUpdate(true);
};

const handleEdit = (workout: Workout) => {
  openWorkoutForm.value = true;
  selectedWorkout.value = workout;
};

const handleDelete = (id: string) => {
  openAlert.value = true;
  selectedId.value = id;
};

const confirmDelete = async () => {
  await deleteWorkout(selectedId.value);
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
        as-child
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
        @edit="handleEdit"
        @delete="handleDelete"
        @new-exercise="handleNewExercise"
      />

      <Button
        class="mt-10"
        @click="handleNew"
      >
        Novo treino
      </Button>

      <WorkoutFormDialog
        v-if="openWorkoutForm"
        :open="openWorkoutForm"
        :workout="selectedWorkout"
        @update:open="openUpdate"
      />

      <ExerciseFormDialog
        v-if="openExerciseForm"
        :open="openExerciseForm"
        :workout-id="selectedId"
        @update:open="openExerciseForm = $event"
      />

      <DeleteAlertDialog
        v-if="openAlert"
        :open="openAlert"
        @update:open="openAlert = $event"
        @confirm="confirmDelete"
      />
    </main>
  </div>
</template>
