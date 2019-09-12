import React from 'react'

const imgStyle = {
    borderRadius: '50px',
    padding: '3px',
    backgroundColor: '#ffffff',
    width: '40px',
    height: '40px'
}

const UndifinedIcon = (props) => {
    return (
        <svg fill="#1296db" viewBox="0 0 1024 1024"  width="40" height="40" { ...props}>
            <path d="M511.626 1.896C229.572 1.896 0.927 230.541 0.927 512.595c0 282.055 228.645 510.699 510.699 510.699s510.698-228.645 510.698-510.699S793.68 1.896 511.626 1.896z m0 69.641c243.606 0 441.058 197.474 441.058 441.058 0 87.347-25.392 168.762-69.194 237.271-73.419-77.609-170.944-132.204-280.597-151.829 70.004-33.755 118.404-105.164 118.404-188.066 0-115.388-93.535-208.922-208.923-208.922S303.452 294.583 303.452 409.97c0 82.902 48.399 154.311 118.403 188.066-110.093 19.704-207.96 74.661-281.479 152.77-44.177-68.704-69.808-150.465-69.808-238.211 0-243.584 197.496-441.058 441.058-441.058z" p-id="1232"></path>
        </svg>
    )
}

const UploadIcon = ({...props}) => {
    return (
        <div>
        {
            props.files
                ? <img src={props.files} alt="" style={imgStyle} />
                : <UndifinedIcon />
        }
        </div>
    )
}

export default UploadIcon


