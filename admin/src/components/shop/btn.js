import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { reviewApprove as reviewApproveAction, reviewReject as reviewRejectAction, reviewApproveStart as reviewApproveStartAction } from './action';

class ApproveButton extends Component {
    handleApprove = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove(record.id, record);
    }

    handleReject = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    }

    handleStartApprove = ()=>{
      const { reviewApproveStart, record } = this.props;
      reviewApproveStart(record.id, record);
    }

    render() {
        const { record } = this.props;
        let co = (<span></span>);
        if(!!record){
          if(record.approvalstatus === '待审核'){
              co = (<span>
                <Button color="primary"  onClick={this.handleStartApprove} >开始审核</Button>
              </span>);
          }
          else if(record.approvalstatus !== '未递交'){
            co = (
                <span>
                    <Button color="primary" onClick={this.handleApprove} disabled={record.approvalstatus === '已审核'}>
                      通过
                    </Button>
                    <Button color="secondary" onClick={this.handleReject} disabled={record.approvalstatus === '已拒绝'}>
                      拒绝
                    </Button>
                </span>
            );
          }
        }
        return co;
    }
}

ApproveButton.propTypes = {
    record: PropTypes.object,
    reviewApprove: PropTypes.func,
    reviewReject: PropTypes.func,
    reviewApproveStart: PropTypes.func,
};

export default connect(null, {
    reviewApprove: reviewApproveAction,
    reviewReject: reviewRejectAction,
    reviewApproveStart: reviewApproveStartAction,
})(ApproveButton);
