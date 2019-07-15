import React, {Component} from 'react';
import {getEdiConnections, getUserCreatedPolls, getUserVotedPolls} from '../util/APIUtils';
import Poll from '../poll/Poll';
import {castVote} from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';
import {Button, Icon, notification} from 'antd';
import {POLL_LIST_SIZE} from '../constants';
import {withRouter} from 'react-router-dom';
import './EdiList.css';
import ReactTable from 'react-table'
import {data, columns} from "./testTableData";

class EdiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnections: [],
            page: 0,
            size: 15,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadEdiList = this.loadEdiList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadEdiList(page = 0, size = POLL_LIST_SIZE) {
        let promise;
        if (this.props.username) {
            if (this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedPolls(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                promise = getUserVotedPolls(this.props.username, page, size);
            }
        } else {
            promise = getEdiConnections(page, size);
        }

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const polls = this.state.ediConnections.slice();
                const currentVotes = this.state.currentVotes.slice();

                this.setState({
                    ediConnections: polls.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    currentVotes: currentVotes.concat(Array(response.content.length).fill(null)),
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadEdiList();
    }

    componentDidUpdate(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                ediConnections: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                currentVotes: [],
                isLoading: false
            });
            this.loadEdiList();
        }
    }

    handleLoadMore() {
        this.loadEdiList(this.state.page + 1);
    }

    handleVoteChange(event, pollIndex) {
        const currentVotes = this.state.currentVotes.slice();
        currentVotes[pollIndex] = event.target.value;

        this.setState({
            currentVotes: currentVotes
        });
    }


    handleVoteSubmit(event, pollIndex) {
        event.preventDefault();
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
            notification.info({
                message: 'Edi-Portal',
                description: "Please login to vote.",
            });
            return;
        }

        const poll = this.state.ediConnections[pollIndex];
        const selectedChoice = this.state.currentVotes[pollIndex];

        const voteData = {
            pollId: poll.id,
            choiceId: selectedChoice
        };

        castVote(voteData)
            .then(response => {
                const polls = this.state.ediConnections.slice();
                polls[pollIndex] = response;
                this.setState({
                    ediConnections: polls
                });
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login to vote');
            } else {
                notification.error({
                    message: 'Edi-Portal',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    render() {
        // const pollViews = [];
        // this.state.ediConnections.forEach((poll, pollIndex) => {
        //     pollViews.push(<Poll
        //         key={poll.id}
        //         poll={poll}
        //         currentVote={this.state.currentVotes[pollIndex]}
        //         handleVoteChange={(event) => this.handleVoteChange(event, pollIndex)}
        //         handleVoteSubmit={(event) => this.handleVoteSubmit(event, pollIndex)}/>)
        // });

        return (
            <div className="ediConnections-container">
                <ReactTable
                    manual
                    minRows={0}
                    pageSize={1}
                    data={data}
                    columns={columns}
                    pages={0}
                    showPagination={true}
                />
                {/*{pollViews}*/}
                {/*{*/}
                {/*    !this.state.isLoading && this.state.ediConnections.length === 0 ? (*/}
                {/*        <div className="no-polls-found">*/}
                {/*            <span>No Polls Found.</span>*/}
                {/*        </div>*/}
                {/*    ) : null*/}
                {/*}*/}
                {/*{*/}
                {/*    !this.state.isLoading && !this.state.last ? (*/}
                {/*        <div className="load-more-polls">*/}
                {/*            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>*/}
                {/*                <Icon type="plus"/> Load more*/}
                {/*            </Button>*/}
                {/*        </div>) : null*/}
                {/*}*/}
                {/*{*/}
                {/*    this.state.isLoading ?*/}
                {/*        <LoadingIndicator/> : null*/}
                {/*}*/}
            </div>
        );
    }
}

export default withRouter(EdiList);