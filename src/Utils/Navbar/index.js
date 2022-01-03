import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
export default function Navbar({navBackground}) {
    return (
        <div>
            <Menu mode="horizontal" className={navBackground ? "navBackground" : "nav"}>
                <Menu.Item>
                    <Link to="/home">
                        Home
                    </Link>
                </Menu.Item>


            </Menu>
        </div>
    )
}
