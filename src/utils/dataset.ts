interface formatDatasetI {
  dataset: unknown[];
  key: string;
}

export const formatDataset = ({ dataset, key }: formatDatasetI): any[] => {
  if (!key) return [];
  const result = dataset.reduce(
    (acc: (number | string)[], { [key]: value }: any) => {
      if (!value) return acc;
      if (isNaN(Number(value))) return [...acc, value];
      return [...acc, Number(value)];
    },
    []
  );

  return result;
};

const isDatasetClean = (dataset: (number | string)[]): boolean => {
  const areAllNumbers = dataset.some(
    (d: number | string) => typeof d !== "number"
  );
  const areAllString = dataset.some(
    (d: number | string) => typeof d !== "string"
  );
  return areAllNumbers || areAllString;
};

const arrayOnlyUnique = (
  value: string | number,
  index: number,
  self: (string | number)[]
) => self.indexOf(value) === index;

export const getUniqueDataset = (datasetToFilter: (number | string)[]) =>
  datasetToFilter.filter(arrayOnlyUnique);
