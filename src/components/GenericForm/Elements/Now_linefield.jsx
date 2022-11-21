import React, { useMemo, useState } from 'react';

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

const Now_linefield = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const input_key = input_props.input_key;
  const formtype = input_props.formtype;
  const [error_text, setError_text] = useState("");


  const idname = "id__" + current.name + (input_key !== undefined ? `--${input_key}` : "")
  
  return (
    <div style={{width: current.width || "100%", marginTop: 34, display: current.visible === false ? "none": "" }}
     className={current.wrapper_classname || "my2"} id={`wrapper__${idname}`}>
      <h3 id={`${idname}`}>{current.label}</h3>
      <hr  />
    </div>
  );
};

export default Now_linefield;