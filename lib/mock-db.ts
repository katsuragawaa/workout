import type { Exercise, Workout } from "@/types";
import { ulid } from "ulidx";

const workouts: Workout[] = [];
const exercises: Exercise[] = [];

const getWorkouts = () => {
  return workouts;
};

const getExercises = () => {
  return exercises;
};

const getExercisesByWorkout = (workoutId: string) => {
  return exercises.filter((exercise) => exercise.workoutId === workoutId);
};

const saveWorkout = (workout: Omit<Workout, "id">) => {
  const newWorkout = { ...workout, id: ulid() };
  workouts.push(newWorkout);
};

const saveExercise = (exercise: Omit<Exercise, "id">) => {
  const newExercise = { ...exercise, id: ulid() };
  exercises.push(newExercise);
};

const updateWorkoutById = (workoutId: string, updatedWorkout: Partial<Workout>) => {
  const workoutIndex = workouts.findIndex((workout) => workout.id === workoutId);
  if (workoutIndex !== -1) {
    workouts[workoutIndex] = { ...workouts[workoutIndex], ...updatedWorkout };
  }
};

const updateExerciseById = (exerciseId: string, updatedExercise: Partial<Exercise>) => {
  const exerciseIndex = exercises.findIndex((exercise) => exercise.id === exerciseId);
  if (exerciseIndex !== -1) {
    exercises[exerciseIndex] = { ...exercises[exerciseIndex], ...updatedExercise };
  }
};

const deleteWorkoutById = (workoutId: string) => {
  const index = workouts.findIndex((workout) => workout.id === workoutId);
  if (index !== -1) {
    workouts.splice(index, 1);
  }
};

const deleteExerciseById = (exerciseId: string) => {
  const index = exercises.findIndex((exercise) => exercise.id === exerciseId);
  if (index !== -1) {
    exercises.splice(index, 1);
  }
};

export {
  deleteExerciseById,
  deleteWorkoutById,
  getExercises,
  getExercisesByWorkout,
  getWorkouts,
  saveExercise,
  saveWorkout,
  updateExerciseById,
  updateWorkoutById,
};
