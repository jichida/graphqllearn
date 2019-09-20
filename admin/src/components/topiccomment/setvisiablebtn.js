import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import ThumbUp from '@material-ui/svg-icons/action/visibility';
// import ThumbDown from '@material-ui/svg-icons/action/visibility-off';
import { visiableset as visiablesetAction, invisiableset as invisiablesetAction } from './visiablesetaction';

class VisiableButton extends Component {
    handlevisiableset = () => {
        const { visiableset, record } = this.props;
        visiableset(record.id, record);
    }

    handleinvisiableset = () => {
        const { invisiableset, record } = this.props;
        invisiableset(record.id, record);
    }

    render() {
        const { record } = this.props;
        return (
            <span>
                <Button onClick={this.handlevisiableset} disabled={record.isvisiable}></Button>
                <Button onClick={this.handleinvisiableset} disabled={!record.isvisiable}></Button>
            </span>
        );
    }
}

VisiableButton.propTypes = {
    record: PropTypes.object,
    visiableset: PropTypes.func,
    invisiableset: PropTypes.func,
};

export default connect(null, {
    visiableset: visiablesetAction,
    invisiableset: invisiablesetAction,
})(VisiableButton);
