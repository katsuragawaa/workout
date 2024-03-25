import { useStorage } from "@vueuse/core";
import { ulid } from "ulidx";
import type { Exercise } from "~/types";

export const useUseExercises = () => {
  const exercises = useStorage<Exercise[]>("exercises", []);

  const getExercises = () => {
    return exercises.value;
  };

  const getExerciseById = (id: string) => {
    return exercises.value.find((exercise) => exercise.id === id);
  };

  const saveExercise = (exercise: Omit<Exercise, "id">) => {
    exercises.value.push({ ...exercise, id: ulid() });
  };

  const updateExercise = (id: string, exercise: Partial<Exercise>) => {
    const index = exercises.value.findIndex((exercise) => exercise.id === id);
    if (index === -1) {
      return;
    }

    exercises.value[index] = { ...exercises.value[index], ...exercise };
  };

  const deleteExercise = (id: string) => {
    const index = exercises.value.findIndex((exercise) => exercise.id === id);
    if (index === -1) {
      return;
    }

    exercises.value.splice(index, 1);
  };

  return {
    getExercises,
    getExerciseById,
    saveExercise,
    updateExercise,
    deleteExercise,
  };
};
