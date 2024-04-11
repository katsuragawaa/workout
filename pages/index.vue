<script lang="ts" setup>
import { muscles as m } from "~/lib/muscles";

const { getWorkouts } = useWorkouts();
const { getMusclesByWorkoutId } = useExercises();
const workouts = getWorkouts();

const getDescription = (id: string) => {
  const muscles = getMusclesByWorkoutId(id);
  return muscles.map((muscle) => m.find((m) => m.value === muscle)?.label).join(", ");
};

const nextWorkoutId = computed(() => {
  const timestamps = workouts.map((workout) => workout.finishedAt.getTime());
  const index = timestamps.indexOf(Math.max(...timestamps));
  return workouts[(index + 1) % workouts.length].id;
});
</script>

<template>
  <div>
    <header class="container flex max-w-4xl items-center justify-end pt-14">
      <ThemeToggle />
    </header>

    <main class="container flex max-w-xl flex-col py-10">
      <h1 class="pb-10 text-5xl font-extrabold">
        Choose
        <br>
        Your
        <br>
        Workout
      </h1>

      <section class="flex flex-col gap-4">
        <WorkoutCard
          v-for="workout in workouts"
          :id="workout.id"
          :key="workout.id"
          :next="workout.id === nextWorkoutId"
          :name="workout.name"
          :description="getDescription(workout.id)"
        />
      </section>

      <Button as-child>
        <NuxtLink
          href="/workouts/new"
          class="mt-10"
        >
          Editar Treino
        </NuxtLink>
      </Button>
    </main>
  </div>
</template>
