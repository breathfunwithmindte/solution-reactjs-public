import React from "react";
import ArrayMapInputs from "./ArrayMapInputs";
import Now_booleanfield from "./Elements/Now_booleanfield";
import Now_selectfield from "./Elements/Now_selectfield";
import Now_textfield from "./Elements/Now_textfield";
import Now_memoryreferenceselectfield from "./Elements/Now_memoryreferenceselectfield";
import CodeEditor from "./Elements/CodeEditor";
import Now_referencefield from "./Elements/Now_referencefield";
import Now_linefield from "./Elements/Now_linefield";
import Now_referencearrfield from "./Elements/Now_referencearrfield";
import Now_textarrayfield from "./Elements/Now_textarrayfield";
import Now_quildfield from "./Elements/Now_quillfield";
import Now_markdown from "./Elements/Now_markdown";
import Now_ImageURLInt from "./Elements/Now_ImageURLInt";
import Now_ImageURLExt from "./Elements/Now_ImageURLExt";

const FIELD_TYPES = {
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

const MapInputs = ({
  formInputs,
  onchange_basic,
  onchange_array,
  formrenderstate,
  formtype,
  setFormrenderstate,
  formstate,
  setFormstate,
  input_key,
}) => {
  return (
    <div className="w-100 d-flex j-cont-between f-wrap p0">
      {formInputs.sort((a, b) => (a.order - b.order)).filter(f => {
        if(f.renderstates instanceof Array === false) return false;
        if(f.renderstates.some(s => s === formrenderstate)) return true;
        return false;
      }).map((form_input, inp_index) => {
        switch (form_input.form_type) {
          case FIELD_TYPES.TEXT_FIELD:
            return (
              <Now_textfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.BOOLEAN_FIELD:
            return (
              <Now_booleanfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.SELECT_FIELD:
            return (
              <Now_selectfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.MEMORYSELECT_FIELD:
            return (
              <Now_memoryreferenceselectfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.HTML_FIELD:
            return (
              <Now_quildfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.MARKDOWN_FIELD:
            return (
              <Now_markdown
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.CODEEDITOR_FIELD:
            return (
              <CodeEditor
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.REFERENCE_FIELD:
            return (
              <Now_referencefield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case FIELD_TYPES.TEXTARRAY_FIELD:
            return (
              <Now_textarrayfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            )
            case FIELD_TYPES.IMAGE_URL_EXT_FIELD:
              return (
                <Now_ImageURLExt
                  input_config={form_input}
                  key={inp_index}
                  onchange={onchange_basic}
                  formstate={formstate}
                  setFormstate={setFormstate}
                  input_key={input_key}
                  formtype={formtype}
                />
              )
            case FIELD_TYPES.IMAGE_URL_INT_FIELD:
              return (
                <Now_ImageURLInt
                  input_config={form_input}
                  key={inp_index}
                  onchange={onchange_basic}
                  formstate={formstate}
                  setFormstate={setFormstate}
                  input_key={input_key}
                  formtype={formtype}
                />
              )
          case FIELD_TYPES.REFERENCEARR_FIELD:
            return (
              <Now_referencearrfield
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
                formtype={formtype}
              />
            );
          case "object":
            return (
              <fieldset
                className="w-100 p1 my0"
                style={{ borderColor: "var(--clr2)" }}
                key={inp_index}
              >
                <legend className="p1">{form_input.label}</legend>
                <MapInputs
                  formrenderstate={formrenderstate}
                  setFormrenderstate={setFormrenderstate}
                  formInputs={form_input.inputs}
                  onchange_basic={onchange_basic}
                  onchange_array={onchange_array}
                  formstate={formstate}
                  formtype={formtype}
                  setFormstate={setFormstate}
                  input_key={input_key}
                />
              </fieldset>
            );
          case FIELD_TYPES.ARRAY_FIELDS:
            return (
              <ArrayMapInputs
                formrenderstate={formrenderstate}
                setFormrenderstate={setFormrenderstate}
                key={inp_index}
                formInputs={form_input.fields}
                current={form_input}
                formtype={formtype}
                onchange_array={onchange_array}
                onchange_basic={onchange_basic}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
              />
            );
          case FIELD_TYPES.NONE_FIELD:
            return (<p style={{display: "none"}}>none</p>)
          case FIELD_TYPES.LINE_FIELD:
            return (
              <Now_linefield 
                input_config={form_input}
                key={inp_index}
                onchange={onchange_basic}
                formtype={formtype}
                formstate={formstate}
                setFormstate={setFormstate}
                input_key={input_key}
              />
            )
          default:
            return <p key={inp_index}>input not found</p>;
        }
      })}
    </div>
  );
};

export default MapInputs;
