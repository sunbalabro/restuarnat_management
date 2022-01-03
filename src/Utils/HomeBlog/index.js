import React from "react"
import homeBlog from "../../Assets/homeBlog.PNG"
export default function HomeBlog(){
    return(
        <div className="homeBlog">
        <div className="hmbh">
            <h1>Stay and Enjoy</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus illo similique natus, a recusandae? Dolorum, unde a quibusdam est? Corporis deleniti obcaecati quibusdam inventore fuga eveniet! Qui delectus tempore amet!</h3>
        </div>
        <div className="hmbi">
            <img src={homeBlog} alt="homeBlog" width="100%" />
        </div>
        </div>
    )
}