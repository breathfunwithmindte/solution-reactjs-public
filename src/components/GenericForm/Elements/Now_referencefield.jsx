import React, { useMemo, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NonpageReader from '../../GenericTable/NonpageReader';

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

const Now_referencefield = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const input_key = input_props.input_key;
  const formtype = input_props.formtype;
  const [error_text, setError_text] = useState("");
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if(current.script_onload) { try{eval(current.script_onload)}catch(err){console.log(err)} }
  }, [])
  // name ? id--somename

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
  

  return (
    <div style={{width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "" }}
     className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      {current.label && (<Form.Label htmlFor={`${idname}`}>{current.label}</Form.Label>)}
      <div className="d-flex al-items-center j-cont-between w-100">
      <Form.Control
        style={{maxHeight: "492px"}}
        type="text"
        readOnly={current.readonly}
        as={current.as || "input"}
        className={current.classname}
        placeholder={current.placeholder}
        id={`${idname}`}
        value={(current_value instanceof Object === true) ? (current_value[current["options"][1]] || current_value["_id"]) : (typeof current_value === "string" ? current_value : "")}
        onChange={(e) => {
          let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
          if(current.script_onchange && current.script_onchange.length > 3) {
            try{ eval(`${current.script_onchange}`) }catch(err){console.log(err)}
          }
          input_props.onchange(e.target.type, e.target.name, value);
        }}
        name={current.name}
        size={current.size}
      />
      <Button onClick={() => {
        if(current.ref_readonly) return alert("This field is readonly.")
        setOpen(pr => !pr)
      }} className="d-flex al-items-center j-cont-center"><span className="material-icons">search</span></Button>
      </div>
      {current.description && (<div><Form.Text muted>{current.description}</Form.Text><br /></div>)}
      {error_text && (<Form.Text id={`danger__${idname}`} className="text-danger">{error_text}</Form.Text>)}
      {
        open && (
          <div style={{border: "1px solid var(--h)"}}>
            <NonpageReader sectorname={current.options[0]} height={"300px"} clickable={true}
              reference={current}
              query={current.options[2]}
              used_as="ref"
              onclick={(row) => {
                let value;
                if(current_value && current_value["_id"]) {
                  if(current_value["_id"] === row["_id"]) { value = null; }
                  else { value = { _id: row._id, [current.options[1] || "_id"]: row[current.options[1] || "_id"] } } 
                } else {
                  value = { _id: row._id, [current.options[1] || "_id"]: row[current.options[1] || "_id"] }
                }
                if(current.script && current.script.length > 3) {
                  try{ eval(`${current.script}`) }catch(err){console.log(err)}
                }
                input_props.onchange("text", current.name, value);
              }}
            />
          </div>
        )
      }
    </div>
  );
};

export default Now_referencefield;