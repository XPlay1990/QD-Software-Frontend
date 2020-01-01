import React from "react";
import Chart from "chart.js"
import {getEdiStateStatistics} from "../util/APIUtils";
import {notification} from "antd";
import {Trans, withTranslation} from "react-i18next";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            stateStatistics: new Map()
        };
        // this.chartRef = React.createRef();
        this.chartColors = new Map();

        this.initChart = this.initChart.bind(this);
        this.initStatistics = this.initStatistics.bind(this);
        this.getStateStatistics = this.getStateStatistics.bind(this);
        this.initColor = this.initColor.bind(this);
    }


    initStatistics() {
        this.setState({
            isLoading: true
        });

        this.getStateStatistics();

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
                        this.initChart
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

    componentDidMount() {
        this._isMounted = true;
        this.initStatistics()
    }

    initDataSet() {
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

    initChart() {
        this.initColor();
        let dataSet = this.initDataSet();
        const node = this.node;
        new Chart(node, {
            type: "bar",
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                    // display: false
                },
                title: {
                    display: true,
                    text: 'Number of Edi connections by state'
                }
            },
            data: {
                labels: ["# by states"],
                datasets: dataSet
            }
        });
    }

    initColor() {
        this.chartColors = new Map([
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
            <div>
                <canvas
                    style={{width: 800, height: 300}}
                    ref={node => (this.node = node)}
                />
            </div>
        );
    }
}

export default withTranslation()(Statistics)