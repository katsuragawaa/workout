<script lang="ts" setup>
import { ArrowLeftIcon, CodeXmlIcon } from "lucide-vue-next";
import type { Workout } from "~/types";

const openWorkoutForm = ref(false);
const openExerciseForm = ref(false);
const openImportExport = ref(false);
const openAlert = ref(false);
const selectedId = ref("");
const workout = ref<Workout>();

const { deleteWorkout } = useWorkouts();
const { deleteExercisesByWorkoutId } = useExercises();

const openUpdate = (open: boolean) => {
  openWorkoutForm.value = open;
  workout.value = undefined;
};

const handleNew = () => {
  openUpdate(true);
};

const handleEdit = (w: Workout) => {
  openWorkoutForm.value = true;
  workout.value = w;
};

const handleImportExport = () => {
  openImportExport.value = true;
};

const handleDelete = (id: string) => {
  openAlert.value = true;
  selectedId.value = id;
};

const confirmDelete = () => {
  deleteWorkout(selectedId.value);
  deleteExercisesByWorkoutId(selectedId.value);
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
          <ArrowLeftIcon class="size-4" />
        </NuxtLink>
      </Button>

      <Button
        size="icon"
        variant="secondary"
        @click="handleImportExport"
      >
        <CodeXmlIcon class="size-4" />
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
        :open="openWorkoutForm"
        :workout="workout"
        @update:open="openUpdate"
      />

      <ExerciseFormDialog
        v-if="openExerciseForm"
        :workout-id="selectedId"
        @update:open="openExerciseForm = $event"
      />

      <WorkoutImportExportDialog
        v-if="openImportExport"
        @update:open="openImportExport = $event"
      />

      <ConfirmDialog
        :open="openAlert"
        title="Deletar treino"
        description="Tem certeza que deseja deletar este treino?"
        @update:open="openAlert = $event"
        @confirm="confirmDelete"
      />
    </main>
  </div>
</template>
