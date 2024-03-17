<script lang="ts" setup>
import { CheckSquare, Repeat2, Square, Weight, X } from "lucide-vue-next";

const props = defineProps<{
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  weight: number;
}>();

const done = ref(false);

const toggleDone = () => {
  done.value = !done.value;
};

</script>

<template>
  <Card :class="{ 'opacity-50': done }">
    <CardHeader>
      <Badge variant="outline" class="w-fit"> Muscle group </Badge>
      <CardTitle>Nome do exercício</CardTitle>
    </CardHeader>

    <CardContent class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <Repeat2 class="h-5 w-5" />
        <span>
          4
          <X class="mb-0.5 inline-block h-4 w-4" />
          10
        </span>
      </div>

      <div class="flex items-center gap-1">
        <Weight class="h-5 w-5" />
        <span>20</span>
      </div>

      <Button variant="ghost" size="icon" @click="toggleDone" class="h-5 w-5">
        <CheckSquare v-if="done" />
        <Square v-else />
      </Button>
    </CardContent>
  </Card>
</template>
