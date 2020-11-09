import Head from 'next/head'
import Link from 'next/link'
import { List, Tag } from 'antd'
import { CalendarOutlined, RightOutlined, CopyOutlined, TagsOutlined } from '@ant-design/icons'
import { withRouter } from 'next/router'

import '../styles/pages/home.less'
import { reqBlog, reqTag } from './api'
import getDate from '../utils/getDate'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'

const Index = ({ blogs, tags }) => {
  const topList = blogs.filter(blog => blog.isTop).sort((prev, next) => new Date(next.create_time).getTime() - new Date(prev.create_time).getTime())
  const bottomList = blogs.filter(blog => !blog.isTop).sort((prev, next) => new Date(next.create_time).getTime() - new Date(prev.create_time).getTime())
  const filterBlogs = [...topList, ...bottomList]

  return (
    <div className='index-page'>
      <Head>
        <title>博客首页</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="main-content">
        <div className="container">
          <div className="left-content">
            <List
              className="blog-list"
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 10,
              }}
              dataSource={filterBlogs}
              renderItem={item => (
                <List.Item
                  key={item._id}
                  extra={<Link href={'/detail?id=' + item._id}><a className='more'><CopyOutlined />查看全文<RightOutlined /></a></Link>}
                >
                  <div className="title">
                    {item.isTop ? <Tag color="blue">置顶</Tag> : null}{item.title}
                  </div>
                  <div className="detail">
                    <div className="item">
                      <CalendarOutlined />
                      <span>{getDate(item.create_time)}</span>
                    </div>
                    <div className="item">
                      <TagsOutlined />
                      {
                        item.tags.map(tagId => (
                          <Tag key={tagId}>
                            {tags.find(tag => tag._id === tagId).name}
                          </Tag>
                        ))
                      }
                    </div>
                  </div>
                  <div className="des">
                    {item.description}
                  </div>
                </List.Item>
              )}
            />
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

Index.getInitialProps = async (context) => {
  // 获取标签列表
  const tagResult = await reqTag()
  const tagData = tagResult.data

  // 获取博客列表
  const {tagId} = context.query
  let blogResult
  if(tagId){
    blogResult = await reqBlog(tagId)
  }else{
    blogResult = await reqBlog()
  }
  const blogData = blogResult.data

  if (blogData.code === 0 && tagData.code === 0) {
    const blogs = blogData.data
    const tags = tagData.data
    return {
      blogs, tags
    }
  }

}

export default withRouter(Index)

