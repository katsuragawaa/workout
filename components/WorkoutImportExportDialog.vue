<script lang="ts" setup>
import { CopyIcon } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "./ui/toast";
import { z } from "zod";
import { useForm } from "vee-validate";

const emit = defineEmits(["update:open"]);

const { getWorkouts, overwriteWorkouts } = useWorkouts();
const { getExercises, overwriteExercises } = useExercises();

const code = JSON.stringify({ workouts: getWorkouts(), exercises: getExercises() }, null, 2);

const formSchema = toTypedSchema(
  z.object({
    code: z.string(),
  }),
);

const { handleSubmit } = useForm({
  initialValues: { code: code },
  validationSchema: formSchema,
  keepValuesOnUnmount: false,
});

const onSubmit = handleSubmit(async (values) => {
  const newCode = JSON.parse(values.code || "{}");

  await overwriteWorkouts(newCode.workouts);
  await overwriteExercises(newCode.exercises);

  emit("update:open", false);
});

const handleCopy = () => {
  navigator.clipboard.writeText(code);
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
          name="code"
        >
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Cole o JSON para importar os treinos."
                v-bind="componentField"
                class="h-96 font-mono"
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
