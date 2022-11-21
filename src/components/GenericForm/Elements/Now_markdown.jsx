import React, { useMemo, useState } from 'react';
import Form from "react-bootstrap/Form";
import MDEditor, { commands } from "@uiw/react-md-editor";

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

const Now_markdown = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const input_key = input_props.input_key;
  const formtype = input_props.formtype;
  const [error_text, setError_text] = useState("");
  const [fullscreen, setFullscreen] = useState(false);


  React.useEffect(() => {
    if(current.script_onload) { try{eval(current.script_onload)}catch(err){console.log(err)} }
  }, [])
  const [value, setValue] = useState("");
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
      style={{
        width: current.width || "100%", minWidth: "169px", display: current.visible === false ? "none": "",
        marginBottom: "1.4rem", marginTop: "1.4rem" 
      }} 
      className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      {current.label && (<Form.Label htmlFor={`${idname}`}>{current.label}</Form.Label>)}
      <div data-color-mode="light">
      <MDEditor
        fullscreen={fullscreen}
        value={current_value}
        height={current.options[0] ? current.options[0] : 369}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.hr,
          commands.title,
          commands.divider,
          commands.link,
          commands.quote,
          commands.code,
          commands.codeBlock,
          commands.image,
          commands.divider,
          commands.unorderedListCommand,
          commands.checkedListCommand,
        ]}
        onChange={(value_prop) => {
          let value = value_prop
          let continueproccess = true;
          if(current.script_onchange && current.script_onchange.length > 3) {
            try{ eval(`${current.script_onchange}`) }catch(err){console.log(err)}
          }
          if(!continueproccess) return;
          input_props.onchange("text", current.name, value);
        }}
      /></div>
    
     
      {current.description && (<div><Form.Text muted>{current.description}</Form.Text><br /></div>)}
      {error_text && (<Form.Text id={`danger__${idname}`} className="text-danger">{error_text}</Form.Text>)}
      
    </div>
  );
};

export default Now_markdown;