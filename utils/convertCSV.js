import Papa from "papaparse";
export const convertToCSV = data => {
  const headers = Object.keys(data[0]);
  const csv = Papa.unparse({ fields: headers, data: data });
  return csv;
};
