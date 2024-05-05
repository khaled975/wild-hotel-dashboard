import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem 2.4rem;

  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: flex-end;
`;
function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
