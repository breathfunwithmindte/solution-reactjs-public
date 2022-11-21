import React, { useCallback, useMemo, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import NonpageReader from '../../GenericTable/NonpageReader';
import FormApiTypes from '../../../types/FormApiTypes';
import useFetch from '../../../bssl/useFetch';
import useMain from '../../../bssl/Context';

/**
 * @typedef {Object} FormInput
 * @property {String} name
 * @property {String} type
 * @property {String?} label
 * @property {String[]} options 
 * @property {String?} width
 * @property {String?} size
 * @property {String?} script
 * @property {String?} classname
 * @property {String?} wrapper_classname
 * @property {String?} placeholder
 * @property {Boolean} readonly
 * @property {FormInput[]} inputs
 */


const Now_memoryreferenceselectfield = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const {state} = useMain();
  const input_key = input_props.input_key;
  const formtype = input_props.formtype;
  const [error_text, setError_text] = useState("");
  const [res, loading, error, refech, setRes] = useFetch(
    `/api/v1/sector/${current.options[0]}/getinfo-ref`
  );

  const read_path = useMemo(() => {
    if(error) return;
    if(!res) return;
    if(!res.data) return;
    let used_data  = { user: state.user };
    if(document) { used_data["document"] = document; used_data["document_id"] = document._id }
    return FormApiTypes.ApiTypes.READ_MANY(res.data, used_data);
  }, [res])
  const idname = "id__" + current.name + (input_key !== undefined ? `--${input_key}` : "")

  if(loading) return <Spinner  animation="border" role="status"></Spinner>
  if(error) return <div>{JSON.stringify(error)}</div>
  if(!res) return <div>{"No response"}</div>
  return ( <Now_memoryreferenceselectfield_select 
          current={current}
          input_key={input_key}
          input_props={input_props}
          formtype={formtype}
          error_text={error_text} 
          setError_text={setError_text}
          sector={res.data}
          read_path={read_path + "?" + (current.options[2] ? current.options[2] + "&" : "")}
      />
  );

}


const Now_memoryreferenceselectfield_select = ({
  input_props, current, input_key, sector, error_text, setError_text, read_path, formtype
}) => {
  const [res, loading, error, refetch, setRes] = useFetch(read_path + `table=${"ref-memory"}&limit=500`);
  React.useEffect(() => {
    if(current.script_onload) { try{eval(current.script_onload)}catch(err){console.log(err)} }
  }, [])

  const [disabled, setDisabled] = useState(current.readonly || false)

  const current_value = useMemo(() => {
    if(current.name.split(".").length > 1) {
      const [prefix, fieldname] = current.name.split(".");
      return input_props.formstate[prefix] ? input_props.formstate[prefix][fieldname] : "hi" 
    } else if (current.name.split("->").length > 1) {
      const [formstate_property, fieldname] = current.name.split("->");
      if(input_props.formstate[formstate_property] instanceof Array === false) return "none";
      return input_props.formstate[formstate_property][input_key] ? 
      (input_props.formstate[formstate_property][input_key][fieldname] || "") : "";
    } else {
      return input_props.formstate[current.name]
    }
  }, [input_props.formstate])

  const idname = "id__" + current.name + (input_key !== undefined ? `--${input_key}` : "")

  const getValueStr = useCallback(() => {
    if(!current_value) return "";
    if(typeof current_value === "string") return current_value;
    return current_value["_id"] || "";
  }, [current_value])

  if(loading) return <div style={{width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "" }}
  className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
    <Spinner  animation="border" role="status"></Spinner>
  </div>
  if(error) return <div style={{width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "" }}
  className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
    {JSON.stringify(error)}
  </div>
  if(!res) return (
    <div style={{width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "" }}
    className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      "no response"
    </div>
  )
  return (
    <div style={{width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "" }}
    className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      {current.label && (<Form.Label htmlFor={`${idname}`} className="mr1">{current.label}</Form.Label>)}
      <Form.Select
        style={{maxHeight: "492px"}}
        type="text"
        disabled={disabled}
        className={current.classname}
        placeholder={current.placeholder}
        id={`${idname}`}
        value={getValueStr()}
        onChange={(e) => {
          let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
          let continueproccess = true;
          if(current.script_onchange && current.script_onchange.length > 3) {
            try{ eval(`${current.script_onchange}`) }catch(err){console.log(err)}
          }
          if(!continueproccess) return;
          input_props.onchange(e.target.type, e.target.name, value);
        }}
        name={current.name}
        size={current.size}
      >
        <option value={"empty"}>{"< empty >"}</option>
        {res?.data?.documents && res.data.documents.map((o, oi) => {
          return (
            <option key={oi} value={o["_id"]}>{o[current.options[1] || "name"] || "field in ref not found."}</option>
          )
        })}
      </Form.Select>
      {current.description && (<div><Form.Text muted>{current.description}</Form.Text><br /></div>)}
      {error_text && (<Form.Text id={`danger__${idname}`} className="text-danger">{error_text}</Form.Text>)}
    </div>
  );
};

export default Now_memoryreferenceselectfield;