import Head from 'next/head'
import { reqBlog, reqTag } from './api'
import { List, Tag } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { withRouter } from 'next/router'

import '../styles/pages/home.less'
import getDate from '../utils/getDate'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'

const Index = ({ blogs, tags }) => {
  const color = ['cyan', 'blue', 'geekblue', 'purple']

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
              dataSource={blogs}
              renderItem={item => (
                <List.Item key={item._id}>
                  <div className="title">
                    {item.title}
                  </div>
                  <div className="date">
                    <CalendarOutlined /> {getDate(item.create_time)}
                  </div>
                  <div className="tags">
                    {
                      item.tags.map((tagId, index) => (
                        <Tag color={color[index % (color.length - 1)]}>
                          {tags.find(tag => tag._id === tagId).name}
                        </Tag>
                      ))
                    }
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
            <Category />
          </div>
        </div>
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const blogResult = await reqBlog()
  const blogData = blogResult.data

  const tagResult = await reqTag()
  const tagData = tagResult.data
  
  if (blogData.code === 0 && tagData.code === 0) {
    const blogs = blogData.data
    const tags = tagData.data
    return {
      blogs, tags
    }
  }
}

export default withRouter(Index)

