import styled from "styled-components";
import Icon from "../Icon/Index";
import logohorizontal from "../../assets/img/logo_horizontal.png"
import { NavLink } from "react-router-dom";
import { useRef, useLayoutEffect } from "react";
import useAuth from "../../hooks/useAuth";

const AsideContainer = styled.dialog`
    background: ${({ theme }) => theme.bg};
    transition: all 300ms ease-in-out;
    border: none;
    outline: none;
    width: max-content;
    box-shadow: 8px 0px 15px rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    left: -50vw;
    bottom: 0;
    box-sizing: border-box;
    height: 100%;
    max-height: 100%;
    opacity: 0;

    &[open]{
        left: 0;
        opacity: 1;
        transition: all 300ms ease-in-out;
    }

    @starting-style {
        &[open] {
            opacity: 0;
            left: -50vw;
            transition: all 300ms ease-in-out;
        }
    }
    &::backdrop{
        background: #00000000;
        transition: all 300ms ease-in-out;
        cursor: pointer;
    }
    &[open]::backdrop{
        background: #0000007a;
        transition: all 300ms ease-in-out;
    }
    @starting-style {
        &[open]::backdrop{
            background: #00000000;
            transition: all 300ms ease-in-out;
        }
    }

`;
const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
`;
const Head = styled.section`
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    gap: 1rem;
    background: ${({ theme }) => theme.primary};
    border-bottom: 3px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.onprimary};

    & i:hover{
        background: ${({ theme }) => theme.primary};
        outline-style: solid;
    }
    & h2{line-height: normal;}

    @media screen and (min-width: 0px) and (max-width: 480px) {
        &{
        padding: 1rem .5rem;
    }
        & h2{
            font-size: 1.17rem;
        }
    }
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 0 .5rem .5rem .5rem;
`;

const Section = styled.nav`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 0;
    border-bottom: 2px solid ${({ theme }) => theme.primary};
    transition: all 300ms ease-in;

`;

const NavTab = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    border-radius: .5rem;
    padding-left: 0;
    padding-right: .125rem;
    transition: all 300ms ease-in;
    cursor: pointer;

    &:hover{
        background: ${({ theme }) => theme.primarycont};
        padding-left: .5rem;
    }
    &.active{
        padding-left: .5rem;
        background: ${({ theme }) => theme.onprimarycont};
        color: ${({ theme }) => theme.primarycont};
    }
`;
const NavBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    border-radius: .5rem;
    padding-left: 0;
    padding-right: .125rem;
    transition: all 300ms ease-in;
    cursor: pointer;
    &:hover{
        background: ${({ theme }) => theme.primarycont};
        padding-left: .5rem;
    }
`;

const ProfileSection = styled(Section)`
    color: ${({ theme }) => theme.onbg};
    & img{ &.no-photo{
            width: 4rem;
            height: 4rem;
            background: ${({ theme }) => theme.outline};
            color: ${({ theme }) => theme.surfacev};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &::after{
                content: "\\e853";
                font-size: 3rem;
                font-family: Material Icons;
                text-align: center;
            }
        }
        align-self: center;
        width: 30%;
        border-radius: 100%;
        border: 4px inset ${({ theme }) => theme.primarycont};
    }
    & h4{
        text-align: center;
        font-weight: 300;
    }
    & small{
        text-align: center;
    }
`;

const Logo = styled.div`
    text-align: center;
    box-sizing: border-box;
    padding: 1rem 0;

    & img{
        width: 8rem;
    }
`;

    const Sidebar = ({controls}) => {
    const {closeOutside, trigger, ref} = controls
    const { logout } = useAuth()
    const { user } = useAppContext()


    return <AsideContainer onClick={(e) => { closeOutside(e) }} ref={sidebarRef}>
        <Aside>
            <Head>
                <Icon onClick={handleSidebar} icon="close" />
                <h2>Menú</h2>
            </Head>
            <Content>
                <ProfileSection>
                    <img className={!user.photoURL ? "no-photo" : ""} src={user?.photoURL} referrerPolicy="no-referrer" alt="Profile" />
                    <h4>{user?.displayName}</h4>
                    <small>{user?.email}</small>
                </ProfileSection>
                <Section>
                    <NavTab to="/home" > Home <Icon icon="home" />
                    </NavTab>
                    <NavTab to="/" > Panel Administrador <Icon icon="dashboard" />
                    </NavTab>
                    <NavTab to="/" > Mis Vehiculos <Icon icon="directions_car" />
                    </NavTab>
                    <NavTab to="/asignaciones" > Usuarios Asignados <Icon icon="supervisor_account" />
                    </NavTab>
                    <NavTab to="/" > Notificaciones <Icon icon="notifications" />
                    </NavTab>
                </Section>
                <Section>
                    <NavTab to="/" > Perfil de Usuario <Icon icon="account_circle" /></NavTab>
                    <NavTab to="/" > Suscripción <Icon icon="credit_card" /></NavTab>
                    <NavBtn onClick={() => {
                        logout()
                    }}>
                        Cerrar Sesión
                        <Icon icon="logout" />
                    </NavBtn>
                </Section>
                <Section>
                    <NavTab to="/" > Ayuda <Icon icon="help" /></NavTab>
                    <NavTab to="/" > Accesibilidad <Icon icon="accessibility" /></NavTab>
                    <NavTab to="/" > Soporte <Icon icon="question_answer" /></NavTab>
                </Section>
            </Content>
            <Logo>
                <img src={logohorizontal} alt="Logo Horizontal" />
            </Logo>
        </Aside>
    </AsideContainer>
}

export default Sidebar;