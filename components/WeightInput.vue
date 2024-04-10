<script lang="ts" setup>
import { Weight } from "lucide-vue-next";
import { useForm } from "vee-validate";

const props = defineProps<{
  id: string;
  weight?: number;
}>();

const { handleSubmit } = useForm({ initialValues: { weight: props.weight } });
const { updateExercise } = useExercises();

const onSubmit = handleSubmit((values) => {
  if (typeof values.weight !== "number") {
    updateExercise(props.id, { weight: undefined });
    return;
  }

  updateExercise(props.id, { weight: values.weight });
});
</script>

<template>
  <form class="max-w-28">
    <FormField
      v-slot="{ componentField }"
      name="weight"
    >
      <FormItem>
        <FormControl>
          <div class="relative">
            <Input
              class="border-none pl-10"
              type="number"
              placeholder="Peso"
              v-bind="componentField"
              @blur="onSubmit"
            />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Weight class="size-5" />
            </span>
          </div>
        </FormControl>
      </FormItem>
    </FormField>
  </form>
</template>
