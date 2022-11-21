import React, { useCallback, useMemo, useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Request from '../../bssl/Request';
import GenericForm from '../../components/GenericForm/GenericForm';
import replace_string from '../../bssl/replace_string';
import config from "../../bssl/config.json";
import useMain from '../../bssl/Context';
import { useNavigate, useParams, use, useLocation } from 'react-router';
import Debug from "./Components/Debug";
import FormSimpleActionSection from "./Components/FormSimpleActionSection"
import HelpComp from './Components/HelmComp';
import FileUpload from './Components/FileUpload';
import FormApiTypes from "../../types/FormApiTypes";

const SwitchRightModule = ({right_module, sector, document_id, actions, fields, formstate, setFormstate}) => {
  switch (right_module) {
    case "debug": return <Debug actions={actions} formstate={formstate} sector={sector} fields={fields} />
    case "help": return <HelpComp />
    case "fileupload": return <FileUpload formstate={formstate} setFormstate={setFormstate} sector={sector} />
    default:
      break;
  }
}

// function FormApiTypes (sector, user) {
//   if(!sector) return null;
//   if(!sector.apis.find(a => a.type === "create_one")) return null;
//   return replace_string(sector.apis.find(a => a.type === "create_one").path, {
//     sector: sector,
//     sectorname: sector.name,
//     domain: config["mode"] === "dev" ? config["dev-domain"] : config["prod-domain"],
//     apidomain: config["mode"] === "dev" ? config["dev-domain-api"] : config["prod-domain-api"],
//     config: config,
//     user: user
//   })
// }


export default function Form({ sector, reload }) {
  const { state } = useMain();
  const { search } = useLocation();
  const [formstate, setFormstate] = useState(() => new Object());
  const [form_alerts, setForm_Alerts] = useState(() => new Array());
  const [active_relative, setActive_Relative] = useState("none");
  const [actions, setActions] = useState(pr => {
    const defaultactions = [
      {
        label: "Submit", action: "primary-submit", when: "form",
        script: null, script_onresponse: '.', classname: "w-350", onresponse: "",
        method: "POST", url: FormApiTypes.ApiTypes.CREATE_ONE(sector, { user: state.user }) + "?form=form"
      }
    ]
    if(sector.actions instanceof Array === false) return defaultactions;
    const filtered_actions = sector.actions.filter(f => ["form", "always"].some(s => s === f["when"]));
    return filtered_actions.map(i => {
      return {...i, url: replace_string(i.url, { user: state.user, state, sector: sector, sectorname: sector.name }) }
    });
  });
  const [formrenderstates, setFormrenderstates] = useState(pr => {
    const render_states = [];
    if(sector.renderstates instanceof Array !== true) return [];
    sector.renderstates.map(r => {
      if(r.type !== "form") return;
      if(r.group === "*") return render_states.push(r);
      if(!state.user) return;
      if(state.user.groups instanceof Array !== true) return;
      if(state.user.groups.some(s => s.id === r.group)) render_states.push(r);
    })
    return render_states;
  })
  const [formrenderstate, setFormrenderstate] = useState("form");
  const [right_module, setRight_module] = useState("none");
  const [title, setTitle] = useState(sector.label || "New Form");
  const [fields, setFields] = useState()
  const [debug, setDebug] = useState(false);

  const formtype = useMemo(() => "form", []);
  
  const navigate = useNavigate()

  useEffect(() => { if(formrenderstates[0]) { setFormrenderstate(formrenderstates[0].value) } }, [sector])

  useEffect(() => {
    if(!sector) return;
    setForm_Alerts(sector.alerts);
    setFields(sector.fields)
    const obj = new URLSearchParams(search);
    const tmp_obj = {};
    obj.forEach((value, key) => {
      tmp_obj[key] = value;
    })
    console.log(tmp_obj, "initial formstate from query params")
    setFormstate({...tmp_obj});
    const curr = sector.client_scripts.filter(f => f.type === "form_onload");
    curr.map(i => { try{ eval(i.script) }catch(err){console.log(err)} })
    
  }, [sector])

  useEffect (() => {
    if(!sector) return;
    const obj = new URLSearchParams(search);
    const tmp_obj = {};
    obj.forEach((value, key) => {
      tmp_obj[key] = value;
    })
    setFormstate(pr => { return { ...pr, ...tmp_obj } })
  }, [search])


  const request_callback = function ({ status, error, response, data, content_type }) {
    const { method, url, onresponse } = this;
    console.log("REQUEST CALLBACK ACTIVATED \n")
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
            severity: "danger", type: "form",
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
            severity: "danger", type: "form",
            title: `Error Response STATUS =  ${status}`,
            message: `[ERROR]::${JSON.stringify(error)}`,
            visibility: "both",
          },
        ];
      });
    }

    if (onresponse && onresponse.length > 3) {
      console.log("THERE IS ONRESPONSE SCRIPT")
      try{ eval(onresponse) } catch(err) { console.log(err); }
    }else {
      if(status === 200 || status === 201) {
        return setForm_Alerts((pr) => {
          return [
            ...pr,
            {
              severity: "success", type: "form",
              title: `OK ${status}`, as: data.debug ? "debug" : null, 
              message: data?.data ? JSON.stringify(data?.data) : "Request completed successfully.",
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
              severity: "danger", type: "form",
              title: `Error Response ${status}`,
              visibility: "both", as: data.debug ? "debug" : null,
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
              severity: "danger", type: "form",
              title: `Error Response ${status}`, as: data.debug ? "debug" : null,
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
      await Request[usablemethod](url,{ formstate, formrenderstate }, request_callback.bind({
        usablemethod, url, onresponse
      }));
    }
  }

  return (
    <div className="w-100" style={{position: "relative"}}>
      <FormSimpleActionSection 
        form_ui={sector.form_ui} sector={sector} reload={reload} actions={actions} 
        formrenderstate={formrenderstate} formrenderstates={formrenderstates} setFormrenderstate={setFormrenderstate}
        title={title} handleSubmit={handleSubmit} setRight_module={setRight_module} 
      />
      <div className="w-100 d-flex j-cont-between">
        <GenericForm 
          inputs={fields}
          formtype={"form"}
          formrenderstate={formrenderstate}
          setFormrenderstate={setFormrenderstate}
          formstate={formstate}
          width={right_module === "none" ? "100%" : "56%"}
          form_alerts={form_alerts.filter(f => f.type === "form")}
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
                document_id={null} 
                actions={actions}
                formstate={formstate}
                fields={fields}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}
