<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits(["update:open", "confirm"]);
</script>

<template>
  <AlertDialog
    :open="props.open"
    @update:open="emit('update:open', $event)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita. Todos os dados relacionados serão perdidos.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="emit('confirm')">
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
