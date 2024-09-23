<script lang="ts" setup>
import { CopyIcon } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "./ui/toast";
import { z } from "zod";
import { useForm } from "vee-validate";
import type { Exercise, Workout } from "~/types";

const emit = defineEmits(["update:open"]);

const { getWorkouts, overwriteWorkouts } = useWorkouts();
const { getExercises, overwriteExercises } = useExercises();

const workouts: Workout[] = getWorkouts().map((workout) => ({ id: workout.id, name: workout.name }));
const exercises: Exercise[] = getExercises().map((exercise) => ({
  id: exercise.id,
  workoutId: exercise.workoutId,
  name: exercise.name,
  muscle: exercise.muscle,
  sets: exercise.sets,
  reps: exercise.reps,
  weight: exercise.weight,
}));

const json = JSON.stringify({ workouts, exercises }, null, 2);
const jsonSchema = z.object({
  workouts: z.array(z.object({ id: z.string(), name: z.string() })),
  exercises: z.array(
    z.object({
      id: z.string(),
      workoutId: z.string(),
      name: z.string(),
      muscle: z.string(),
      sets: z.number(),
      reps: z.number(),
      weight: z.number().optional(),
    }),
  ),
});

const formSchema = toTypedSchema(z.object({ json: z.string() }));
const { handleSubmit } = useForm({
  initialValues: { json: json },
  validationSchema: formSchema,
  keepValuesOnUnmount: false,
});

const onSubmit = handleSubmit(async (values) => {
  let updated: { workouts: Workout[]; exercises: Exercise[] } = { workouts: [], exercises: [] };
  try {
    updated = jsonSchema.parse(JSON.parse(values.json));
  } catch (error) {
    console.error(error);
    toast({
      title: "Erro ao importar treinos",
      description: "O JSON fornecido é inválido.",
      variant: "destructive",
    });
    return;
  }

  await overwriteWorkouts(updated.workouts);
  await overwriteExercises(updated.exercises);

  emit("update:open", false);
});

const handleCopy = () => {
  navigator.clipboard.writeText(json);
  toast({
    title: "Treinos copiados!",
    description: "Os treinos foram copiados para a área de transferência.",
  });
};
</script>

<template>
  <Dialog
    :open="true"
    @update:open="emit('update:open', false)"
  >
    <DialogContent class="sm:max-w-[425px]">
      <DialogTitle>
        <h3 className="text-lg font-medium">
          Importar ou Exportar Treinos
        </h3>
      </DialogTitle>
      <form
        class="w-full space-y-6"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="json"
        >
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Cole o JSON para importar os treinos."
                v-bind="componentField"
                class="h-96 font-mono"
                @focus="$event.target.select()"
              />
            </FormControl>
            <FormDescription>
              Cole o JSON para importar os treinos. Isso irá sobrescrever todos os treinos existentes.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <div class="flex space-x-2">
            <Button
              type="submit"
              class="flex-auto"
            >
              Salvar
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              @click="handleCopy"
            >
              <CopyIcon class="size-4" />
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
