import React, { useEffect, useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { sql } from "@codemirror/lang-sql";
import { php } from "@codemirror/lang-php";
import { useParams } from 'react-router';
import codeplaceholders from './codeplaceholders';
import Button from "react-bootstrap/Button";
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

const CodeEditor = (input_props) => {
  /** @type {FormInput} current */
  const current = useMemo(() => input_props.input_config, []);
  const input_key = input_props.input_key;
  const { sectorname } = useParams();
  const [height, setHeight] = useState(current.options ? (current.options[1] || "300px") : "300px")
  
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
  }, [input_props.formstate[current.name]])

  const idname = "id__" + current.name + (input_key !== undefined ? `--${input_key}` : "")

  const getLangExtension = (language) => {
    if(language === "javascript") return javascript({ jsx: true });
    if(language === "javascript-only") return javascript({jsx: false});
    if(language === "css") return css();
    if(language === "json") return json();
    if(language === "markdown") return markdown();
    if(language === "php") return php();
    if(language === "sql") return sql();
    return html({ autoCloseTags: true });
  }

  useEffect(() => {
    if(sectorname === "business_rule" && !current_value && !["hi", "none", ""].some(s => s == current_value)) {
      input_props.onchange("code", current.name, codeplaceholders);
    }
  }, [current_value])

  return (
    <div style={{width: current.width || "100%", display: current.visible === false ? "none": "" }}
     className={current.wrapper_classname || "my1"} id={`wrapper__${idname}`}>
      <section className="d-flex al-items-center j-cont-between px0" style={{height: "calc(14px + 0.23vh)", minHeight: "46px", background: "var(--h)"}}>
        <strong>{current.label || "Code Block"}</strong>
        <div className="d-flex al-items-center j-cont-around">
          <Form className="mx0">
            <Form.Select onChange={(e) => {if(e.target.value === "none") return; setHeight(e.target.value)}}>
                <option value={current.options ? (current.options[1] || "300px") : "300px"}>{current.options ? (current.options[1] || "300px") : "300px"}</option>
                <option value={"128px"}> 128px</option>
                <option value={"963px"}> 963px</option>
                <option value={"1920px"}> 1920px</option>
                <option value={"3560px"}> 3560px</option>
            </Form.Select>
          </Form>
        </div>
       
      </section>
      <CodeMirror
        value={current_value || ""}
        height={height}
        extensions={[getLangExtension(current.options ? current.options[0] : "javascript")]}
        onChange={(value) => {
          input_props.onchange("code", current.name, value);
        }}
      />
    </div>
  );
};

export default CodeEditor;