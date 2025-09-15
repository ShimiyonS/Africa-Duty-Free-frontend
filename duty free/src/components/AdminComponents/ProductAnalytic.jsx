
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';


const ProductAnalytic = () => {

    const irregularData1 = [
        [new Date("01/01/2014").getTime(), 34],
        [new Date("01/05/2014").getTime(), 43],
        [new Date("01/09/2014").getTime(), 31],
        [new Date("01/15/2014").getTime(), 43],
    ];

    const irregularData2 = [
        [new Date("01/01/2014").getTime(), 20],
        [new Date("01/05/2014").getTime(), 29],
        [new Date("01/09/2014").getTime(), 37],
        [new Date("01/15/2014").getTime(), 36],
    ];

    const [state] = useState({

        series: [{
            name: 'series1',
            data: irregularData1,
        }, {
            name: 'series2',
            data: irregularData2
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
            },
            grid: {
                show: false, // removes background grid & border lines
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#8e8da4',
                    },
                    offsetX: 0,
                    formatter: (val) => val,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                }
            },
            xaxis: {
                type: 'datetime',
                tickAmount: 12,
                // min: new Date("01/01/2014").getTime(),
                // max: new Date("12/31/2014").getTime(),
                labels: {
                    format: "MMM",
                    rotate: -15,
                    rotateAlways: true,
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            title: {
                text: 'Irregular Data in Time Series',
                align: 'left',
                offsetX: 14
            },
            tooltip: {
                shared: true
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetX: -10
            }
        },
    });
    return (
        <div className="border-radius-dashboard product-analytics-heading">
            <div className="product-analytics">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
            </div>
        </div>
    )
}

export default ProductAnalytic