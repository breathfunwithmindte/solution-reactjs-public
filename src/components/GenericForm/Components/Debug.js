import React, { useMemo, useState } from 'react';
import { Button, ButtonGroup } from "react-bootstrap";
import CodeEditor from '../../CodeEditor';

function Debug({ formstate, actions, fields, sector }) {
  const [current_render, set_current_render] = useState("formstate")

  const value_render = () => {
    if(current_render === "formstate") return formstate;
    if(current_render === "sector") return sector;
    if(current_render === "actions") return actions;
    if(current_render === "renderstates") return sector.renderstates;
    if(current_render === "fields") return fields;
    if(current_render === "form-ui") return sector.form_ui;
    if(current_render === "001-fields-limited") return fields.map(f => { return { name: f.name, options: f.options, db_type: f.db_type, table_type: f.table_type, input_type: f.input_type, reference: f.reference, label: f.label, form_type: f.form_type  } });
    if(current_render === "002-fields-limited") return fields.map(f => { return { name: f.name, options: f.options?.join(","), type: `${f.db_type} || ${f.table_type} || ${f.form_type} || ${f.input_type}`, reference: f.reference, order: f.order, cf: f.childfield  }});
  }

  return (
    <div className="w-100" style={{position: "relative", height: "75vh", minHeight: 256, overflowY: "auto"}}>
        <ButtonGroup style={{flexWrap: "wrap"}}>
          <Button variant="outlined-primary" onClick={_=>set_current_render("formstate")}>
            Form State
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("sector")}>
            Sector
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("form-ui")}>
            Form UI
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("actions")}>
            Current Actions
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("renderstates")}>
            Render States
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("fields")}>
            Current Fields
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("001-fields-limited")}>
            001-fields-limited
          </Button>
          <Button variant="outlined-primary" onClick={_=>set_current_render("002-fields-limited")}>
            002-fields-limited
          </Button>
        </ButtonGroup>
        <CodeEditor
          language={"json"}
          height="693px"
          readonly={true}
          value={JSON.stringify(
            value_render(),
            null,
            2
          )}
        />
    </div>
  );
}

export default Debug;