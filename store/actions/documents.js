export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const CLEAR_DOCUMENTS = "CLEAR_DOCUMENTS";
export const REMOVE_DOCUMENT = "REMOVE_DOCUMENT";

export const addDocument = (uri, name) => {
  return {
    type: ADD_DOCUMENT,
    uri,
    name
  };
};

export const clearDocuments = () => {
  return { type: CLEAR_DOCUMENTS };
};

export const removeDocument = (uri) => {
  return {
    type: REMOVE_DOCUMENT,
    uri: uri
  }
};
