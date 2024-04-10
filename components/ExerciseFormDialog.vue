<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { muscles } from "~/lib/muscles";
import type { Exercise } from "~/types";

const props = defineProps<{
  open: boolean;
  exercise?: Exercise;
  workoutId: string;
}>();

const emit = defineEmits(["update:open"]);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }).max(50),
    muscle: z.string().refine((value) => muscles.some((muscle) => muscle.value === value), {
      message: "You must select a valid option",
    }),
    sets: z
      .number()
      .min(1)
      .max(5)
      .transform((val) => (isNaN(val) ? 0 : Number(val))),
    reps: z
      .number()
      .min(1)
      .max(30)
      .transform((val) => (isNaN(val) ? 0 : Number(val))),
  }),
);

const { saveExercise, updateExercise } = useExercises();

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.exercise || {
    sets: 3,
    reps: 10,
  },
});

const submit = form.handleSubmit((values) => {
  const id = props.exercise?.id;
  id ? updateExercise(id, values) : saveExercise({ ...values, workoutId: props.workoutId });

  emit("update:open", false);
});

const toggleDialog = () => {
  console.log("props.exercise", props.exercise);
  form.resetForm();
  emit("update:open", false);
};
</script>

<template>
  <Dialog
    :open="open"
    @update:open="toggleDialog"
  >
    <DialogContent class="sm:max-w-[425px]">
      <form
        class="space-y-6"
        @submit="submit"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Novo exercício</h3>
            <p className="text-sm text-muted-foreground">Adicione atividades ao seu treino.</p>
          </div>
        </div>

        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem>
            <FormLabel>Nome do exercício</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Supino ereto"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="muscle">
          <FormItem>
            <FormLabel>Músculo</FormLabel>
            <MuscleCombobox
              :value="form.values.muscle"
              @update:value="form.setFieldValue('muscle', $event)"
            />
            <FormMessage />
          </FormItem>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            v-slot="{ componentField }"
            name="sets"
          >
            <FormItem>
              <FormLabel>Sets</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="3"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="reps"
          >
            <FormItem>
              <FormLabel>Reps</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button type="submit"> Salvar </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
