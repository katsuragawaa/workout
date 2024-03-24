type Workout = {
  id: string;
  name: string;
};

type Exercise = {
  id: string;
  workoutId: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  weight?: number;
};

export type { Workout, Exercise };
