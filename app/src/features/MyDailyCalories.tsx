import { Typography } from '@mui/material'
import {
  getUserFoodEntries,
  GetUserFoodEntriesResponse,
} from 'api/user.service'
import { useQuery } from 'react-query'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { roundOff2DecimalPlaces } from 'utils'

export default function MyDailyCalories({
  userId,
  date,
}: {
  userId: string
  date: string
}) {
  const data = useQuery<GetUserFoodEntriesResponse, Error>(
    ['userFoodEntries', date],
    () =>
      getUserFoodEntries({
        userId,
        date,
      })
  ).data as GetUserFoodEntriesResponse

  const consumedCalories = roundOff2DecimalPlaces(
    data.foodEntries.reduce((acc, value) => acc + value.numOfCalories, 0)
  )
  const remainingCalories = roundOff2DecimalPlaces(
    data.maxCalories - consumedCalories
  )

  const pieData = {
    labels: [
      `Consumed (${consumedCalories} kcal)`,
      `Remaining (${remainingCalories} kcal)`,
    ],
    datasets: [
      {
        label: '# of Votes',
        data: [consumedCalories, remainingCalories],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
        }}
      >
        My Daily Calories
      </Typography>
      <Pie data={pieData} />
    </div>
  )
}

ChartJS.register(ArcElement, Tooltip, Legend)
