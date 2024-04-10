<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { Workout } from "~/types";

const props = defineProps<{
  open: boolean;
  workout?: Workout;
}>();

const emit = defineEmits(["update:open"]);

const { saveWorkout, updateWorkout } = useWorkouts();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

watch(
  () => props.workout,
  (workout) => {
    form.setValues(workout || {});
  },
  { immediate: true },
);

const submit = form.handleSubmit((values) => {
  const id = props.workout?.id;
  id ? updateWorkout(id, values) : saveWorkout(values);

  emit("update:open", false);
});

const toggleDialog = () => {
  form.resetForm();
  emit("update:open", !props.open);
};
</script>

<template>
  <Dialog
    :open="open"
    @update:open="toggleDialog"
  >
    <DialogContent class="sm:max-w-[425px]">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">
            Workout
          </h3>
          <p className="text-sm text-muted-foreground">
            Plan your workout.
          </p>
        </div>

        <form
          class="space-y-6"
          @submit="submit"
        >
          <FormField
            v-slot="{ componentField }"
            name="name"
          >
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Treino A"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <DialogFooter>
            <Button type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>
