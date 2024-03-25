import { ulid } from "ulidx";
import type { Exercise, Workout } from "~/types";

const workouts: Workout[] = [
  {
    id: ulid(),
    name: "Push",
  },
  {
    id: ulid(),
    name: "Pull",
  },
  {
    id: ulid(),
    name: "Legs",
  },
];
const exercises: Exercise[] = [
  {
    id: ulid(),
    workoutId: workouts[0].id,
    name: "Bench Press",
    muscle: "Chest",
    sets: 3,
    reps: 10,
  },
  {
    id: ulid(),
    workoutId: workouts[0].id,
    name: "Shoulder Press",
    muscle: "Shoulders",
    sets: 3,
    reps: 10,
  },
  {
    id: ulid(),
    workoutId: workouts[1].id,
    name: "Pull-ups",
    muscle: "Back",
    sets: 3,
    reps: 10,
  },
  {
    id: ulid(),
    workoutId: workouts[1].id,
    name: "Bicep Curls",
    muscle: "Biceps",
    sets: 3,
    reps: 10,
  },
  {
    id: ulid(),
    workoutId: workouts[2].id,
    name: "Squats",
    muscle: "Legs",
    sets: 3,
    reps: 10,
  },
  {
    id: ulid(),
    workoutId: workouts[2].id,
    name: "Deadlifts",
    muscle: "Legs",
    sets: 3,
    reps: 10,
  },
];

const getWorkouts = () => {
  return workouts;
};

const getWorkoutById = (workoutId: string) => {
  return workouts.find((workout) => workout.id === workoutId);
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

// export {
//   getWorkouts,
//   getWorkoutById,
//   getExercises,
//   getExercisesByWorkout,
//   saveWorkout,
//   saveExercise,
//   updateWorkoutById,
//   updateExerciseById,
//   deleteWorkoutById,
//   deleteExerciseById,
// };
