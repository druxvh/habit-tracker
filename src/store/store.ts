import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "daily" | "weekly") => void
    removeHabit: (id: string) => void
    toggleHabit: (id: string, date: string) => void
}

// The first () is to pass your type (HabitState).
// The second () is to define your store logic.
const useHabitStore = create<HabitState>()(
    persist((set) => {
        return {
            // habits state (array)
            habits: [],

            // adds the habit
            addHabit: (name, frequency) => set((state) => {
                return {
                    habits: [...state.habits,
                    {
                        id: Date.now().toString(),
                        name,
                        frequency,
                        completedDates: [],
                        createdAt: new Date().toISOString()
                    }]
                }
            }),

            // removes the habit
            removeHabit: (id) => set((state) => ({
                habits: state.habits.filter((habit) => habit.id !== id)
            })),

            // The function is just toggling a date for a habit’s completion — add it if it’s not there, remove it if it is.
            toggleHabit: (id, date) => set((state) => ({
                habits: state.habits.map((habit) => habit.id === id
                    ? {
                        ...habit,
                        completedDates: habit.completedDates.includes(date)
                            ? habit.completedDates.filter((d) => d !== date)
                            : [...habit.completedDates, date]
                    }
                    : habit
                )
            })),
        }
    }, {
        name: 'habits-local'
    })
)

export default useHabitStore