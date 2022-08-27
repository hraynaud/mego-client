function extractJsonData(data: any, key: string) {
  return data[key];
}

function setSortedData(
  jsonResponse: any,
  collectionName: string,
  sortField: string
) {
  return sortData(
    extractJsonData(jsonResponse, collectionName).data,
    sortField
  );
}

function sortData(collection: Array<any>, key: string) {
  return collection.sort(function (a, b) {
    return a.attributes[key] > b.attributes[key] ? 1 : -1;
  });
}
export const jsonResponseHandler = {
  setSortedData,
};
