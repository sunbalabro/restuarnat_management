import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div>
            <Menu mode="horizontal">
                <Link to="/home">
                <Menu.Item>
                    Home
                </Menu.Item>
                </Link>
                
            </Menu>
        </div>
    )
}
