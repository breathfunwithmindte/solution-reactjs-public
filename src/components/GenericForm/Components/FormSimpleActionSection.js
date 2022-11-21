import React, { useMemo, useState } from "react";
import { Button, Dropdown, DropdownButton, ButtonGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

function FormSimpleActionSection({ 
  form_ui, actions, sector, reload, title, handleSubmit, setRight_module, 
  formrenderstates, formrenderstate, setFormrenderstate
}) {
  const [opensomething, setOpensomething] = useState("none");
  const navigate = useNavigate();

  const open_debug = () => {
    setRight_module(pr => pr === "debug" ? "none" : "debug")
  }
  const open_help = () => {
    setRight_module(pr => pr === "help" ? "none" : "help")
  }
  const open_encryption_management = () => {
    alert("You are using default encryption.")
  }
  const open_authentication_management = () => {
    setRight_module("authenticationmanamgement")
  }

  const navigate_back = () => {
    navigate(`/admin/sector/${sector.name}/reader`);
  }

  const file_upload = () => {
    setRight_module(pr => pr === "fileupload" ? "none" : "fileupload")
  }

  const curr_action = useMemo(() => {
    if(actions instanceof Array === true && actions.find(f=> f["action"] === "primary-submit")) {
      return actions.find(f=> f["action"] === "primary-submit");
    }else {
      return null;
    }
  }, [actions])


  return (
    <section
      className="w-100 pr0 pl1 py1 d-flex al-items-center j-cont-between bg0"
      style={{
        zIndex: 14,
        boxShadow: "0px 0.4px 6.9px 0.14px var(--h)",
        position: "sticky",
        top: 0,
        zIndex: 14,
      }}
    >
      <ButtonGroup>
        <Button
          className="d-flex justify-content-center align-items-center mr1"
          variant="default"
          onClick={navigate_back}
        >
          <span className="material-icons">arrow_back</span>
        </Button>
        <Button
          className="d-flex justify-content-center align-items-center mr1"
          variant="default"
          onClick={() => setOpensomething((pr) => (pr === "menu" ? "none" : "menu"))}
        >
          <span className="material-icons">menu</span>
          {opensomething === "menu" && (
            <div
              className="sol-opened-menu pt1 pb0"
              style={{ top: 46, left: "-56px" }}
            >
              <div
                onClick={() => reload()}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">replay</span>
                <strong className="ml1">Reload Form</strong>
              </div>
              <div
                onClick={file_upload}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">file_upload</span>
                <strong className="ml1">File Upload</strong>
              </div>
              <div
                onClick={open_debug}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">code</span>
                <strong className="ml1">Debug</strong>
              </div>
              <div
                onClick={open_encryption_management}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">vpn_key</span>
                <strong className="ml1">Encryption</strong>
              </div>
              <div
                onClick={open_help}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">help</span>
                <strong className="ml1">More Help</strong>
              </div>
            </div>
          )}
        </Button>
        <div className="d-flex justify-content-center align-items-center mr1">
          <h1 style={{ fontSize: "1.5rem", whiteSpace: "nowrap", padding: 0, margin: 0 }}>
            {title}
          </h1>
          <Form.Select onChange={(e) => {
            setFormrenderstate(e.target.value)
          }} className="mx1">
              {formrenderstates.length === 0 && <option value={"form"}>{"default"}</option>} 
              {formrenderstates.map((fr, ind) => {
                return (
                  <option key={ind} value={fr.value}>{fr.label}</option>
                )
              })}
          </Form.Select>
          <span className="ml1" style={{fontSize: "0.69rem", color: "red"}}>[{formrenderstate}]</span>
        </div>
      </ButtonGroup>
      {/* <h1 style={{fontSize: "1.34rem", margin: 0}}>{title}</h1> */}
      <ButtonGroup>
       {form_ui.reload_form_btn && (
          <Button
            className="d-flex justify-content-center align-items-center mx1"
            variant="default"
            onClick={() => reload()}
          >
            <span className="material-icons">replay</span>
          </Button>
       )}
       {form_ui.upload_file_btn && (
          <Button
            className="d-flex justify-content-center align-items-center mx1"
            variant="default"
            onClick={file_upload}
          >
            <span className="material-icons">file_upload</span>
          </Button>
       )}
       {form_ui.debug_btn && (
          <Button
            className="d-flex justify-content-center align-items-center mx1"
            variant="default"
            onClick={open_debug}
          >
            <span className="material-icons">code</span>
          </Button>
       )}
       {form_ui.help_btn && (
          <Button
            className="d-flex justify-content-center align-items-center mx1"
            variant="default"
            onClick={open_help}
          >
            <span className="material-icons">help</span>
          </Button>
       )}
       {form_ui.encryption_management_btn && (
          <Button
            className="d-flex justify-content-center align-items-center mx1"
            variant="default"
            onClick={open_encryption_management}
          >
            <span className="material-icons">vpn_key</span>
          </Button>
       )}
        {curr_action && (
          <Button
            type="button"
            onClick={handleSubmit.bind({
              method: curr_action.method,
              url: curr_action.url,
              onresponse: curr_action.script_onresponse
            })}
            disabled={curr_action.url ? false : true}
            className={"mx1 px0"}
            variant={"primary"}
          >
            {curr_action.label || "Submit"}
          </Button>
        )}
      </ButtonGroup>
    </section>
  );
}

export default FormSimpleActionSection;
