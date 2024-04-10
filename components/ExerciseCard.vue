<script lang="ts" setup>
import { CheckSquare, Repeat2, Square, X } from "lucide-vue-next";
import { capitalize } from "vue";
import { muscles } from "~/lib/muscles";
import type { Exercise } from "~/types";

const props = defineProps<{
  exercise: Exercise;
}>();

const done = ref(props.exercise.done ?? false);

const { updateExercise } = useExercises();

const muscle = muscles.find((m) => m.value === props.exercise.muscle)?.label || "invalid";

const toggleDone = () => {
  done.value = !done.value;
  updateExercise(props.exercise.id, { done: done.value });
};
</script>

<template>
  <Card :class="{ 'opacity-50': done }">
    <CardHeader>
      <Badge
        variant="outline"
        class="w-fit"
      >
        {{ capitalize(muscle) }}
      </Badge>
      <CardTitle>{{ props.exercise.name }}</CardTitle>
    </CardHeader>

    <CardContent class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <Repeat2 class="size-5" />
        <span>
          {{ props.exercise.sets }}
          <X class="mb-0.5 inline-block size-4" />
          {{ props.exercise.reps }}
        </span>
      </div>

      <WeightInput
        :id="props.exercise.id"
        :weight="props.exercise.weight"
      />

      <Button
        variant="ghost"
        size="icon"
        class="h-5 w-5"
        @click="toggleDone"
      >
        <CheckSquare v-if="done" />
        <Square v-else />
      </Button>
    </CardContent>
  </Card>
</template>
