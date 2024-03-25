<script lang="ts" setup>
import { MoreVertical, Pencil, Trash2 } from "lucide-vue-next";

const emit = defineEmits(["edit", "delete", "new-exercise"]);
const selectedId = ref<string>("");

const { getWorkouts } = useWorkouts();
const { getExercisesByWorkoutId } = useExercises();

const workouts = await getWorkouts();
const exercises = await getExercisesByWorkoutId(selectedId.value);
</script>

<template>
  <Accordion
    type="single"
    collapsible
    @update:model-value="selectedId = typeof $event === 'string' ? $event : ''"
  >
    <AccordionItem
      v-for="workout in workouts"
      :key="workout.id"
      :value="workout.id"
    >
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <AccordionTrigger class="w-full pb-4 text-start text-2xl font-bold">
            {{ workout.name }}
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
              @click="emit('edit', workout)"
            >
              <Pencil class="h-3 w-3" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              class="flex items-center gap-2"
              @click="emit('delete', workout.id)"
            >
              <Trash2 class="h-3 w-3" />
              <span>Deletar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AccordionContent class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ExerciseFormItem
          v-for="exercise in exercises"
          :id="exercise.id"
          :key="exercise.id"
          :workout-id="workout.id"
          :name="exercise.name"
          :muscle="exercise.muscle"
          :sets="exercise.sets"
          :reps="exercise.reps"
        />

        <Button
          variant="secondary"
          class="md:col-span-2"
          @click="emit('new-exercise', workout.id)"
        >
          Novo exercício
        </Button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
