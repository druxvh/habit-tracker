import { Box, Container, Typography } from "@mui/material"
import AddHabitForm from "./components/add-habit-form"
import HabitList from "./components/habit-list"
import HabitStats from "./components/habit-stats"

function App() {

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h3" gutterBottom align="center">Habit Tracker</Typography>

        {/* Form */}
        <AddHabitForm />

        {/* list */}
        <HabitList />

        {/* stats */}
        <HabitStats />

      </Box>
    </Container>
  )
}

export default App
