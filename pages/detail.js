import Head from 'next/head'
import { CalendarOutlined } from '@ant-design/icons'
import 'braft-editor/dist/output.css'

import '../styles/pages/detail.less'
import { reqTag,reqBlogDetail,reqAbout } from './api'
import getDate from '../utils/getDate'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'

const Detail = ({ tags,detail,about }) => {
    const {title,description,content,create_time} = detail
    return (
        <div className='index-page'>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div className="main-content">
                <div className="container">
                    <div className="left-content">
                        <div className="detail-content">
                            <div className="title">{title}</div>
                            <div className="date"><CalendarOutlined /> {getDate(create_time)}</div>
                            <div className="description">{description}</div>
                            <div className="content braft-output-content" dangerouslySetInnerHTML={{__html:content}}></div>
                        </div>
                    </div>
                    <div className="right-content">
                        <My about={about}/>
                        <Category tags={tags} />
                    </div>
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
            tags,detail,about
        }
    }
}

export default Detail