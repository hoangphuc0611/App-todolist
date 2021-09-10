import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function Header() {
  const [user] = useAuthState(auth);
  const signIn = async () => {
    await auth.signInWithPopup(provider).catch((error) => {
      alert(error.message);
    });
  };
  const signOut = async () => {
    await auth.signOut();
  };
  return (
    <HeaderContainer>
      <Link to="/">
        <ImgaeLogo
          src="https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/158164145_215338803672391_9072952637420078797_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vTOoIyHIveMAX_J_MLV&_nc_ht=scontent.fsgn8-2.fna&oh=a975c22fcd12bc952a14d4a94ee142da&oe=61405DC5"
          alt="logo"
        />
      </Link>
      <MenuContent>
        {user ? (
          <>
            <AvatarUser src={user?.photoURL} alt="avatar" />
            <ion-icon name="log-in-outline" onClick={signOut}></ion-icon>
          </>
        ) : (
          <LoginContent onClick={signIn}>
            <span>Login</span>
            <ion-icon name="log-in-outline"></ion-icon>
          </LoginContent>
        )}
      </MenuContent>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  padding: 4px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3480eb;
`;
const ImgaeLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const MenuContent = styled.div`
  display: flex;
  align-items: center;
  ion-icon {
    width: 26px;
    height: 26px;
    margin-left: 2px;
    cursor: pointer;
    color: #fff;
    transition: all 0.25s ease-in;
    &:hover {
      opacity: 0.7;
    }
  }
`;
const AvatarUser = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  flex-shrink: 0;
`;

const LoginContent = styled.div`
  display: flex;
  align-items: stretch;
  padding: 4px 8px;
  border-radius: 4px;
  color: initial;
  cursor: pointer;
  color: #fff;
  transition: all 0.25s ease-in;
  &:hover {
    opacity: 0.7;
  }
`;

export default Header;
