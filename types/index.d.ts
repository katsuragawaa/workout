type Workout = {
  id: string;
  name: string;
  finishedAt?: Date;
};

type Exercise = {
  id: string;
  workoutId: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  weight?: number;
  done?: boolean;
};

export type { Workout, Exercise };
