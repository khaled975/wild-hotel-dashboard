import { useEffect } from "react";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated route

  const { isLoading, isAuthenticated } = useGetUser();

  // 2. if there no authenticated user, redirect to login page
  useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);

  // 3. while loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
