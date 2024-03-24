<script lang="ts" setup>
import { ArrowLeftIcon, MoreVertical, Pencil, Trash2 } from "lucide-vue-next";

const defaultWorkout = { name: "" };

const openWorkoutForm = ref(false);
const openExerciseForm = ref(false);
const openAlert = ref(false);
const selectedWorkout = ref(defaultWorkout);

const handleNew = () => {
  openWorkoutForm.value = true;
  selectedWorkout.value = defaultWorkout;
};

const handleEdit = (workout: any) => {
  openWorkoutForm.value = true;
  selectedWorkout.value = workout;
};

const handleDelete = (workout: any) => {
  openAlert.value = true;
};

const confirmDelete = () => {
  console.log("Deleting workout");
};

const handleNewExercise = () => {
  openExerciseForm.value = true;
};

const mockExercise = {
  id: "1",
  name: "Bench press",
  muscle: "chest",
  sets: 4,
  reps: 10,
  weight: 20,
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

      <Accordion
        type="single"
        collapsible
      >
        <AccordionItem value="1">
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <AccordionTrigger class="w-full pb-4 text-start text-2xl font-bold">
                Workout 1
              </AccordionTrigger>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MoreVertical class="h-4 w-4" />
                  <span class="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  class="flex items-center gap-2"
                  @click="() => handleEdit(defaultWorkout)"
                >
                  <Pencil class="h-3 w-3" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="flex items-center gap-2"
                  @click="() => handleDelete(defaultWorkout)"
                >
                  <Trash2 class="h-3 w-3" />
                  <span>Deletar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <AccordionContent class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ExerciseFormItem
              :workout-id="mockExercise.id"
              :name="mockExercise.name"
              :muscle="mockExercise.muscle"
              :sets="mockExercise.sets"
              :reps="mockExercise.reps"
            />

            <Button
              variant="secondary"
              class="md:col-span-2"
              @click="handleNewExercise"
            >
              Novo exercício
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ExerciseFormDialog
        :open="openExerciseForm"
        :workout-id="'teste'"
        @update:open="openExerciseForm = $event"
      />
    </main>
  </div>
</template>
