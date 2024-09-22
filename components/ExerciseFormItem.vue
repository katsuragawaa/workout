<script lang="ts" setup>
import { Beef, Minus, MoreVertical, Pencil, Repeat2, Trash2, X } from "lucide-vue-next";
import { capitalize } from "vue";
import { muscles } from "~/lib/muscles";

const props = defineProps<{
  id: string;
  workoutId: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
}>();

const openForm = ref(false);
const openAlert = ref(false);

const muscle = muscles.find((m) => m.value === props.muscle)?.label || "inválido";

const { deleteExercise } = useExercises();

const handleEdit = () => {
  openForm.value = true;
};

const handleDelete = () => {
  openAlert.value = true;
};

const confirmDelete = () => {
  deleteExercise(props.id);
};
</script>

<template>
  <div class="flex flex-col justify-center rounded-md border p-4">
    <div class="flex items-center justify-between gap-4">
      <div class="space-y-2">
        <h3 class="text-lg font-medium leading-5">
          {{ props.name }}
        </h3>
        <div class="flex items-center text-xs">
          <div class="flex flex-row items-center gap-1">
            <Beef class="h-4 w-4" />
            {{ capitalize(muscle) }}
          </div>
          <Minus class="h-4 w-4 rotate-90 transform" />
          <div class="flex flex-row items-center gap-1">
            <Repeat2 class="h-4 w-4" />
            <span>
              {{ props.sets }}
              <X class="mb-0.5 inline-block h-3 w-3" />
              {{ props.reps }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-1 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="min-w-10"
            >
              <MoreVertical class="h-4 w-4" />
              <span class="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              class="flex items-center gap-2"
              @click="handleEdit"
            >
              <Pencil class="h-3 w-3" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              class="flex items-center gap-2"
              @click="handleDelete"
            >
              <Trash2 class="h-3 w-3" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ExerciseFormDialog
        :open="openForm"
        :exercise="props"
        :workout-id="workoutId"
        @update:open="openForm = $event"
      />

      <ConfirmDialog
        :open="openAlert"
        title="Deletar exercício"
        description="Tem certeza que deseja deletar esse exercício?"
        @update:open="openAlert = $event"
        @confirm="confirmDelete"
      />
    </div>
  </div>
</template>
