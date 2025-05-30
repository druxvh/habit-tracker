import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import useHabitStore, { Habit } from "../store/store"
import { CheckCircle, Delete } from "@mui/icons-material"

const HabitList = () => {
    const { habits, removeHabit, toggleHabit } = useHabitStore()
    const today = new Date().toISOString().split("T")[0]

    // checks the current date and continuous date backwards in habit's completed date and returns the total streak
    function getStreak(habit: Habit) {
        let streak = 0
        const currentDate = new Date()

        while (true) {
            const dateString = currentDate.toISOString().split("T")[0]

            if (habit.completedDates.includes(dateString)) {
                streak++
                currentDate.setDate(currentDate.getDate() - 1)
            } else break;
        }
        return streak;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
                mt: "2rem"
            }}>
            {habits.map((habit) => (
                <Paper
                    key={habit.id}
                    elevation={3}
                    sx={{ p: 2 }}>
                    <Grid
                        container
                        alignItems="center">
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                                variant="h6">{habit.name}
                            </Typography>
                            <Typography
                                variant="body2">{habit.frequency}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{ display: "flex", justifyContent: "flex-end", gap: "0.9rem" }}>
                                <Button
                                    variant="outlined"
                                    color={habit.completedDates.includes(today) ? "success" : "primary"}
                                    startIcon={<CheckCircle />}
                                    onClick={() => toggleHabit(habit.id, today)}
                                >
                                    {habit.completedDates.includes(today) ? "Completed" : "Mark Complete"}
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<Delete />}
                                    onClick={() => removeHabit(habit.id)}
                                >Remove</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: "1rem" }} >
                        <Typography> Current Streak : {getStreak(habit)} days</Typography>
                        <LinearProgress
                            value={(getStreak(habit) / 30) * 100} // 30 day streak logic
                            variant="determinate"
                            color="secondary"
                        />
                    </Box>

                </Paper>
            ))
            }
        </Box >
    )
}

export default HabitList