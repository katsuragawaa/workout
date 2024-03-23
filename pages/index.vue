<script lang="ts" setup>

</script>

<template>
  <div>
    <header class="container flex max-w-4xl items-center justify-end pt-14">
      <!-- <theme-toggle /> -->
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
        <!-- map workouts -->
        <WorkoutCard
          :id="1"
          title="Test workout"
          description="Lopem ipsum"
        />
      </section>

      <Button as-child>
        <NuxtLink
          href="/workouts/new"
          class="mt-10"
        >
          Novo Treino
        </NuxtLink>
      </Button>
    </main>
  </div>
</template>