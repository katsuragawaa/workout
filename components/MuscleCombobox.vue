<script lang="ts" setup>
import { muscles } from "@/lib/muscles";
import { Check, ChevronsUpDown } from "lucide-vue-next";

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits(["update:value"]);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          :class="['w-full', 'justify-between', props.value ? '' : 'text-muted-foreground']"
        >
          {{ props.value ? muscles.find((muscle) => muscle.value === value)?.label : "Selecione um músculo" }}
          <ChevronsUpDown class-name="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent class="w-fit p-0">
      <ScrollArea class="h-64">
        <Command>
          <CommandInput placeholder="Busque pelo músculo" />
          <CommandEmpty>Não achei.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="muscle in muscles"
                :key="muscle.value"
                :value="muscle.label"
                @select="emit('update:value', muscle.value)"
              >
                <Check :class="['mr-2 h-4 w-4', muscle.value === value ? 'opacity-100' : 'opacity-0']" />
                {{ muscle.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>
