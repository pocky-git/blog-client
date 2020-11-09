import Head from 'next/head'
import { CalendarOutlined } from '@ant-design/icons'
import ReactMarkDown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import '../styles/pages/detail.less'
import { reqTag,reqBlogDetail } from './api'
import getDate from '../utils/getDate'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter language={language} children={value} />
    }
}

const Detail = ({ tags,detail }) => {
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
                            <div className="content">
                                <ReactMarkDown
                                    renderers={renderers}
                                    plugins={[gfm]}
                                    escapeHtml={false}
                                    source={content}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <My />
                        <Category tags={tags} />
                    </div>
                </div>
            </div>
        </div>
    )
}

Detail.getInitialProps = async (context) => {
    const tagResult = await reqTag()
    const tagData = tagResult.data

    const id = context.query.id
    const detailResult = await reqBlogDetail(id)
    const detailData = detailResult.data

    if (tagData.code === 0 && detailData.code === 0) {
        const tags = tagData.data
        const detail = detailData.data
        return {
            tags,detail
        }
    }
}

export default Detail