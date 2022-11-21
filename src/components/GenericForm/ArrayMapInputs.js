import React, { useEffect } from 'react';
import { nanoid } from "nanoid";
import Button from "react-bootstrap/Button";
import MapInputs from './MapInputs';

const ArrayMapInputs = ({ formInputs, current, onchange_basic, onchange_boolean, formstate, setFormstate, formrenderstate, setFormrenderstate, formtype }) => {

  const onchange_basic_array = function (type, name, value) {
    const [formstate_property, fieldname] = name.split("->");
    setFormstate(pr => {
      pr[formstate_property][this.input_key][fieldname] = value;
      return {...pr}
    })
  }

  if(formstate[current.name] instanceof Array === false) return (
    <div className="w-100 p1" style={{border: "1px solid var(--h)"}}>
      <section className="d-flex w-100 al-items-center j-cont-between">
        <strong>{current.label}</strong>
        <Button className="d-flex justify-content-center align-items-center p2"  aria-label="add-array-form-element" onClick={() => {
          setFormstate(pr => {
            pr[current.name] = new Array();
            pr[current.name].push({ id: nanoid(14) });
            return {...pr}
          })
        }}>
          <span className="material-icons">add</span>
        </Button>
      </section>
      <pre>Array is empty</pre>
      <hr />
      <em className="muted" style={{whiteSpace: "pre-wrap"}}>{current.description}</em>
    </div>
  )
  return (
    <div className="w-100 p0 my0 " style={{border: "1px solid var(--h)"}}>
      <section className="d-flex w-100 al-items-center j-cont-between">
        <span>{current.label}</span>
        <Button className="d-flex justify-content-center align-items-center p2" variant="default" aria-label="add-array-form-element" onClick={() => {
          setFormstate(pr => { 
            return {...pr, [current.name]: [...pr[current.name], {id: nanoid(23)}]}; 
          });
        }}>
          <span className="material-icons">add</span>
        </Button>
      </section>
      <hr />
      <div className="d-flex al-items-center f-column" style={{maxHeight: "46vh", overflowY: "auto", boxShadow: "inset 1px 1px 6.9px 0.14px var(--h)"}}>
          {formstate[current.name].length === 0 && (<pre>Array is empty</pre>)}
          {
            formstate[current.name].map((element, index) => {
              return (
                <div className="d-flex al-items-center j-cont-between" 
                style={{borderRadius: "6.9px", borderBottom: "1px dashed", width: "97%"}} key={index} 
                >
                  <MapInputs 
                    formrenderstate={formrenderstate}
                    setFormrenderstate={setFormrenderstate}
                    formtype={formtype}
                    formInputs={current.fields.map(i => {return {...i, ["wrapper_classname"]: current.wrapper_classname}})} 
                    onchange_basic={onchange_basic_array.bind({ input_key: index })} 
                    onchange_boolean={onchange_basic_array.bind({ input_key: index })}
                    formstate={formstate} 
                    setFormstate={setFormstate} 
                    input_key={index} 
                  />
                  <Button className="d-flex justify-content-center align-items-center p2" variant="default" aria-label="remove-array-form-element" onClick={() => {
                    //return alert(index);
                    setFormstate(pr => {
                      return {...pr, [current.name]: [...pr[current.name].filter((_, i) => i !== index)]}; 
                    })
                  }} >
                    <span className="material-icons">remove</span>
                  </Button>
                </div>
              )
            })
          } 
      </div>
      <hr />  
      <em className="muted" style={{whiteSpace: "pre-wrap"}}>{current.description}</em>
    </div>
  );
};

export default ArrayMapInputs;