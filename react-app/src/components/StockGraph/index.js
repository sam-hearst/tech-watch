import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"
import "./StockGraph.css"

function StockGraph(props) {
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);

    const ticker = props?.ticker

    useEffect(() => {
        if (props.ticker) {
            async function LoadGraph(ticker) {
                const res = await fetch(`/api/stocks/${ticker}`)

                if (res.ok) {
                    const data = await res.json();
                    setGraphData(data.res.c)
                }
                setLoading(false);
            }
            LoadGraph(ticker);
        }
    }, [ticker, props.ticker])

    const data = {
        labels: ["10 wks", "9 wks", "8 wks", "7 wks", "6 wks", "5 wks", "4 wks", "3 wks", "2 wks", "1 wk", "0 wks"],
        datasets: [
            {
                label: "",
                data: graphData,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        title: {
            display: false,
            text: ""
        }
    }

    const legend = {
        display: false
    }

    if (loading) return null

    return (
        <>
            <Line data={data} legend={legend} options={options} />
        </>
    )
}


export default StockGraph
