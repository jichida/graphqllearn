import React, { useState } from 'react'
import config from '../../../../../env/config.js'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import { xviewUploadImage } from '../../../../../env/selphoto'
import UploadIcon from './upload-icon'
import FileInput from '../file-input'

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: false
        },
        deleteFile: {
            enabled: true,
            endpoint: `${config.serverurl}/fineuploads`
        },
        request: {
            endpoint: `${config.serverurl}/fineuploads`
        },
        retry: {
            enableAuto: true
        }
    }
})

const FileInputComponent = ({ uploader, xviewUploadImage, ...props }) => {
    const { children, ...fileInputProps } = props
    const content = children || (
        <div  style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div><UploadIcon {...props} /></div>
        </div>
    )

    return (
        <FileInput
            uploader={ uploader }
            xviewUploadImage= { xviewUploadImage }
            { ...fileInputProps }
        >
            <span>
                { content }
            </span>
        </FileInput>
    )
}

class Index extends React.Component {

    handleChange = (file) => {
        this.props.onChange(file)
    }

    render () {
        return (
            <div>
                <FileInputComponent 
                    uploader={ uploader }
                    files={this.props.value}
                    onChange={this.handleChange}
                    xviewUploadImage={xviewUploadImage}
                />
            </div>
        )
    }
}

export default Index