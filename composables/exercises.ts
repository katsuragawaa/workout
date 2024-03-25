import { useStorage } from "@vueuse/core";
import { ulid } from "ulidx";
import type { Exercise } from "~/types";

export const useExercises = () => {
  const exercises = useStorage<Exercise[]>("exercises", [
    {
      id: ulid(),
      workoutId: "1",
      name: "Exercise 1",
      muscle: "chest",
      sets: 3,
      reps: 10,
    },
  ]);

  const getExercises = async () => {
    return exercises.value;
  };

  const getExerciseById = async (id: string) => {
    return exercises.value.find((exercise) => exercise.id === id);
  };

  const getExercisesByWorkoutId = async (workoutId: string) => {
    return exercises.value.filter((exercise) => exercise.workoutId === workoutId);
  };

  const getMusclesByWorkoutId = async (workoutId: string) => {
    const muscles = new Set<string>();
    exercises.value
      .filter((exercise) => exercise.workoutId === workoutId)
      .forEach((exercise) => {
        muscles.add(exercise.muscle);
      });

    return Array.from(muscles);
  };

  const saveExercise = async (exercise: Omit<Exercise, "id">) => {
    exercises.value.push({ ...exercise, id: ulid() });
  };

  const updateExercise = async (id: string, exercise: Partial<Exercise>) => {
    const index = exercises.value.findIndex((exercise) => exercise.id === id);
    if (index === -1) {
      return;
    }

    exercises.value[index] = { ...exercises.value[index], ...exercise };
  };

  const deleteExercise = async (id: string) => {
    const index = exercises.value.findIndex((exercise) => exercise.id === id);
    if (index === -1) {
      return;
    }

    exercises.value.splice(index, 1);
  };

  return {
    getExercises,
    getExerciseById,
    getExercisesByWorkoutId,
    getMusclesByWorkoutId,
    saveExercise,
    updateExercise,
    deleteExercise,
  };
};
