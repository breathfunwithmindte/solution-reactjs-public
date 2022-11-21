import { Button } from "react-bootstrap";
import React, { useCallback, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams, use, useLocation } from 'react-router';
import FormApiTypes from "../../types/FormApiTypes";

const CELL_TYPES = {
  CELL_TEXT: "CELL-TEXT",
  CELL_TEXT_JSON_STRINGIFY: "CELL-TEXT-JSON-STRINGIFY",
  CELL_TEXT_SUBSTRING: "CELL-TEXT-SUBSTRING",
  CELL_TEXT_ARRAY_JOIN: "CELL-TEXT-ARRAY-JOIN",
  CELL_TEXT_ARRAY_LENGTH: "CELL-TEXT-ARRAY-LENGTH",
  CELL_TEXT_DOTWALKING: "CELL-TEXT-DOTWALKING",
  CELL_IMAGE: "CELL-IMAGE",
  CELL_REFERENCE: "CELL-REFERENCE",
  CELL_REFERENCE_ARRAY: "CELL-REFERENCE-ARRAY",
  CELL_TRUE_FALSE: "CELL-TRUE-FALSE",
  CELL_LINK: "CELL-LINK",
  CELL_NAV: "CELL-NAV",
  CELL_NONE: "CELL-NONE"
}

const SearchComponent = ({col, filters, setFilters}) => {
  return (
    <Form>
      <Form.Control
        size="sm"
        value={filters[col.name] || ""}
        onChange={(e) => setFilters(pr => { return {...pr, [col.name]: e.target.value} })}
        placeholder={`search by #${col.label}`}
      />
      {/* {JSON.stringify(col)} */}
    </Form>
  )
}

export default function GenericTable({
  tablename = "",
  columns = [],
  rows = [],
  filters,
  clickable,
  onnavigate,
  sector,
  onclick,
  show_footer=true,
  setFilters,
  height="89vh",
  total = 0,
}) {
  const [show_search, setShow_search] = useState(false);
  const navigate = useNavigate()
  const { sectorname } = useParams()

  const cellstyle = useCallback((column) => {
    return { 
    width: "100%", minWidth: column.cell_width || 128, resize: "horizontal",
    maxWidth: 492, overflow: "auto", fontWeight: 300,  maxHeight: 69, minHeight: 56,
    }
  }, [])
  

  return (
    <div className="w-100">
      <div style={{ height: height, overflow: "auto" }}>
        <Table striped bordered hover size="sm">
          <thead
            style={{ background: "var(--bg0)", position: "sticky", top: 0, maxHeight: 20 }}
          >
            <tr>
              <th>
                <Button
                  className="d-flex justify-content-center align-items-center mr1"
                  variant="default"
                  onClick={()=>setShow_search(pr => !pr)}
                >
                  <span
                    className="material-icons"
                    style={{ fontSize: "0.97rem" }}
                  >
                    search
                  </span>
                </Button>
              </th>
              <th>#</th>
              <th>id</th>
              {columns.sort((a, b) => (a.order - b.order)).filter(f => f.type !== FormApiTypes.CellType.CELL_NONE).map((col, cind) => (
                <th key={cind}>{col.label}</th>
              ))}
              {columns.sort((a, b) => (a.order - b.order)).map((column, cindex) => {})}
            </tr>
            {show_search && (
              <tr>
                <th style={{ color: "var(--pr)" }}>{rows.length}</th>
                <th></th>
                <th><SearchComponent filters={filters} setFilters={setFilters}  col={{label: "id", name: "_id"}} /></th>
                {columns.filter(f => f.type !== FormApiTypes.CellType.CELL_NONE).map((col, cind) => (
                  <th key={cind} style={{ minWidth: "200px" }}><SearchComponent col={col} setFilters={setFilters} filters={filters} /></th>
                ))}
                {columns.map((column, cindex) => {})}
              </tr>
            )}
          </thead>
          <tbody className="bg1">
            {rows
              .map((row, rowindex) => {
                return (
                  <tr key={rowindex} style={{ cursor: clickable ? "pointer": "default" }} onClick={() => {
                    if(onclick) { onclick(row) }
                  }}>
                    <th style={{width: 15}}>
                      <div className="py1 px2">
                        <Button variant="default" className="d-flex al-items-center j-cont-cent" style={{padding: "0.14rem", margin: "0.23rem"}} onClick={() => {
                          if(clickable) return;
                          if(onnavigate) { onnavigate(row); }else {
                            window.open(`/admin/sector/${sectorname}/update/${row["_id"]}`)
                          }
                        }}>
                          <i className="material-icons">open_in_new</i>
                        </Button>
                      </div>
                    </th>
                    <th className="muted">
                      <div className="py1 px2"><p style={{"fontWeight": 963}}>{rowindex}</p></div>
                    </th>
                    <th className="" onClick={() => {
                      if(clickable) return;
                      if(onnavigate) { onnavigate(row); }else {
                        navigate(`/admin/sector/${sectorname}/update/${row["_id"]}`)
                      }
                    }} >
                      <div className="py1 px2"><p style={{"fontWeight": 250, minWidth: 129}}>{row["_id"]}</p></div>
                    </th>
                    {columns.sort((a, b) => (a.order - b.order)).filter(f => f.type !== FormApiTypes.CellType.CELL_NONE).map((column, columnindex) => {
                      if (column.type === FormApiTypes.CellType.CELL_TEXT_JSON_STRINGIFY) {
                        return (
                          <td key={columnindex}>
                            <div className="py1 px2" style={cellstyle(column)}>
                              <p>{JSON.stringify(row[column.name])}</p>
                            </div>
                          </td>
                        );
                      } else if (column.type === FormApiTypes.CellType.CELL_TEXT) {
                        return (
                          <td key={columnindex} >
                            <div className="py1 px2" style={cellstyle(column)}>
                              {row[column.name] instanceof Object ? JSON.stringify(row[column.name]) : row[column.name]}
                            </div>
                          </td>
                        );
                      } else if (column.type === FormApiTypes.CellType.CELL_NAV) {
                        return (
                          <td key={columnindex}>
                            <div className="py1 px2" style={cellstyle(column)}>
                              {JSON.stringify(row[column.name]).substring(1, -1)}
                            </div>
                          </td>
                        );
                      } else if (column.type === FormApiTypes.CellType.CELL_TRUE_FALSE) {
                        return (
                          <td key={columnindex}>
                            <div className="py1 px2" style={cellstyle(column)}>
                              {row[column.name] === true ? (
                                <i className="material-icons" style={{color: "green"}}>done</i>
                              ): (<i className="material-icons" style={{color: "red"}}>dangerous</i>)}
                              {JSON.stringify(row[column.name])}
                            </div>
                          </td>
                        );
                      } else if (column.type === CELL_TYPES.CELL_IMAGE) {
                        return (
                          <td key={columnindex}>
                            <div style={cellstyle(column)}>
                              img{JSON.stringify(row[column.name])}
                            </div>
                          </td>
                        );
                      } else if (column.type === CELL_TYPES.CELL_TEXT_SUBSTRING) {
                        return (
                          <td key={columnindex}>
                            <div className="py1 px2" style={cellstyle(column)}>
                              <p>{typeof row[column.name] === "string" ? row[column.name].substring(0, 256) : row[column.name]}</p>
                            </div>
                          </td>
                        );
                      } else if (column.type === CELL_TYPES.CELL_TEXT_ARRAY_JOIN) {
                        if(row[column.name] instanceof Array === false) return (<div>not an array</div>)
                        return (
                          <td key={columnindex}>
                            <div className="py1 px2" style={cellstyle(column)}>
                              <p>{row[column.name].join(",")}</p>
                            </div>
                          </td>
                        );
                      } else if (column.type === CELL_TYPES.CELL_REFERENCE) {
                        if(typeof row[column.name] === "object") {
                          const [sectorname, property] = column.options;
                          return (
                            <td key={columnindex}>
                              <div className="py1 px2" style={cellstyle(column)}>
                                <p>
                                  {row[column.name] ? row[column.name][property || "_id"] : "not found"}
                                </p>
                              </div>
                            </td>
                          )
                        } else {
                          return (
                            <td key={columnindex}>
                              <div className="py1 px2" style={cellstyle(column)}>
                                <p>{JSON.stringify(row[column.name])}</p>
                              </div>
                            </td>
                          )
                        }
                      } else if (column.type == CELL_TYPES.CELL_REFERENCE_ARRAY) {
                        if(row[column.name] instanceof Array === true) {
                          const [sectorname, property] = column.options;
                          return (
                            <td key={columnindex}>
                              <div className="py1 px2" style={cellstyle(column)}>
                                <p>
                                  {row[column.name].map(cc => cc[property || "_id"] ? cc[property || "_id"] : "not-found").join(",")}
                                </p>
                              </div>
                            </td>
                          )
                        } 
                      } else {
                        return (
                          <td>
                            <div className="py1 px2" style={cellstyle(column)}>
                              <p>unknow cell type - {column.type + CELL_TYPES.CELL_REFERENCE_ARRAY}</p>
                            </div>
                          </td>
                        )
                      }
                    })}
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {rows.length === 0 && (
          <h1 className="w-100" style={{ textAlign: "center", fontSize: "1.34rem" }}>
            No documents || 404{" "}
          </h1>
        )}
      </div>
      {show_footer && (
        <div className="w-100 p0 bg0">
          <strong>Total documents {total}</strong>
          <p>Current length {rows.length}</p>
        </div>
      )}

    </div>
  );
}
