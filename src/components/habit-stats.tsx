import { Box, Paper, Typography } from '@mui/material'
import useHabitStore from '../store/store'

const HabitStats = () => {
    const { habits } = useHabitStore()
    const today = new Date().toISOString().split("T")[0]

    return (
        <Box sx={{ mt: "1rem" }}>
            <Paper
                elevation={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                    p: 2
                }}>
                <Typography variant="h5" >Stats</Typography>
                <Typography variant="body1" >Total Habits : {habits.length}</Typography>
                <Typography variant="body1" >Completed : {habits.filter((habit) => habit.completedDates.includes(today)).length}</Typography>

            </Paper>

        </Box>
    )
}

export default HabitStats