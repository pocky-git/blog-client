import Head from 'next/head'

import { reqTag,reqAbout } from './api'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'

const About = ({tags,about}) => {
    return(
        <div className='index-page'>
            <Head>
                <title>关于我</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div className="main-content">
                <div className="container">
                <div className="left-content" dangerouslySetInnerHTML={{__html:about.content}}>
                    
                </div>
                <div className="right-content">
                    <My about={about}/>
                    <Category tags={tags}/>
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
        tags,about
      }
    }
  }

export default About