import React, {useEffect, useState} from 'react';
import './hearder.css';
import {Menubar} from "primereact/menubar";
import logo from './../../logo.svg';
import {useNavigate, useLocation} from "react-router-dom";
import {TabMenu} from "primereact/tabmenu";

const Header = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(3);

    useEffect(() => {
        if (location.pathname === "/"){
            setActiveIndex(0);
        }else if (location.pathname === "/quiz"){
            setActiveIndex(1);
        } else if (location.pathname === "/admin"){
            setActiveIndex(2);
        }
    }, [location.pathname]);

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Quiz', icon: 'pi pi-fw pi-bolt'},
        {label: 'Administration', icon: 'pi pi-fw pi-users'},
    ];

    const handleNavigation = (index: number) => {
        if (index === 0){
            setActiveIndex(index);
            navigateTo("/");
        } else if (index === 1){
            setActiveIndex(index);
            navigateTo("/quiz");
        } else if (index === 2){
            setActiveIndex(index);
            navigateTo("/admin");
        }
    }
    const logoApp = <div className="grid">
                        <div className="col mt-2" style={{width:'60px'}}><img alt="logo" src={logo} height="40" className="app-logo mr-2"/></div>
                        <div className="col app-name">Quizo</div>
                    </div>;
    const navButton = <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => handleNavigation(e.index)} />

    return (
        <div className="mt-6 mb-6 border-round shadow-2">
            <Menubar start={logoApp} end={navButton}/>
        </div>
    );
}

export default Header;
