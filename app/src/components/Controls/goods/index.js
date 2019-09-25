import React from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import lodashGet from 'lodash.get'
import gql from 'graphql-tag'
import Loading from '../loading'
import Error from '../error'

export const GetGoods = gql`
    query getGoods{
        goods @client 
    }
`

const Index = ({histroy}) => {
    const { data, isloading, error } = useQuery(GetGoods)

    // console.log('isLoading', !!isloading)
    // console.log('get goods:', !!isloading ? 'Loading...' : data.goods)//lodashGet(data, 'goods', {})

    if(isloading||!data) {
        return <Loading />
    }
    if(error) {
        return <Error />
    }
    

    return (
        <div className="goods" style={{color: '#fff'}}>
            {data.goods.name}
        </div>
    )
}

export default withRouter(Index)
