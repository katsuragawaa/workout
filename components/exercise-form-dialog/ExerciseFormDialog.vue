<script lang="ts" setup>
import { muscles } from "@/lib/muscles";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

// TODO: change these any types to the correct types
const props = defineProps<{
  open: boolean;
  exercise?: any;
  workoutId: string;
}>();

const emit = defineEmits(["update:open"]);

const formSchema = toTypedSchema(
  z.object({
    id: z.string().uuid().optional(),
    workoutId: z.string().uuid(),
    name: z.string().min(2).max(50),
    muscle: z.string().refine((value) => muscles.some((muscle) => muscle.value === value), {
      message: "You must select a valid option",
    }),
    sets: z.number().min(1).max(5),
    reps: z.number().min(1).max(30),
  }),
);

const defaultExercise = {
  id: "",
  workoutId: "",
  name: "",
  muscle: muscles[0].value,
  sets: 1,
  reps: 1,
};

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.exercise || defaultExercise,
});

const submit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});

const toggleDialog = () => {
  form.resetForm();
  emit("update:open", false)
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
            <h3 className="text-lg font-medium">
              Novo exercício
            </h3>
            <p className="text-sm text-muted-foreground">
              Adicione atividades ao seu treino.
            </p>
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
            <FormDescription> This is your public display name. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="username"
        >
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="shadcn"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> This is your public display name. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </DialogContent>
  </Dialog>
</template>
