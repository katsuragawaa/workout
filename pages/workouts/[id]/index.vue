<script lang="ts" setup>
import { ArrowLeftIcon } from "lucide-vue-next";

const mockExercise = {
  name: "Bench press",
  muscleGroup: "Chest",
  sets: 4,
  reps: 10,
  weight: 20,
};
</script>

<template>
  <div>
    <header class="container flex max-w-4xl items-center justify-between pt-14">
      <Button variant="outline" size="icon">
        <NuxtLink to="/">
          <ArrowLeftIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </header>

    <main class="container flex max-w-2xl flex-col py-10">
      <h1 class="text-5xl font-extrabold">NOME DO WORKOUT</h1>

      <div class="grid grid-cols-1 gap-3 pt-10 md:grid-cols-2">
        <ExerciseCard
          :name="mockExercise.name"
          :muscleGroup="mockExercise.muscleGroup"
          :sets="mockExercise.sets"
          :reps="mockExercise.reps"
          :weight="mockExercise.weight"
        />
      </div>

      <Button variant="outline">
        <NuxtLink :to="`/workouts/${1}`"> Editar treino </NuxtLink>
      </Button>
    </main>
  </div>
</template>
