import React, {useState} from 'react';
import '../../sass/components/_navbar.scss'
const Navbar =(props)=>{

    const [navlinks, setNavlinks] = useState([
        {name: "new", link:"/"},
        {name: "past", link:"/"},
        {name: "comments", link:"/"},
        {name: "ask", link:"/"},
        {name: "show", link:"/"},
        {name: "jobs", link:"/"},
        {name: "submit", link:"/"}
    ])

    return(
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src="//news.ycombinator.com/y18.gif" alt="Logo" />
                    Hackers News
                    </div>
                <ul className="menu">
                    {navlinks.map(nav=>(
                        <li>
                            <a href={nav.link}>{nav.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Navbar