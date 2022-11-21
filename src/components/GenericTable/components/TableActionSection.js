import React, { useMemo, useState } from "react";
import { Button, Dropdown, DropdownButton, ButtonGroup, Form, Spinner, Pagination, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import useMain from "../../../bssl/Context";
import NonpageForm from "../../GenericForm/NonpageForm";

function TableActionSection({ 
  sector, reload, title, paginations, loading, setSkip,
  tablerenderstate
}) {
  const { theme } = useMain();
  const [opensomething, setOpensomething] = useState("none");
  const [opennew, setOpennew] = useState(false);
  const navigate = useNavigate();

  const copy_clipboard = () => {

  }

  const navigate_back = () => {
    navigate(`/admin/sector/${sector.name}/reader`);
  }



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
        {loading && (
            <Spinner className="mr0" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        <Button
          className="d-flex justify-content-center align-items-center mr1"
          variant="default"
          onClick={() => setOpensomething((pr) => (pr === "menu" ? "none" : "menu"))}
        >
          <span className="material-icons">menu</span>
          {opensomething === "menu" && (
            <div
              className="sol-opened-menu pt1 pb0"
              style={{ top: 46, left: "0px" }}
            >
              <div
                onClick={() => reload()}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">replay</span>
                <strong className="ml1">Reload Form</strong>
              </div>
              <div
                onClick={() => alert("No download option was configuered.")}
                className="d-flex align-items-center p1 sol-opened-menu-item"
              >
                <span className="material-icons">download</span>
                <strong className="ml1">Download</strong>
              </div>
              <div
                onClick={() => {}}
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
          <span className="ml1" style={{fontSize: "0.69rem", color: "red"}}>[{tablerenderstate}]</span>
        </div>
        {/* <Form className="mx0">
            <Form.Select onChange={(e) => {if(e.target.value === "none") return; setView(e.target.value)}}>
              <option value="none">view as</option>
              {
                sector.readers.map((curr_reader_elm, curr_reader_ind) => <option key={curr_reader_ind} value={curr_reader_elm}>
                  {curr_reader_elm.toUpperCase()}
                </option>)
              }
            </Form.Select>
          </Form> */}
      </ButtonGroup>
      <div className="d-flex al-items-center">
        {
          paginations.length !== 1 && (
          <Pagination style={{margin: "0px 1rem", paddingBottom: "0.46rem", maxWidth: 492, overflowX: "auto"}}>{paginations.map((p, i) =>{
            return (
              <Pagination.Item key={i} active={p.is_current} onClick={() => setSkip(p.page - 1)}>
                {p.page}
              </Pagination.Item>
            )
          })}</Pagination>
          )
        }
          {/* {options.new_btn && (
            <Button variant="outline-primary px0 pb1" onClick={() => {
          
            }}>New</Button>
          )} */}
        <ButtonGroup>
        <Button onClick={() => reload()} variant="default" className="d-flex justify-content-center align-items-center mx1">
          <span className="material-icons">refresh</span>
        </Button>
        <Button 
          variant="default" 
          className="d-flex justify-content-center align-items-center mx1"
          onClick={() => {
            setOpennew(true)
          }}
        >
          <span className="material-icons">add</span>
        </Button>
        <Button onClick={() => {
          if(loading) return;
          navigate(`/admin/sector/${sector.name}/form`)
        }}>
          New
        </Button>
        </ButtonGroup>
      </div>
      <Modal show={opennew} onHide={pr => setOpennew(false)} size={"xl"} scrollable={true} >
        <Modal.Header closeButton>
          <Modal.Title>{sector.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{...createStyle(theme.css), ...{width: "100%", height: "fit-content", minHeight: "34vh"}}}>
            <NonpageForm sectorname={sector.name} />
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default TableActionSection;


function createStyle(style) {
  let obj = {};
  if(!style) return {};
  for (const key in style) {
    if (Object.hasOwnProperty.call(style, key)) {
      obj[`--${key}`] = style[key];
    }
  }

  return obj;
}