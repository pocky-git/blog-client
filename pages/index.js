import Head from 'next/head'
import { message } from 'antd'

import '../styles/pages/home.less'
import { reqBlog, reqTag, reqAbout } from '../api'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'
import BlogList from '../components/blog-list'
import Loading from '../components/loading'
import MenuMobile from '../components/menu-mobile'

const Index = ({ blogs, tags, about }) => {
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

Index.getInitialProps = async (context) => {
  // 获取标签列表
  const tagResult = await reqTag()
  const tagData = tagResult.data

  // 获取博客列表
  const { tagId } = context.query
  let blogResult
  if (tagId) {
    blogResult = await reqBlog(tagId)
  } else {
    blogResult = await reqBlog()
  }
  const blogData = blogResult.data

  // 获取个人资料
  const aboutResult = await reqAbout()
  const aboutData = aboutResult.data

  if (blogData.code === 0 && tagData.code === 0 && aboutData.code === 0) {
    const blogs = blogData.data
    const tags = tagData.data
    const about = aboutData.data
    return {
      blogs, tags, about
    }
  } else {
    message.error('页面加载错误')
  }

}

export default Index

