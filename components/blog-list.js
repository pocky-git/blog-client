import { List, Tag } from 'antd'
import { CalendarOutlined, RightOutlined, CopyOutlined, FireOutlined, LikeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import moment from 'moment'

const BlogList = ({blogs,tags}) => {
    const topList = blogs.filter(blog => blog.isTop).sort((prev, next) => new Date(next.create_time).getTime() - new Date(prev.create_time).getTime())
    const bottomList = blogs.filter(blog => !blog.isTop).sort((prev, next) => new Date(next.create_time).getTime() - new Date(prev.create_time).getTime())
    const filterBlogs = [...topList, ...bottomList]

    return (
        <>
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
                                <span className="item-block">
                                    <CalendarOutlined className="icon" />
                                    <span>{moment(item.create_time).format('YYYY-MM-DD HH:mm')}</span>
                                </span>
                                <span className="item-block">
                                    <LikeOutlined className="icon" />
                                    <span>{item.like.length}</span>
                                </span>
                                <span className="item-block">
                                    <FireOutlined className="icon" />
                                    <span>{item.count}</span>
                                </span>
                            </div>
                            <div className="item">
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
        </>
    )
}

export default BlogList
