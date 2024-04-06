<script lang="ts" setup>
import { Weight } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { h } from "vue";
import { toast } from "~/components/ui/toast";

const props = defineProps<{
  id: string;
  weight: number;
}>();

const { handleSubmit } = useForm({ initialValues: { weight: props.weight } });
const { updateExercise } = useExercises();

const onSubmit = handleSubmit((values) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2)),
    ),
  });

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
