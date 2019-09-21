import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudUpdate, SaveButton } from 'react-admin';
import lodashget from 'lodash.get';
// A custom action creator which modifies the values before calling the default crudCreate action creator
const saveWithNote = (values,id,record, basePath, redirectTo) =>
{
  debugger;
  if(lodashget(values,'parent_id','') === ''){
    values.parent_id = null;
    return crudUpdate('ecategory',id, { ...values },record, basePath, redirectTo);
  }
  return crudUpdate('ecategory',id, { ...values }, record,basePath, redirectTo);
}


class SaveWithNoteButtonView extends Component {
    handleClick = () => {
        const { basePath, handleSubmit, redirect, saveWithNote} = this.props;
        return handleSubmit(values => {
            saveWithNote(values,values.id,values, basePath, redirect);
        });
    };

    render() {
        const { handleSubmitWithRedirect, saveWithNote, ...props } = this.props;

        return (
            <SaveButton
                handleSubmitWithRedirect={this.handleClick}
                {...props}
            />
        );
    }
}

const SaveWithNoteButton = connect(
    undefined,
    { saveWithNote }
)(SaveWithNoteButtonView);

export default SaveWithNoteButton;
