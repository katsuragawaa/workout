import { useStorage } from "@vueuse/core";
import { ulid } from "ulidx";
import type { Workout } from "~/types";

export const useWorkouts = () => {
  const workouts = useStorage<Workout[]>("workouts", []);

  const getWorkouts = () => {
    return workouts.value.map((workout) => ({ ...workout, finishedAt: new Date(workout.finishedAt || 0) }));
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

  const overwriteWorkouts = async (newWorkouts: Workout[]) => {
    workouts.value = newWorkouts;
  };

  return {
    getWorkouts,
    getWorkoutById,
    saveWorkout,
    updateWorkout,
    deleteWorkout,
    overwriteWorkouts,
  };
};
