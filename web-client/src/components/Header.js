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
      <SearchContent>
        <input placeholder="Search" type="text" required />
        <ion-icon name="search-outline"></ion-icon>
      </SearchContent>
      <MenuContent>
        {user ? (
          <>
            <AvatarUser src={user?.photoURL} alt="avatar" />
            <ion-icon name="log-in-outline" onClick={signOut}></ion-icon>
          </>
        ) : (
          <LoginContent onClick={signIn}>
            <ion-icon name="log-in-outline"></ion-icon>
          </LoginContent>
        )}
      </MenuContent>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  padding: 10px 0;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ImgaeLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const SearchContent = styled.div`
  display: flex;
  align-items: stretch;
  background-color: white;
  border-radius: 4px;
  padding: 4px;
  input {
    width: 400px;
    outline: none;
    border: none;
    @media screen and (max-width: 767px) {
      width: 200px;
    }
  }
  ion-icon {
    background-color: #3480eb;
    border-radius: 50%;
    padding: 4px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
  }
`;
const MenuContent = styled.div`
  display: flex;
  align-items: flex-end;
  ion-icon {
    width: 26px;
    height: 26px;
    margin-left: 2px;
    cursor: pointer;
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
  align-items: center;
  padding: 4px;
  background-color: #3480eb;
  border-radius: 50%;
`;

export default Header;
