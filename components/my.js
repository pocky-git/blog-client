import {Tag,Divider,Popover} from 'antd'
import { 
    GithubOutlined,
    QqOutlined,
    WechatOutlined 
} from '@ant-design/icons'

import '../styles/components/my.less'

const My = () => {
    return(
        <div className='my'>
            <div className="avantar">
                <img src="/avantar.jpg" alt=""/>
            </div>
            <div className="nickname">
                Pocky
            </div>
            <div className="job">
                前端开发
            </div>
            <div className="tags">
                <Tag color="magenta">React</Tag>
                <Tag color="red">Node</Tag>
                <Tag color="volcano">Next.js</Tag>
                <Tag color="orange">微信小程序</Tag>
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