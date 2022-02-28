import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { SelectInput } from "components/Select";
import { Grid, SelectChangeEvent } from "@mui/material";
import { OptionsListConfigInterface } from "../BarChartSection";

export const MultipleSelects = ({
  optionListConfig,
  optionsList,
}: {
  optionListConfig: OptionsListConfigInterface[];
  optionsList: string[];
}) => {
  const handleInputChange = (
    e: SelectChangeEvent<number | string>,
    keySetter: Function
  ) => {
    const values = e.target.value;
    keySetter(values.toString());
  };

  return (
    <div style={{ margin: 30 }}>
      <Grid container spacing={2}>
        {optionListConfig.map(({ setter, label, value }, i) => (
          <Grid item xs={6} md={4} key={`${label}_${value}_${i}`}>
            <SelectInput
              optionsList={optionsList}
              handleChange={(e) => handleInputChange(e, setter)}
              label={label}
              currentValue={value}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
