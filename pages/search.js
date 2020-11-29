import Head from 'next/head'
import { message } from 'antd'
import { withRouter } from 'next/router'

import '../styles/pages/home.less'
import { reqTag, reqSearch, reqAbout } from '../api'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'
import BlogList from '../components/blog-list'
import Loading from '../components/loading'
import MenuMobile from '../components/menu-mobile'

const Search = ({ blogs, tags, about }) => {
    return (
        <div className='index-page'>
            <Head>
                <title>博客首页</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon" />
            </Head>
            <Header />
            <div className="main-content">
                <div className="container">
                    <MenuMobile tags={tags}/>
                    <div className="left-content">
                        <BlogList blogs={blogs} tags={tags}/>
                        <Loading />
                    </div>
                    <div className="right-content">
                        <My about={about} />
                        <Category tags={tags} />
                    </div>
                </div>
            </div>
        </div>
    )
}

Search.getInitialProps = async (context) => {
    // 获取标签列表
    const tagResult = await reqTag()
    const tagData = tagResult.data

    // 搜索
    const searchText = context.query.searchText
    const searchResult = await reqSearch(searchText)
    const searchData = searchResult.data

    // 获取个人资料
    const aboutResult = await reqAbout()
    const aboutData = aboutResult.data

    if (tagData.code === 0 && searchData.code === 0 && aboutData.code === 0) {
        const tags = tagData.data
        const searchBlogs = searchData.data
        const about = aboutData.data
        return {
            blogs: searchBlogs, tags, about
        }
    } else {
        message.error('页面加载错误')
    }

}

export default withRouter(Search)

