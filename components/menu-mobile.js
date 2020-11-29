import { useEffect } from 'react'
import { withRouter } from 'next/router'
import Swiper from 'swiper'
import 'swiper/swiper.less'

import '../styles/components/menu-mobile.less'

const MenuMobile = ({tags, router}) => {
    useEffect(() => {
        initMenu()
    }, [])

    const initMenu = () => {
        new Swiper('#menu-swiper', {
            freeMode: true,
            slidesPerView: 'auto'
        })
    }

    return (
        <div className="menu-mobile">
            <div className="swiper-container" id="menu-swiper">
                <div className="swiper-wrapper">
                    <div
                        className={router.asPath === '/' ? 'swiper-slide active' : 'swiper-slide'}
                        onClick={() => router.push({ pathname: '/' })}
                    >
                        所有博客
                        </div>
                    {
                        tags.map(tag => (
                            <div
                                key={tag._id}
                                className={router.query.tagId === tag._id ? 'swiper-slide active' : 'swiper-slide'}
                                onClick={() => router.push({ pathname: '/', query: { tagId: tag._id } })}
                            >
                                {tag.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(MenuMobile)