import Link from 'next/link'
import { withRouter } from 'next/router'
import { Card, List } from 'antd'
import { RightOutlined } from '@ant-design/icons'

import '../styles/components/category.less'

const Category = ({ tags,router }) => {
    return (
        <div className="category">
            <Card 
                title="博客分类"
                extra={<Link href='/'>所有博客</Link>}
                headStyle={{padding: '0 16px'}}
                bodyStyle={{padding: 0}}
                bordered={false}
            >
                <List
                    size="small"
                    dataSource={tags}
                    renderItem={tag => (
                        <List.Item 
                            className='category-item'
                            key={tag._id}
                            extra={<RightOutlined />}
                            onClick={()=>router.push({pathname:'/',query:{tagId:tag._id}})}
                        >
                            {tag.name}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default withRouter(Category)