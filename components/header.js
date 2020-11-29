import { useState } from 'react'
import '../styles/components/header.less'
import Link from 'next/link'
import Router from 'next/router'
import { message, Input, Menu, Dropdown } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const { Search } = Input

const Header = () => {
    const [searchText, setSearchText] = useState('')

    const handleChange = e => {
        setSearchText(e.target.value.trim())
    }

    const onSearch = () => {
        if (!searchText) {
            return message.warning('博客名不能为空')
        }
        Router.push({ pathname: '/search', query: { searchText } })
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Link href='/'><a>博客首页</a></Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/about'><a>关于我</a></Link>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className='header'>
            <div className='container'>
                <Dropdown className='toggle-menu' overlay={menu} trigger={['click']} overlayStyle={{width:'250px',fontSize:'20px'}}>
                    <MenuOutlined className='toggle-icon'/>
                </Dropdown>
                <ul className='menu'>
                    <li><Link href='/'><a>博客首页</a></Link></li>
                    <li><Link href='/about'><a>关于我</a></Link></li>
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

export default Header