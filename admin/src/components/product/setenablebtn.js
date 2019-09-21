import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import ThumbUp from '@material-ui/svg-icons/action/visibility';
// import ThumbDown from '@material-ui/svg-icons/action/visibility-off';
import { enable as enableAction, disable as disableAction } from './enablesetaction';

class VisiableButton extends Component {
    handleenable = () => {
        const { enable, record } = this.props;
        enable(record.id, record);
    }

    handledisable = () => {
        const { disable, record } = this.props;
        disable(record.id, record);
    }

    render() {
        const { record } = this.props;
        return (
            <span>
                <Button onClick={this.handleenable} disabled={record.isenabled}></Button>
                <Button onClick={this.handledisable} disabled={!record.isenabled}></Button>
            </span>
        );
    }
}

VisiableButton.propTypes = {
    record: PropTypes.object,
    enable: PropTypes.func,
    disable: PropTypes.func,
};

export default connect(null, {
    enable: enableAction,
    disable: disableAction,
})(VisiableButton);
