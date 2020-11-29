import {useState} from 'react'
import Head from 'next/head'
import { CalendarOutlined, FireOutlined, LikeOutlined } from '@ant-design/icons'
import { message, BackTop } from 'antd'

import '../styles/pages/detail.less'
import { reqTag, reqBlogDetail, reqAbout, reqLike } from '../api'
import getDate from '../utils/getDate'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'
import Markdown from '../components/markdown'
import Loading from '../components/loading'

const Detail = ({ tags, detail, about }) => {
    const { _id, title, description, content, create_time, count, like } = detail

    const [likeNum,setLikeNum] = useState(like.length)

    const handleLike = async  () => {
        const likeResult = await reqLike(_id)
        if(likeResult.data.code===0){
            const likeData = likeResult.data.data
            const likeNum = likeData.like.length
            setLikeNum(likeNum)
            message.success('点赞成功,谢谢支持')
        }else if(likeResult.data.code===1){
            message.warn('您已经点过赞了')
        }else if(likeResult.data.code===500){
            message.error('点赞失败,请稍后重试　')
        }
    }

    return (
        <div className='index-page'>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon" />
            </Head>
            <Header />
            <div className="main-content">
                <div className="container">
                    <div className="left-content">
                        <div className="detail-content">
                            <div className="title">{title}</div>
                            <div className="details">
                                <span className="details-item"><CalendarOutlined className="icon" />{getDate(create_time)}</span>
                                <span className="details-item"><FireOutlined className="icon" />{count}</span>
                            </div>
                            <div className="description">{description}</div>
                            <Markdown content={content}/>
                            <div className="like">
                                <LikeOutlined onClick={handleLike} className="icon"/>
                                <div className="like-num">{likeNum}</div>
                            </div>
                        </div>
                        <Loading />
                    </div>
                    <div className="right-content">
                        <My about={about} />
                        <Category tags={tags} />
                    </div>
                    <BackTop />
                </div>
            </div>
        </div>
    )
}

Detail.getInitialProps = async (context) => {
    // 获取标签列表
    const tagResult = await reqTag()
    const tagData = tagResult.data

    // 获取博客详情
    const id = context.query.id
    const detailResult = await reqBlogDetail(id)
    const detailData = detailResult.data

    // 获取个人资料
    const aboutResult = await reqAbout()
    const aboutData = aboutResult.data

    if (tagData.code === 0 && detailData.code === 0 && aboutData.code === 0) {
        const tags = tagData.data
        const detail = detailData.data
        const about = aboutData.data
        return {
            tags, detail, about
        }
    } else {
        message.error('页面加载错误')
    }
}

export default Detail