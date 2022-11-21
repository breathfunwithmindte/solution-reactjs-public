import GetURL from "./_GetURL";
import { ApiType } from "./_ApiType";

const CellType = {
  CELL_TEXT: "CELL-TEXT",
  CELL_TEXT_JSON_STRINGIFY: "CELL-TEXT-JSON-STRINGIFY",
  CELL_TEXT_SUBSTRING: "CELL-TEXT-SUBSTRING",
  CELL_TEXT_ARRAY_JOIN: "CELL-TEXT-ARRAY-JOIN",
  CELL_TEXT_ARRAY_LENGTH: "CELL-TEXT-ARRAY-LENGTH",
  CELL_TEXT_DOTWALKING: "CELL-TEXT-DOTWALKING",
  CELL_IMAGE: "CELL-IMAGE",
  CELL_REFERENCE_ARRAY: "CELL-REFERENCE-ARRAY",
  CELL_TRUE_FALSE: "CELL-TRUE-FALSE",
  CELL_LINK: "CELL-LINK",
  CELL_NAV: "CELL-NAV",
  CELL_NONE: "CELL-NONE"
}

const FormInputType = {
  TEXT_FIELD: "TEXT-FIELD",
  TEXTARRAY_FIELD: "TEXTARRAY-FIELD",
  BOOLEAN_FIELD: "BOOLEAN-FIELD",
  SELECT_FIELD: "SELECT-FIELD",
  IMAGE_URL_INT_FIELD: "IMG_URL_INT_FIELD",
  IMAGE_URL_EXT_FIELD: "IMG_URL_EXT_FIELD",
  ARRAY_FIELDS: "ARRAY-FIELDS",
  REFERENCE_FIELD: "REFERENCE-FIELD",
  REFERENCEARR_FIELD: "REFERENCEARR-FIELD",
  SELECTREFERENCE_FIELD: "SELECTREFERENCE-FIELD",
  MEMORYSELECT_FIELD: "MEMORYSELECT-FIELD",
  CODEEDITOR_FIELD: "CODEEDITOR-FIELD",
  MARKDOWN_FIELD: "MARKDOWN-FIELD",
  HTML_FIELD: "HTML-FIELD",
  RICHEDITOR_FIELD: "RICHEDITOR-FIELD",
  LINE_FIELD: "LINE-FIELD",
  ALERT_FIELD: "ALERT-FIELD",
  NONE_FIELD: "NONE-FIELD"
};

const ApiTypes = {
  READ_MANY: (sector, data) => GetURL(sector, ApiType.READ_MANY, data || {  }),
  CREATE_ONE: (sector, data) => GetURL(sector, ApiType.CREATE_ONE, data || {  }),
  UPDATE_BY_ID: (sector, data) => GetURL(sector, ApiType.UPDATE_BY_ID, data || {  }),
  DELETE_BY_ID: (sector, data) => GetURL(sector, ApiType.DELETE_BY_ID, data || {  }),
  READ_BY_ID: (sector, data) => GetURL(sector, ApiType.READ_BY_ID, data || {  }),
  FILE_UPLOAD: (sector, data) => GetURL(sector, ApiType.FILE_UPLOAD, data || {  }),
  FILE_READ: (sector, data) => GetURL(sector, ApiType.FILE_READ, data || {  }),
  DO_SOMETHING: (sector, data) => GetURL(sector, ApiType.DOSOMETHING, data || {  }),
  COMMENT_READ: (sector, data) => GetURL(sector, ApiType.COMMENT_READ, data || {  }),
  COMMENT_WRITE: (sector, data) => GetURL(sector, ApiType.COMMENT_WRITE, data || {  })
}

export default {
  ApiTypes, FormInputType, CellType
}