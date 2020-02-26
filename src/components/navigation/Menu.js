import React, { useEffect } from "react";

import styled from "styled-components";

const S = {
    Menu: styled.div`
    position:fixed;
    right: -200px;
    top: 64px;
    width:200px;
    height: calc(100vh - 64px);
    background-color: #dcdcdc;
    color:black;
    transition:0.3s;
    transform: ${(props) => props.transform};
    ul{
        width:100%;
        height:
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        li{
            height:25px;
            width:60%;
            text-align: left;
            list-style: none;
            cursor: pointer;
            border-radius: 2px;
            padding-left:10px;
            padding-top:5px;

        :hover {
            color: white;
            border-bottom: 1px solid #00000033;
            text-shadow: 0px 1px black;
        }
        :active {
            background: #b8bac1;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
            outline: none;
        }
        }
    }
    `
};

export default function Menu(props) {
    useEffect(() => {
        document.addEventListener("mouseup", senseMenu);
        return () => {
            document.removeEventListener("mouseup", senseMenu);
        };
    }, []);
    function senseMenu(event) {
        console.log(event);
        if (event.toElement.className.includes("menu")) {
            return null;
        } else if (event.target.className.includes("menu")) {
            return null;
        } else if (event.target.offsetParent.className.includes("menu")) {
            return null;
        } else {
            closeMenu();
        }
    }
    const redirectUrl = process.env.REACT_APP_REDIRECTURI
        ? process.env.REACT_APP_REDIRECTURI
        : "http://localhost:3000/";

    function logout() {
        sessionStorage.clear("id_token");
        window.location.replace(redirectUrl);
    }

    function closeMenu() {
        props.setshowMenu(false);
    }
    return (
        <S.Menu
            className="menu"
            transform={props.showMenu ? "translateX(-200px)" : ""}
            onBlur={closeMenu}
        >
            <ul>
                <li onClick={logout}>
                    <i class="fas fa-sign-out-alt"></i> Logout
                </li>
            </ul>
        </S.Menu>
    );
}
