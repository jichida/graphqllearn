import React, { Component } from 'react'
import _map from 'lodash.map'
import PropTypes from 'prop-types'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import DeleteButton from '../delete-button'
import Dropzone from '../dropzone'
import FileInput from '../file-input'
import ProgressBar from '../progress-bar'
import Thumbnail from '../thumbnail'

import PauseIcon from './pause-icon'
import PlayIcon from './play-icon'
import UploadIcon from './upload-icon'
import XIcon from './x-icon'

const getInitFiles = (files) => {
    const initFiles = [];
    _map(files, (v, i)=>{
        initFiles.push(
            {
                id: i, 
                thumbnailUrl: v,
                fromServer: true,
            })
    })
    return initFiles;
}

class Gallery extends Component {
    static propTypes = {
        className: PropTypes.string,
        uploader: PropTypes.object.isRequired
    };   

    static defaultProps = {
        className: '',
        'cancelButton-children': <XIcon />,
        'deleteButton-children': <XIcon />,
        'dropzone-disabled': true,
        'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
        'dropzone-multiple': false,
        'fileInput-multiple': true,
        'pauseResumeButton-pauseChildren': <PauseIcon />,
        'pauseResumeButton-resumeChildren': <PlayIcon />,
        'retryButton-children': <PlayIcon />,
        'thumbnail-maxSize': 74
    }

    constructor(props) {
        super(props)

        this.state = {
            visibleFiles: [],
        }

        
        this.state.visibleFiles = getInitFiles(this.props.files)
        this.props.uploader.methods.addInitialFiles(this.state.visibleFiles);
        
        this._onComplete = (id, name, res) => {
            const visibleFiles = this.state.visibleFiles;
            const fromServer = false;
            const thumbnailUrl = res.url;
            visibleFiles.push({id, thumbnailUrl, fromServer});

            const files = this.props.files;
            files.push(thumbnailUrl)
            this.props.onChange(files);
        }

        this.handleDelete = (id) => {
            const fileIndex = this._findFileIndex(id);
            if (fileIndex >= 0) {
                const visibleFiles = this.state.visibleFiles;

                const files = this.props.files.filter((v)=>{return v !== visibleFiles[fileIndex].thumbnailUrl});

                visibleFiles.splice(fileIndex, 1)
                this.setState({visibleFiles})
                                
                this.props.onChange(files);
            }
        }

        this.handlePreview = (id) => {
            const fileIndex = this._findFileIndex(id);
            if (fileIndex >= 0) {
                const visibleFiles = this.state.visibleFiles;                
                
                this.props.onPreview(visibleFiles[fileIndex].thumbnailUrl);
            }
        }

    }


    componentDidMount() {
        this.props.uploader.on('complete', this._onComplete)
    }

    componentWillUnmount() {
        this.props.uploader.off('complete', this._onComplete)
    }

    _findFileIndex(id) {
        let visibleFileIndex = -1

        this.state.visibleFiles.some((file, index) => {
            if (file.id === id) {
                visibleFileIndex = index
                return true
            }
        })

        return visibleFileIndex
    }

    render() {
        const dropzoneProps = getComponentProps('dropzone', this.props)
        const fileInputProps = getComponentProps('fileInput', this.props)
        const progressBarProps = getComponentProps('progressBar', this.props)
        const thumbnailProps = getComponentProps('thumbnail', this.props)
        const uploader = this.props.uploader
        const xviewUploadImage = this.props.xviewUploadImage

        const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
        const deleteButtonProps = deleteEnabled && getComponentProps('deleteButton', this.props)

        const visibleFiles = this.state.visibleFiles;

        return (
            <MaybeDropzone content={ this.props.children }
                hasVisibleFiles={ visibleFiles.length > 0 }
                uploader={ uploader }
                { ...dropzoneProps }
            >
                <TransitionGroup 
                    component="ul" 
                    className='react-fine-uploader-gallery-files'
                    enter={!this.props.animationsDisabled}
                    exit={!this.props.animationsDisabled}
                >
                    {
                        visibleFiles.map(({ id, status, thumbnailUrl, fromServer }) => (
                            <CSSTransition
                                key={id}
                                classNames="react-fine-uploader-gallery-files"
                                timeout={{ enter: 500, exit: 300 }}
                                style={{borderBottom: 0}}
                            >
                                <li key={ id }
                                    className='react-fine-uploader-gallery-file'
                                >
                                    <ProgressBar className='react-fine-uploader-gallery-progress-bar'
                                        id={ id }
                                        uploader={ uploader }
                                        { ...progressBarProps }
                                    />
                                    <Thumbnail className='react-fine-uploader-gallery-thumbnail'
                                        id={ id }
                                        thumbnailUrl= {thumbnailUrl}
                                        onPreview={this.props.onPreview&&this.handlePreview}
                                        fromServer={ fromServer }
                                        uploader={ uploader }
                                        { ...thumbnailProps }
                                    />
                                    {
                                        deleteEnabled &&
                                            <DeleteButton className='react-fine-uploader-gallery-delete-button'
                                                id={ id }
                                                uploader={ uploader }
                                                delete={ this.handleDelete}
                                                { ...deleteButtonProps }
                                            />
                                    }
                                </li>
                            </CSSTransition>
                        ))
                    }
                    <CSSTransition
                        key={'input'}
                        classNames="react-fine-uploader-gallery-files"
                        timeout={{ enter: 500, exit: 300 }}
                    >
                        <li key={'input'} className='react-fine-uploader-gallery-file'>
                            <FileInputComponent uploader={ uploader } xviewUploadImage={ xviewUploadImage }  { ...fileInputProps }/>
                        </li>
                    </CSSTransition>
                </TransitionGroup>
                
            </MaybeDropzone>
        )
    }
}

const MaybeDropzone = ({ children, content, hasVisibleFiles, uploader, ...props }) => {
    const { disabled, ...dropzoneProps } = props

    let dropzoneDisabled = disabled
    if (!dropzoneDisabled) {
        dropzoneDisabled = !uploader.qq.supportedFeatures.fileDrop
    }

    if (hasVisibleFiles) {
        content = <span/>
    }
    else {
        content = content || getDefaultMaybeDropzoneContent({ content, disabled: dropzoneDisabled })
    }

    if (dropzoneDisabled) {
        return (
            <div className='react-fine-uploader-gallery-nodrop-container'>
                { content }
                { children }
            </div>
        )
    }

    return (
        <Dropzone className='react-fine-uploader-gallery-dropzone'
                  uploader={ uploader }
                  { ...dropzoneProps }
        >
            { content }
            { children }
        </Dropzone>
    )
}

const FileInputComponent = ({ uploader, xviewUploadImage, ...props }) => {
    const { children, ...fileInputProps } = props
    const content = children || (
        <div  style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div><UploadIcon className='react-fine-uploader-gallery-file-input-upload-icon' /></div>
            {/* <p style={{fontSize:'12px', textAlign: 'center'}}>上传图片</p>  */}
        </div>
    )

    return (
        <FileInput className='react-fine-uploader-gallery-file-input-container'
                   uploader={ uploader }
                   xviewUploadImage= { xviewUploadImage }
                   { ...fileInputProps }
        >
            <span className='react-fine-uploader-gallery-file-input-content'>
                { content }
            </span>
        </FileInput>
    )
}

const getComponentProps = (componentName, allProps) => {
    const componentProps = {}

    Object.keys(allProps).forEach(propName => {
        if (propName.indexOf(componentName + '-') === 0) {
            const componentPropName = propName.substr(componentName.length + 1)
            componentProps[componentPropName] = allProps[propName]
        }
    })

    return componentProps
}

const getDefaultMaybeDropzoneContent = ({ content, disabled }) => {
    const className = disabled
        ? 'react-fine-uploader-gallery-nodrop-content'
        : 'react-fine-uploader-gallery-dropzone-content'

    if (disabled && !content) {
        return (
            <span className={ className } />
        )
    }
    else if (content) {
        return <span className={ className }>{ content }</span>
    }
    else if (!disabled) {
        return (
            <span className={ className }>
                <UploadIcon className='react-fine-uploader-gallery-dropzone-upload-icon' />
                Drop files here
            </span>
        )
    }
}

const isFileGone = (statusToCheck, statusEnum) => {
    return [
        statusEnum.CANCELED,
        statusEnum.DELETED,
    ].indexOf(statusToCheck) >= 0
}

export default Gallery
