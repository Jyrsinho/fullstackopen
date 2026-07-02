import StatisticLine from "./StatisticLine.jsx";

const StatisticsTable = ({feedback}) => {

    return (
        <table>
            <tbody>
            {Object.entries(feedback).map(([key, value]) => {
                return (
                    <StatisticLine attribute={key} value={value} key={key} />
                )
            })}
            </tbody>
        </table>
    )
}

export default StatisticsTable