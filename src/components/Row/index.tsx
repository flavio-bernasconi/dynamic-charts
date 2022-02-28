import React, { FunctionComponent } from "react";
import { RowWrapper, Column } from "./styles";

export interface RowProps {
  columns: string[];
}

export const Row: FunctionComponent<RowProps> = ({ columns }) => {
  return (
    <RowWrapper numberOfColumns={columns.length}>
      {columns.map((x, i) => (
        <Column key={i}>{x}</Column>
      ))}
    </RowWrapper>
  );
};
