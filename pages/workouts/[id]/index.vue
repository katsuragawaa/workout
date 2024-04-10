<script lang="ts" setup>
import { ArrowLeftIcon, Timer } from "lucide-vue-next";

const route = useRoute();
const { getWorkoutById } = useWorkouts();
const { getExercisesByWorkoutId } = useExercises();

const workoutId = route.params.id;
const workout = getWorkoutById(workoutId as string);
if (!workout) {
  throw new Error("Workout not found");
}

const exercises = getExercisesByWorkoutId(workout.id);
</script>

<template>
  <div>
    <header
      class="container sticky top-0 z-10 flex max-w-4xl items-center justify-between bg-background pb-6 pt-14 shadow-sm"
    >
      <Button
        as-child
        variant="outline"
        size="icon"
      >
        <NuxtLink to="/">
          <ArrowLeftIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>

      <TimerDrawer>
        <Button size="icon">
          <Timer class="h-4 w-4" />
        </Button>
      </TimerDrawer>
    </header>

    <main class="container flex max-w-2xl flex-col py-10">
      <h1 class="text-5xl font-extrabold">
        {{ workout.name }}
      </h1>

      <div class="grid grid-cols-1 gap-3 pt-10 md:grid-cols-2">
        <ExerciseCard
          v-for="exercise in exercises"
          :key="exercise.id"
          :exercise="exercise"
        />
      </div>

      <Button class="mt-10">
        Concluir treino
      </Button>
    </main>
  </div>
</template>
