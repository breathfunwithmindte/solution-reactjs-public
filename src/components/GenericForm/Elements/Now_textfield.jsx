import React, { useMemo, useState } from 'react';
import Form from "react-bootstrap/Form";

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

const Now_textfield = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const input_key = input_props.input_key;
  const formtype = input_props.formtype;
  const [error_text, setError_text] = useState("");

  React.useEffect(() => {
    if(current.script_onload) { try{eval(current.script_onload)}catch(err){console.log(err)} }
  }, [])

  // name ? id--somename

  const current_value = useMemo(() => {
    //console.log("text field rendering", current.name)
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
  
  return (
    <div 
      style={{width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "" }} 
      className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      {current.label && (<Form.Label htmlFor={`${idname}`}>{current.label}</Form.Label>)}
      <Form.Control
        style={{maxHeight: "492px"}}
        type={current.input_type || "text"}
        readOnly={current.readonly}
        as={current.as || "input"}
        className={current.classname}
        placeholder={current.placeholder}
        id={`${idname}`}
        value={current_value || ""}
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
      />
      {current.description && (<div><Form.Text muted>{current.description}</Form.Text><br /></div>)}
      {error_text && (<Form.Text id={`danger__${idname}`} className="text-danger">{error_text}</Form.Text>)}
      
    </div>
  );
};

export default Now_textfield;