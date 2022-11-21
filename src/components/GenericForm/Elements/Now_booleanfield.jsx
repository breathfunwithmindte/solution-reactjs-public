import React, { useEffect, useMemo } from 'react';
import Form from "react-bootstrap/Form";

/**
 * @typedef {Object} FormInput
 * @property {String} name
 * @property {String} type
 * @property {String?} label
 * @property {String[]} options 
 * @property {String?} wrapper_classname
 * @property {String?} width
 * @property {String?} size
 * @property {FormInput[]} inputs
 */

const Now_booleanfield = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const input_key = input_props.input_key;
  const formtype = input_props.formtype;

  useEffect(() => {
    if(current.script_onload) { try{eval(current.script_onload)}catch(err){console.log(err)} }
  }, [])

  const current_value = useMemo(() => {
    if(current.name.split(".").length > 1) {
      const [prefix, fieldname] = current.name.split(".");
      return input_props.formstate[prefix] ? input_props.formstate[prefix][fieldname] : false 
    } else if (current.name.split("->").length > 1) {
      const [formstate_property, fieldname] = current.name.split("->");
      if(input_props.formstate[formstate_property] instanceof Array === false) return false;
      return input_props.formstate[formstate_property][input_key] ? 
      (input_props.formstate[formstate_property][input_key][fieldname]) : false;
    } else {
      return input_props.formstate[current.name]
    }
  }, [input_props.formstate])

  const idname = "id__" + current.name + (input_key !== undefined ? `--${input_key}` : "")
  
  return (
    <div style={{width: current.width || "100%", minWidth: 169, display: current.visible === false ? "none": ""  }} 
    className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      <Form.Check
        type="checkbox"
        id={`${idname}`}
        disabled={current.readonly}
        label={current.label}
        checked={current_value || false}
        name={current.name}
        onChange={(e) => {
          let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
          let continueproccess = true;
          if(current.script_onchange && current.script_onchange.length > 3) {
            try{ eval(`${current.script_onchange}`) }catch(err){console.log(err)}
          }
          if(!continueproccess) return;
          input_props.onchange(e.target.type, e.target.name, value);
        }}
      />
    </div>
  );
};

export default Now_booleanfield;