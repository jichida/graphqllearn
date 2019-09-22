import React from 'react'
import lodashGet from 'lodash.get'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks' 
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, List } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl'
import Loading from '../../controls/loading'
import Error from '../../controls/error'
import AvatarUpload from '../../controls/picturesWall/mobileImageUpload/avatarUpload'
import ModalInput from '../../controls/modalInput'
import Container from '../../controls/container'
import './index.less'

const Item = List.Item

export const GET_USER = gql`
    query GetUser($id: String!){
        getUser(id: $id) {
            id,
            name,
            avatar,
            email
        }
    }
`
export const UPDATE_USER = gql`
    mutation UpdateUser($id: String!, $avatar: avatar, $name: name){
        updateUser(id: $id, avatar: $avatar, name: $name) {
            id,
            name,
            avatar
        }
    }
`

const formikOptions = {
    displayName: 'profile',
    mapPropsToValues: ({avatar, name}) => ({
        avatar,
        name
    }),
    validationSchema: ({intl: { formatMessage }}) => Yup.object().shape({
        name: Yup.string().required()
    }),
    // handleSubmit: (values, { props: {onSubmit}, setSubmitting }) => {
    //     setSubmitting(true)
    //     onSubmit(values)
    // }
}

const Index = ({history, match, intl: { formatMessage }, values, setFieldValue, isSubmitting, setSubmitting }) => {
    const { data, loading, error} = useQuery(GET_USER, {
        variables: {
            id: match.params.id
        },
        onCompleted: ({avatar, name, email}) => {
            setFieldValue('avatar', avatar)
            setFieldValue('name', name)
            setFieldValue('email', email)
        }
    })

    const [ saveProfile, { data: resData }] = useMutation(UPDATE_USER)

    const handleSubmit = async () => {
        if(!isSubmitting) {
            setSubmitting(true)
            await saveProfile({
                id: match.params.id,
                name: values.name,
                email: values.email,
                avatar: values.avatar
            })
            setSubmitting(false)
        }
    }

    return (
        <Container className="personal-container">
            <NavBar
                mode="dark"
                icon={<Icon type="left" size="lg" />}
                onLeftClick={() => history.goBack()}
                rightContent={[
                    <div key={1} className="save-link" onClick={handleSubmit}><FormattedMessage id="form.save" /></div>
                ]}
            ><FormattedMessage id="my.profile" /></NavBar>
            {
                loading ? <Loading /> : !!error ? <Error /> :
                <div className='form'>
                    <List className='form-list'>
                        <Item
                            extra={
                                <div className="item-extra">
                                    <AvatarUpload
                                        name="avatar"
                                        value={values.avatar}
                                        onChange={(v) => setFieldValue('avatar', v)}
                                    />
                                    <Icon type="right" />
                                </div>
                            }
                        ><FormattedMessage id="my.avatar" /></Item>
                        <Item
                            extra={
                                <ModalInput
                                    name="name"
                                    value={values.name}
                                    onChange={(v) => setFieldValue('name', v)}
                                    enableArrow
                                    title={formatMessage({id: "my.username"})}
                                />
                            }
                        ><FormattedMessage id="my.username" /></Item>
                        <Item
                            extra={lodashGet(data, 'email', '')}
                        ><FormattedMessage id="login.mail" /></Item>
                    </List>
                </div>
            }
            
        </Container>
    )
}

export default injectIntl(withFormik(formikOptions)(withRouter(Index)))