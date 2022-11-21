import React, { useCallback, useMemo, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Request from "../../bssl/Request";
import GenericForm from "../../components/GenericForm/GenericForm";
import replace_string from "../../bssl/replace_string";
import config from "../../bssl/config.json";
import useMain from "../../bssl/Context";
import useFetch from "../../bssl/useFetch";
import GenericTable from "../GenericTable/GenericTable";
import { useNavigate, useParams, use, useLocation } from "react-router";
import NonpageReader from "../GenericTable/NonpageReader";
import CodeEditor from "../CodeEditor";
import FormActionSection from "./Components/FormActionSection";
import Comments from "./Components/Comments";
import DeleteDoc from "./Components/DeleteDoc";
import VersionManagement from "./Components/VersionManagement";
import Debug from "./Components/Debug";
import FileUpload from "./Components/FileUpload";
import FormApiTypes from "../../types/FormApiTypes";

function get_query_url (query, sector, user, reference, document) {
  if(!sector) return null;
  return replace_string(query, {
    sector: sector,
    sectorname: sector.name,
    reference: reference,
    document: document,
    document_id: document?._id,
    domain: config["mode"] === "dev" ? config["dev-domain"] : config["prod-domain"],
    apidomain: config["mode"] === "dev" ? config["dev-domain-api"] : config["prod-domain-api"],
    config: config,
    user: user
  })
}

const SwitchRightModule = ({right_module, sector, document_id, actions, fields, formstate, setFormstate}) => {
  switch (right_module) {
    case "comment": return <Comments sector={sector} document_id={document_id} />
    case "delete": return <DeleteDoc document_id={document_id} />
    case "versionmanagement": return <VersionManagement formstate={formstate} />
    case "fileupload": return <FileUpload formstate={formstate} setFormstate={setFormstate} sector={sector} />
    case "debug": return <Debug actions={actions} formstate={formstate} sector={sector} fields={fields} />
    default:
      break;
  }
}

export default function UpdateForm({ sector, response, document_id, reload }) {
  const { state } = useMain();
  const { search } = useLocation();
  const [formstate, setFormstate] = useState(() => new Object());
  const [form_alerts, setForm_Alerts] = useState(sector.alerts || []);
  const [active_relative, setActive_Relative] = useState(null);
  const [title, setTitle] = useState(sector.label || "New Form");
  const [fields, setFields] = useState(sector.fields || []);
  const [right_module, setRight_module] = useState("none");
  const [relatives, setRelatives] = useState(sector.relatives || []);
  const navigate = useNavigate();
  const [formrenderstates, setFormrenderstates] = useState(pr => {
    const render_states = [];
    if(sector.renderstates instanceof Array !== true) return [];
    sector.renderstates.map(r => {
      if(r.type !== "formupdate") return;
      if(r.group === "*") return render_states.push(r);
      if(!state.user) return;
      if(state.user.groups instanceof Array !== true) return;
      if(state.user.groups.some(s => s.id === r.group)) render_states.push(r);
    })
    return render_states;
  });
  const [formrenderstate, setFormrenderstate] = useState(sector.formrenderstate || "formupdate");

  const [actions, setActions] = useState(pr => {
    const defaultactions = [
      {
        label: "SAVE",
        action: "primary-submit",
        when: "formupdate",
        variant: "outline-primary",
        script: null,
        script_onresponse: '.',
        classname: "w-350 py1",
        method: "PUT",
        url: FormApiTypes.ApiTypes.UPDATE_BY_ID(sector, { user: state.user, document_id }) + "?form=updateform",
      },
      {
        label: "DELETE",
        action: "delete",
        when: "always",
        script: "load = false;",
        script_onresponse: "",
        variant: "outline-danger",
        classname: "w-350 py1",
        method: "DELETE",
        url: FormApiTypes.ApiTypes.DELETE_BY_ID(sector, { user: state.user, document_id }) + "?form=updateform",
      }
    ];
    if(sector.actions instanceof Array === false) return defaultactions;
    const filtered_actions = sector.actions.filter(f => ["formupdate", "always"].some(s => s === f["when"]));
    return filtered_actions.map(i => {
      return {...i, url: replace_string(i.url + "?form=updateform", {
        user: state.user, state, sector: sector, response, document: response ? response.document : null,
        sectorname: sector.name, document_id: document_id
      }) }
    });
  });

  useEffect(() => {
    if (!sector) return;
    if (!response) return;
    
    if(response.fields) { setFields(response.fields) }
    if(response.relatives) { setRelatives(response.relatives) }
    if(response.alerts) { setForm_Alerts(response.alerts) }
    if(response.actions) { setActions(response.actions) }
   
    setFormstate(response.document ? { ...response.document } : {});
    const curr = sector.client_scripts.filter(f => f.type === "formupdate_onload");
    curr.map(i => { try{ eval(i.script) }catch(err){console.log(err)} })
  }, [sector, response]);

  const request_callback = function ({ status, error, response, data, content_type }) {
    const { method, url, onresponse } = this;
    if (
      ![200, 201, 400, 404, 403, 401, 500, 503, 202, 301, 404, 501].some(
        (s) => s === status
      )
    ) {
      return alert(
        "Status is not supported by current form. status = " + status
      );
    }
    if (content_type !== "application/json") {
      return setForm_Alerts((pr) => {
        return [
          ...pr,
          {
            severity: "danger", type: "formupdate",
            title: `Error Response ${status}`,
            message: "Content Type not supported by current form.",
            visibility: "both",
          },
        ];
      });
    }

    if (error) {
      return setForm_Alerts((pr) => {
        return [
          ...pr,
          {
            severity: "danger", type: "formupdate",
            title: `Error Response STATUS =  ${status}`,
            message: `[ERROR]::${JSON.stringify(error)}`,
            visibility: "both",
          },
        ];
      });
    }

    if (onresponse && onresponse.length > 3) {
      try{ eval(onresponse) } catch(err) { console.log(err); }
    }else {
      if(status === 200 || status === 201) {
        return setForm_Alerts((pr) => {
          return [
            ...pr,
            {
              severity: "success", type: "formupdate",
              title: `OK`,
              message: data.message || "Request completed successfully.",
              visibility: "both",
            },
          ];
        });
        // setFormstate(pr => { return {} })
      }else if (status === 400) {
        return setForm_Alerts((pr) => {
          return [
            ...pr,
            {
              severity: "danger", type: "formupdate",
              title: `Error Response ${status}`,
              visibility: "both",
              message:
                data.errors instanceof Array === true
                  ? data.errors.map((e) => e.descriptions).join("|next|")
                  : "Bad Request",
            },
          ];
        });
      } else {
        return setForm_Alerts((pr) => {
          return [
            ...pr,
            {
              severity: "danger", type: "formupdate",
              title: `Error Response ${status}`,
              message: data.message || "Request not finished successfully.",
              visibility: "both",
            },
          ];
        });
      }


    }
  }


  async function handleSubmit(e) {
    const { method, url, onresponse } = this;
    let usablemethod = method ? method.toLowerCase() : "get";
    if(usablemethod === "get") {
      await Request[usablemethod](url, request_callback.bind({
        usablemethod, url, onresponse
      }));
    }else {
      await Request[usablemethod](url,{ formstate: {...formstate, superadmin: undefined}, formrenderstate }, request_callback.bind({
        usablemethod, url, onresponse
      }));
    }
  }

  return (
    <div className="w-100" style={{ position: "relative" }}>
      <FormActionSection 
        form_ui={sector.form_ui} sector={sector} reload={reload} actions={actions} 
        formrenderstate={formrenderstate} formrenderstates={formrenderstates} setFormrenderstate={setFormrenderstate}
        title={title} handleSubmit={handleSubmit} setRight_module={setRight_module} document_id={document_id}
      />
      <div className="w-100 d-flex j-cont-between">
        <GenericForm
          inputs={fields}
          formstate={formstate}
          formtype={"formupdate"}
          formrenderstate={formrenderstate}
          setFormrenderstate={setFormrenderstate}
          width={right_module === "none" ? "100%" : "56%"}
          form_alerts={form_alerts.filter((f) => f.type === "formupdate")}
          setFormstate={setFormstate}
          setForm_Alerts={setForm_Alerts}
          handleSubmit={handleSubmit}
          actions={actions}
        />
        {
          right_module !== "none" && (
            <div style={{width: "34%", borderLeft: "1px solid var(--h)", height: "fit-content", position: "sticky", top: 56}}>
              <SwitchRightModule 
                right_module={right_module} 
                sector={sector} 
                document_id={document_id} 
                actions={actions}
                formstate={formstate}
                fields={fields}
              />
            </div>
          )
        }
      </div>
      {relatives instanceof Array === true &&
        relatives.length > 0 && (
          <div className="px0 " style={{ marginBottom: 256 }}>
            <h2>Relative Content</h2>
            <div className="bg0 p1">
              {relatives.map((rel, ind) => {
                return (
                  <Button
                    key={ind}
                    onClick={() => setActive_Relative(rel)}
                    variant="default"
                  >
                    <strong>{rel.btn_label + `(${rel.count})`}</strong>
                  </Button>
                );
              })}
            </div>
            <div style={{ border: "1px solid" }}>
              {active_relative && (
                <NonpageReader 
                  sectorname={active_relative.sectorname} 
                  height="423px" onclick={()=>{}} 
                  document={response ? response.document : {  }}
                  new_btn={`/sector/${active_relative.sectorname}/form?${get_query_url(active_relative.query, {
                    name: active_relative.sectorname
                  }, state.user, null, response ? response.document : {  })}`}
                  onnavigate={(doc) => {
                    navigate(`/admin/sector/${active_relative.sectorname}/update/${doc["_id"]}`)
                  }}
                  query={active_relative.query}
                />
              )}
            </div>
            {/* <GenericTable tablename="Asd" columns={[{nan: "asd"}]} rows={[{id: 1, nan: "hello world"}]} /> */}
          </div>
        )}
    </div>
  );
}
