import {useState,useEffect} from 'react'
import '../styles/components/header.less'
import Link from 'next/link'
import {withRouter} from 'next/router'
import {Input} from 'antd'
import {message} from 'antd'

const {Search} = Input

const Header = ({router}) => {
    const [path,setPath] = useState('')
    const [searchText,setSearchText] = useState('') 

    useEffect(() => {
        setPath(router.pathname)
    }, [])

    const handleChange = e => {
        setSearchText(e.target.value.trim())
    }

    const onSearch = () => {
        if(!searchText){
            return message.warning('博客名不能为空')
        }
        router.push({pathname:'/',query:{searchText}})
    }

    return(
        <div className='header'>
            <div className='container'>
                <ul className='menu'>
                    <li className={path==='/'?'active':''}><Link href='/'><a>博客首页</a></Link></li>
                    <li className={path==='/about'?'active':''}><Link href='/about'><a>关于我</a></Link></li>
                </ul>
                <div className="search">
                    <Search 
                        value={searchText}
                        onChange={handleChange}
                        placeholder="搜索博客" 
                        onSearch={onSearch}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)