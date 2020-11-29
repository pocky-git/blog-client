import { useEffect } from 'react'
import Head from 'next/head'
import { message, Row, Col } from 'antd'
import Markdown from '../components/markdown'
import Swiper from 'swiper'
import 'swiper/swiper.less'

import { reqTag, reqAbout } from '../api'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'
import Loading from '../components/loading'
import '../styles/pages/about.less'

const About = ({ tags, about }) => {
    useEffect(() => {
        initCase()
    }, [])

    const initCase = () => {
        new Swiper('#case', {
            slidesPerView: 3,
            spaceBetween: 15
        })
    }

    return (
        <div className='index-page'>
            <Head>
                <title>关于我</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon" />
            </Head>
            <Header />
            <div className="main-content">
                <div className="container">
                    <div className="left-content">
                        <div className="about-content">
                            <div className="title">
                                关于我
                            </div>
                            <Markdown content={about.content} />
                            <div className="case">
                                <div className="case-title">作品展示</div>
                                <Row gutter={[16,16]}>
                                    <Col xs={12} sm={8} md={6}>
                                        <a target="_blank" href="http://shejiba.cc/newGW/build/#/">
                                            <img src="/case1.jpg" alt="" />
                                        </a>
                                    </Col>
                                    <Col xs={12} sm={8} md={6}>
                                        <a target="_blank" href="http://gsls.cainiao.com">
                                            <img src="/case2.jpg" alt="" />
                                        </a>
                                    </Col>
                                    <Col xs={12} sm={8} md={6}>
                                        <a target="_blank" href="http://h5.yunplus.com.cn/cases/chudao/#/">
                                            <img src="/case3.jpg" alt="" />
                                        </a>
                                    </Col>
                                    <Col xs={12} sm={8} md={6}>
                                        <a target="_blank" href="http://1111.alimama.com">
                                            <img src="/case4.jpg" alt="" />
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        </div>
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

About.getInitialProps = async () => {
    // 获取标签列表
    const tagResult = await reqTag()
    const tagData = tagResult.data

    // 获取个人资料
    const aboutResult = await reqAbout()
    const aboutData = aboutResult.data

    if (tagData.code === 0 && aboutData.code === 0) {
        const tags = tagData.data
        const about = aboutData.data
        return {
            tags, about
        }
    } else {
        message.error('页面加载错误')
    }
}

export default About