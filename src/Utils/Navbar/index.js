import React from 'react'
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import firebase from "../../Config/Firebase/index"
import logo from "../../Assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ navBackground}) {
    const user = firebase.auth().currentUser
    console.log(user)
   const LogoutUser = () =>{
       firebase.auth().signOut()
   }
    return (
        <div>
            <Menu mode="horizontal" className={navBackground ? "navBackground" : "nav"}>
            <Menu.Item>
                    <Link to="/">
                    <FontAwesomeIcon icon={faDharmachakra} /> Solo
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>
                {
                    user ?(<Menu.Item onClick={LogoutUser}>Logout</Menu.Item>)
                        :
                        (
                            <Menu.Item>
                                <Link to="/login">
                                    Sign In
                                </Link>
                            </Menu.Item>
                        )



                }

            </Menu>
        </div>
    )
}
