<script lang="ts" setup>
import { ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  id: string;
  name: string;
  description: string;
}>();
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between gap-4">
      <div class="space-y-1.5">
        <CardTitle>{{ props.name }}</CardTitle>
        <CardDescription>{{ props.description }}</CardDescription>
      </div>

      <Button
        as-child
        variant="outline"
        size="icon"
        class="min-w-10"
      >
        <NuxtLink :href="`/workouts/${props.id}`">
          <ChevronRight class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </CardHeader>
  </Card>
</template>
