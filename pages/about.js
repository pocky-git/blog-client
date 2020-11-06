import Header from '../components/header'
import My from '../components/my'

const About = () => {
    return(
        <div className='index-page'>
            <Header />
            <div className="main-content">
                <div className="container">
                <div className="left-content">
                    
                </div>
                <div className="right-content">
                    <My/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default About