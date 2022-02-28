import styled from "styled-components";
// style={{ display: "flex", margin: 20, justifyContent: "space-between" }}

export const RowWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  row-gap: 20px;
  /* grid-template-columns: ${(props) =>
    `repeat(${props.numberOfColumns}, 1fr)`}; */
  grid-template-columns: ${(props) => `repeat(${props.numberOfColumns}, 1fr)`};
`;

export const Column = styled.div`
  border: solid 2px white;
`;
