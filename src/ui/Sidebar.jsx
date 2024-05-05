import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledSideBar = styled.aside`
  padding: 2rem 1.5rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function Sidebar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}

export default Sidebar;
