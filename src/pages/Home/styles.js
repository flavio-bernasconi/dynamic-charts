import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;
