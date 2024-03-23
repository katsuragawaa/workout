<script lang="ts" setup>
import { muscles } from "@/lib/muscles";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

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
  initialValues: defaultExercise,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

</script>

<template>
  <div>hi</div>
</template>
