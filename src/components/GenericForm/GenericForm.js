import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import MapInputs from './MapInputs';
import check_condition from "../../bssl/check_condition"
import Request from '../../bssl/Request';
import { Alert } from 'react-bootstrap';
import SolAlert from '../Alert/SolAlert';

export default function GenericForm({ 
  formname="default", // string? 
  initialState, // *
  inputs=[], // []
  formstate,
  formrenderstate,
  setFormrenderstate,
  document,
  formtype,
  setFormstate,
  form_alerts,
  width="100%",
  setForm_Alerts,
  handleSubmit,
  initialAlerts=[], // [title, message] 
  title="New Record", // string? 
  onsuccess=()=>{},
  actions=[], // []
  onload_script="none", // string --javascript 
}) {



  const onchange_basic = function (type, name, value) { 
    if(!name) return;
    if(name.split(".").length > 1) {
      const [prefix, fieldname] = name.split(".");
      setFormstate(pr => {
        let current_formstate = {...pr};
        if(!current_formstate[prefix]) { current_formstate[prefix] = new Object() }
        current_formstate[prefix][fieldname] = value;
        return current_formstate;
      })
    } else {
      setFormstate(pr => {return {...pr, [name]: value }})
    } 
  };

  const onchange_array = function (e) {
   
  }

  return (
    <Form style={{maxWidth: "4250px", width: width}}>
      <div className="p0" >
      {form_alerts.filter(f =>  (f.visibility === "top" || f.visibility === "both")).map((a, i) => {
        return (
         <SolAlert key={i} index={i} alert={a} setAlerts={setForm_Alerts} />
        )
      })}
      </div>
      <MapInputs 
        formInputs={inputs} 
        formtype={formtype}
        onchange_basic={onchange_basic} 
        formrenderstate={formrenderstate}
        setFormrenderstate={setFormrenderstate}
        onchange_array={()=>{}} 
        formstate={formstate} 
        setFormstate={setFormstate}  />
      <div className="d-flex f-wrap p0 w-100">
        {actions.map((action, index) => {
          let load = true;
          if(action.script) {
            try{ eval(action.script)  }catch(err){console.log(err)}
          }
          if(load) {
            return (
              <Button 
                key={index}
                style={{marginRight: 14}}
                type="button"
                onClick={handleSubmit.bind({ 
                  method: action.method, 
                  url: action.url,
                  onresponse: action.script_onresponse
                })}
                disabled={action.disabled === true ? true : (action.url ? false : true)}
                className={action.classname || ""}
                variant={action.variant || "primary"}
              >
                  {action.label || "SUBMIT"}
              </Button>
            ) 
          }
        })}
       
      </div>
      <div className="p0" >
      {form_alerts.filter(f => f.visibility === "bottom" || f.visibility === "both").map((a, i) => {
        return (
          <Alert key={i} variant={a.severity} dismissible onClose={() => {
            setForm_Alerts(pr => {return pr.filter((f, ii) => ii !== i)})
          }} >
            <Alert.Heading>{a.title}</Alert.Heading>
            {a.link && (
              <Alert.Link href={a.link || "#"}>{a.link_message}<br /></Alert.Link>
            )}
            {a.message && a.message.split("|next|").map((am, aind) => <p style={{padding: 0, margin: 0}} key={aind}>{am}</p>)}
          </Alert>
        )
      })}
      </div>
    </Form>
  )
}
