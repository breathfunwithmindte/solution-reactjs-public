import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { sql } from "@codemirror/lang-sql";
import { Form } from 'react-bootstrap';

const CodeEditor = ({ language, value, onchange=()=>{}, height, readonly }) => {

  const getLangExtension = (language) => {
    if(language === "javascript") return javascript({ jsx: true });
    if(language === "javascript-only") return javascript({jsx: false});
    if(language === "css") return css();
    if(language === "json") return json();
    if(language === "markdown") return markdown();
    return html({ autoCloseTags: true });
  }

  return (
    <div className="w-100">
      <CodeMirror
        readOnly={readonly || false}
        value={value || ""}
        height={height || "963px"}
        extensions={[getLangExtension(language || "javascript")]}
        onChange={onchange}
      />
    </div>
  );
};

export default CodeEditor;