import Head from 'next/head'

import { reqTag } from './api'
import Header from '../components/header'
import My from '../components/my'
import Category from '../components/category'

const About = ({tags}) => {
    return(
        <div className='index-page'>
            <Head>
                <title>关于我</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <div className="main-content">
                <div className="container">
                <div className="left-content">
                    
                </div>
                <div className="right-content">
                    <My/>
                    <Category tags={tags}/>
                </div>
                </div>
            </div>
        </div>
    )
}

About.getInitialProps = async () => {
    const tagResult = await reqTag()
    const tagData = tagResult.data
    
    if (tagData.code === 0) {
      const tags = tagData.data
      return {
        tags
      }
    }
  }

export default About