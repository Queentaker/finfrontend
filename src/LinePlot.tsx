import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { RestApi } from './RestApi';  // Assuming RestApi is available for API calls

const LinePlot: React.FC = () => {
    const [data, setData] = useState<Array<{ x: number, y: number }> | null>(null); // Store x, y data
    const [loading, setLoading] = useState<boolean>(false);  // State for loading

    // Function to fetch data and set it in the state
    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            const response = await RestApi.getdata();  // Fetch data from /data endpoint
            setData(response.data);  // Store fetched data in state
            console.log('Fetched Data:', response.data);  // Log the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="mt-4">
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={fetchData}
            >
                Fetch and Plot Data
            </button>

            {/* Display loading state */}
            {loading && <p className="mt-4 text-gray-500">Loading...</p>}

            {/* Render Plotly chart if data is available */}
            {data && (
                <Plot
                    data={[
                        {
                            x: data.map((point) => point.x),  // Extract x values
                            y: data.map((point) => point.y),  // Extract y values
                            type: 'scatter',  // Line plot
                            mode: 'lines+markers',  // Line with markers
                            marker: { color: 'blue' },
                        },
                    ]}
                    layout={{ title: 'X vs Y Line Plot', xaxis: { title: 'X' }, yaxis: { title: 'Y' } }}
                    className="mt-4"
                />
            )}
        </div>
    );
};

export default LinePlot;
