import { useSelector } from "react-redux"
import { ReduxState } from "../../types"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from "react-chartjs-2"

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)
function FollowStats() {
    const vacations = useSelector((state: ReduxState) => state.vacations);

    const followedVacations = vacations.filter(v => v.followers > 0);
    const data = {
        labels: followedVacations.map(v => v.vacation_destination),
        datasets: [{
            label: "Followers ",
            data: vacations.map(v => v.followers),
            backgroundColor: "lightBlue",
            borderColor: "black",
            borderWidth: 1,
        }]
    };

    return (
        <div>
            {followedVacations.length > 0 ?
                <Bar data={data} />
                :
                <h2>There aren't any followed vacations</h2>}

        </div>
    )
}

export default FollowStats