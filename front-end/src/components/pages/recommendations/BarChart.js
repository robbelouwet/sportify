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


function App({ tags }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		setData({
			labels: tags.map(e => e[0]),
			datasets: [
				{
					data: tags.map(e => e[1]),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				}
			],
		})
	}, [tags])

	return data !== null && <Bar options={options} data={data} />;
}

export default App
