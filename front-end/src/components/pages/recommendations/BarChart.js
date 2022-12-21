import React, { useState, useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from "@faker-js/faker"

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	indexAxis: 'y',
	elements: {
		bar: {
			borderWidth: 2,
		},
	},
	responsive: true,
	plugins: {
		legend: {
			display: false
		}
	},
};


/*
Recommendations should look like this:
[
	{
		"recommendation": "Soccer",
		"tags": ["ball sport", "team sport", ...]
	},
	...
]
*/
function App({ recommendations }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		const sortedRecommendations = recommendations.sort((a, b) => a.tags.length < b.tags.length)
		setData({
			labels: sortedRecommendations.map(r => r.recommendation),
			datasets: [
				{
					data: sortedRecommendations.map(r => r.tags.length),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				}
			],
		})
	}, [])

	return data !== null && <Bar options={options} data={data} />;
}

export default App
