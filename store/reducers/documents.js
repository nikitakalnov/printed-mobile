import * as Actions from "../actions/documents";
import * as Translit from "cyrillic-to-translit-js";

const GENERIC_DOCUMENT_MIME_TYPE = "application/octet-stream";

const initialState = {
  documents: []
};

export const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_DOCUMENT:
      let newDocument = {
        uri: action.uri,
        type: GENERIC_DOCUMENT_MIME_TYPE,
        name: Translit.default().transform(action.name)
      };
      return {
        documents: [...state.documents, newDocument]
      };
    case Actions.CLEAR_DOCUMENTS:
      return initialState;
    case Actions.REMOVE_DOCUMENT:
      return {
        documents: state.documents.filter(document => document.uri !== action.uri)
      };
    default:
      return initialState;
  }
};
