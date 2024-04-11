<script lang="ts" setup>
import { ChevronRight } from "lucide-vue-next";
import { capitalize } from "vue";

const props = defineProps<{
  id: string;
  name: string;
  description: string;
  next: boolean;
}>();
</script>

<template>
  <Card :class="{ 'border-foreground': next }">
    <CardHeader class="flex flex-row items-center justify-between gap-4">
      <div class="space-y-1.5">
        <CardTitle>{{ props.name }}</CardTitle>
        <CardDescription>{{ capitalize(props.description) }}</CardDescription>
      </div>

      <Button
        as-child
        :variant="next ? 'default' : 'secondary'"
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
