import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";
import styled from "styled-components";
const StyledAppLayout = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-columns: 20% 1fr;
  grid-template-rows: auto 1fr;
`;
const StyledMainContent = styled.main`
  background-color: var(--color-grey-100);
  padding: 3rem 2.5rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <StyledMainContent>
          <Container>
            <Outlet />
          </Container>
        </StyledMainContent>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
