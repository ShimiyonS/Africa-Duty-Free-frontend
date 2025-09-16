import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const EarningAnalysis = () => {
    const [state] = useState({
        series: [75, 25],
        options: {
            chart: {
                type: 'donut',
                width: 280,
                height: 280,
            },
            labels: ['Net Income', 'Commission'],
            colors: ['#2E93fA', '#00E396'], // Blue & Green like in your screenshot
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%', // hollow center size
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '14px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '20px',
                                fontWeight: 600,
                                formatter: () => "$16,968", // income value
                            },
                            total: {
                                show: true,
                                label: 'Income',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#8e8da4',
                                formatter: () => "$16,968",
                            }
                        }
                    }
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                markers: {
                    width: 10,
                    height: 10,
                    radius: 50,
                },
                labels: {
                    colors: '#8e8da4',
                }
            },
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
        },
    });

    return (
        <div className="antd-radius-table" >
            <div className="earning-analytic-title">
                <p className="justuspro-medium">Total Income</p>
                <p>123</p>
            </div>
            <div className="d-flex justify-content-center earning-analysis">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="donut"
                    width={250}
                    height={250}
                />
            </div>
        </div>
    );
};

export default EarningAnalysis;
