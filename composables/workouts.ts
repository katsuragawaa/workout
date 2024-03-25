import { useStorage } from "@vueuse/core";
import { ulid } from "ulidx";
import type { Workout } from "~/types";

export const useWorkouts = () => {
  const workouts = useStorage<Workout[]>("workouts", [
    {
      id: "1",
      name: "Workout 1",
    },
  ]);

  const getWorkouts = async () => {
    return workouts.value;
  };

  const getWorkoutById = async (id: string) => {
    return workouts.value.find((workout) => workout.id === id);
  };

  const saveWorkout = async (workout: Omit<Workout, "id">) => {
    workouts.value.push({ ...workout, id: ulid() });
  };

  const updateWorkout = async (id: string, workout: Partial<Workout>) => {
    const index = workouts.value.findIndex((workout) => workout.id === id);
    if (index === -1) {
      return;
    }

    workouts.value[index] = { ...workouts.value[index], ...workout };
  };

  const deleteWorkout = async (id: string) => {
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
