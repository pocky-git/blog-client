import {Tag,Divider,Popover} from 'antd'
import { 
    GithubOutlined,
    QqOutlined,
    WechatOutlined 
} from '@ant-design/icons'

import '../styles/components/my.less'

const My = ({about}) => {
    const color = ['magenta','red','volcano','orange']

    return(
        <div className='my'>
            <div className="avantar">
                <img src={about.avantar} alt=""/>
            </div>
            <div className="nickname">
                {about.nickname}
            </div>
            <div className="job">
                {about.description}
            </div>
            <div className="tags">
                {
                    about.tags.map((tag,index)=>(
                        <Tag className="tag" key={index} color={color[index%4]}>{tag}</Tag>
                    ))
                }
            </div>
            <Divider>社交帐号</Divider>
            <div className="social">
                <Popover 
                    content={<a target='_blank' href='https://github.com/pocky-git'>https://github.com/pocky-git</a>} 
                    trigger="hover"
                >
                    <GithubOutlined />
                </Popover>
                <Popover 
                    content={'997859540'} 
                    trigger="hover"
                >
                    <QqOutlined />
                </Popover>
                <Popover 
                    content={'18368390633'} 
                    trigger="hover"
                >
                    <WechatOutlined />
                </Popover>
            </div>
        </div>
    )
}

export default My