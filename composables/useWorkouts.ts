import { useStorage } from "@vueuse/core";
import { ulid } from "ulidx";
import type { Workout } from "~/types";

export const useUseWorkouts = () => {
  const workouts = useStorage<Workout[]>("workouts", []);

  const getWorkouts = () => {
    return workouts.value;
  };

  const getWorkoutById = (id: string) => {
    return workouts.value.find((workout) => workout.id === id);
  };

  const saveWorkout = (workout: Omit<Workout, "id">) => {
    workouts.value.push({ ...workout, id: ulid() });
  };

  const updateWorkout = (id: string, workout: Partial<Workout>) => {
    const index = workouts.value.findIndex((workout) => workout.id === id);
    if (index === -1) {
      return;
    }

    workouts.value[index] = { ...workouts.value[index], ...workout };
  };

  const deleteWorkout = (id: string) => {
    const index = workouts.value.findIndex((workout) => workout.id === id);
    if (index === -1) {
      return;
    }

    workouts.value.splice(index, 1);
  };

  return {
    getWorkouts,
    getWorkoutById,
    saveWorkout,
    updateWorkout,
    deleteWorkout,
  };
};
