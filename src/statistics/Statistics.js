import React from "react";
import Chart from "chart.js"
import dataLabels from "chartjs-plugin-datalabels"
import {getEdCustomerStatistics, getEdiStateStatistics} from "../util/APIUtils";
import {notification} from "antd";
import {withTranslation} from "react-i18next";

import './statistics.css';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            stateStatistics: new Map(),
            customerStatistics: new Map()
        };
        // this.chartRef = React.createRef();
        this.chartColors = this.initColor();

        this.initStateChart = this.initStateChart.bind(this);
        this.initStatistics = this.initStatistics.bind(this);
        this.getStateStatistics = this.getStateStatistics.bind(this);
        this.initColor = this.initColor.bind(this);
    }


    initStatistics() {
        this.setState({
            isLoading: true
        });

        this.getStateStatistics();
        this.getCustomerStatistics();

        this.setState({
            isLoading: false
        });
    }

    getStateStatistics() {
        let promise = getEdiStateStatistics();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                            stateStatistics: new Map(Object.entries(response))
                        },
                        this.initStateChart
                    )
                }
            }).catch(error => {
            this.setState({
                stateStatistics: null,
            });
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
    }

    getCustomerStatistics() {
        let promise = getEdCustomerStatistics();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                            customerStatistics: new Map(Object.entries(response))
                        },
                        this.initCustomerChart
                    )
                }
            }).catch(error => {
            this.setState({
                customerStatistics: null,
            });
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.initStatistics()
    }

    initStateDataSet() {
        let dataset = [];
        let colors = this.chartColors.values();
        let index = 0;

        this.state.stateStatistics.forEach((value, key) => {
            dataset.push(
                {
                    label: this.props.t(`ediConnection.state.${key}`),
                    data: [value],
                    backgroundColor: Chart.helpers.color(colors.next().value).alpha(0.5).rgbString(),
                    // borderColor: window.chartColors.red,
                }
            );
            index = index + 1;
        });
        return dataset
    }

    initStateChart() {
        this.initStateChartSteppedLine();
        let dataSet = this.initStateDataSet();
        const node = this.stateNode;
        new Chart(node, {
            type: "bar",
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                    // display: false
                },
                title: {
                    display: true,
                    text: 'Number of Edi connections by state'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            data: {
                labels: ["# by states"],
                datasets: dataSet
            }
        });
    }

    initStateDataSetSteppedLine() {
        let colors = this.chartColors.values();

        let labels = [];
        let values = [];

        this.state.stateStatistics.forEach((value, key) => {
            labels.push(this.props.t(`ediConnection.state.${key}`));
            values.push(value)
        });

        return {
            labels: labels,
            datasets: [{
                label: "# by states",
                data: values,
                borderColor: Chart.helpers.color(colors.next().value).alpha(0.5).rgbString(),
                fill: false,
                steppedLine: true
            }],
        }
    }

    initStateChartSteppedLine() {
        let dataSet = this.initStateDataSetSteppedLine();
        const node = this.stateNodeSteppedLine;
        new Chart(node, {
            type: "line",
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                    // display: false
                },
                title: {
                    display: true,
                    text: 'Number of Edi connections by state'
                }
            },
            data: dataSet
        });
    }


    initCustomerDataSet() {
        let colors = this.chartColors.values();
        dataLabels.backgroundColor = this.chartColors.get('grey'); //dummy usage for import

        let customers = [];
        let data = [];
        let usedColors = [];

        this.state.customerStatistics.forEach((value, key) => {
            customers.push(key);
            data.push(value);
            usedColors.push(Chart.helpers.color(colors.next().value).alpha(0.5).rgbString())

        });

        return {
            labels: customers,
            datasets: [{
                label: "Number of Edi connections by Customer",
                backgroundColor: usedColors,
                data: data,
                datalabels: {
                    anchor: 'center',
                    color: 'black',
                    backgroundColor: null,
                    borderWidth: 0
                }
            }]
            // borderColor: window.chartColors.red,
        }
    }

    initCustomerChart() {
        let dataSet = this.initCustomerDataSet();
        const node = this.customerNode;
        new Chart(node, {
                type: "pie",
                options: {
                    responsive: true,
                    // animation: {
                    //     duration: 500,
                    //     easing: "easeOutQuart"
                    // },
                    legend: {
                        position: 'right',
                        // display: false
                    },
                    title: {
                        display: true,
                        text: 'Number of Edi connections by Customer'
                    },
                    plugins: {
                        datalabels: {
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor;
                            },
                            borderColor: 'white',
                            borderRadius: 25,
                            borderWidth: 2,
                            color: 'white',
                            display: function (context) {
                                var dataset = context.dataset;
                                var count = dataset.data.length;
                                var value = dataset.data[context.dataIndex];
                                return value > count * 1.5;
                            },
                            font: {
                                weight: 'bold'
                            },
                            formatter: Math.round
                        }
                    }
                },
                data: dataSet
            }
        );
    }

    initColor() {
        return new Map([
                ['red', 'rgb(255, 99, 132)'],
                ['orange', 'rgb(255, 159, 64)'],
                ['yellow', 'rgb(255, 205, 86)'],
                ['green', 'rgb(75, 192, 192)'],
                ['blue', 'rgb(54, 162, 235)'],
                ['purple', 'rgb(153, 102, 255)'],
                ['grey', 'rgb(201, 203, 207)']
            ]
        );
    }

    render() {
        // if (this.state.isLoading) {
        //     return <LoadingIndicator/>
        // }
        return (
            <Grid container spacing={3} className="StatisticsGrid">
                <Grid item xs={6}>
                    <Paper className="StatisticsPaper">
                        <canvas
                            ref={node => (this.stateNode = node)}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className="StatisticsPaper">
                        <canvas
                            ref={node => (this.customerNode = node)}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className="StatisticsPaper">
                        <canvas
                            ref={node => (this.stateNodeSteppedLine = node)}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withTranslation()(Statistics)