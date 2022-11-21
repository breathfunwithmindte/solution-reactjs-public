import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router';
import useMain from '../../bssl/Context';

const Navigation = ({ routes, id, HeaderComponent, HeaderClassname }) => {
  const navigate = useNavigate()
  const [current_option, setCurrent_option] = useState("navigations");
  const [search, setSearch] = useState("");
  // const {  } = useMain();
  
  return (
    <div style={{width: "calc(256px + 2.3vw)", minHeight: "calc(100vh - 69px)", background: "var(--nav_bg0)", overflowY: "auto", color: "#FFFFFF", resize: "horizontal"}}>
      <div className="d-flex justify-content-center align-items-center w-100 p1">
        <input placeholder="search..." style={{
          padding: "0.54rem 0.97rem", color: "#FFFFFF", width: "92%", background: "rgba(255,255,255,0.034)", 
          borderRadius: "14px", border: "0.14px solid rgba(255, 255, 255, 0.069)", outline: "none"
        }} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 p1 " style={{background: "rgba(255,255,255,0.034)"}}>
          <Button 
            className="d-flex justify-content-center align-items-center text-white" 
            aria-label="header-add-more" variant="default" 
            onClick={() =>{setCurrent_option("navigations")}}
          >
            <span className="material-icons">menu</span>
          </Button>
          <Button 
            className="d-flex justify-content-center align-items-center text-white" 
            aria-label="header-add-more" variant="default" 
            onClick={() =>{setCurrent_option("favorite")}}
          >
            <span className="material-icons">favorite</span>
          </Button>
          <Button 
            className="d-flex justify-content-center align-items-center text-white" 
            aria-label="header-add-more" variant="default" 
            onClick={() =>{setCurrent_option("history")}}
          >
            <span className="material-icons">history</span>
          </Button>
      </div>
      {
        current_option === "navigations" && (
          <Accordion defaultActiveKey="0" style={{width: "100%", paddingBottom: 256, minHeight: 200, height: "calc(100% - 128px)", overflowY: "auto"}} >
          {
            routes.filter(f => {
              if(search === "") return true; 
              if(f.name.toLowerCase().search(search.toLowerCase()) !== -1) return true;
              if(f.category.toLowerCase().search(search.toLowerCase()) !== -1) return true;
              if(f.label.toLowerCase().search(search.toLowerCase()) !== -1) return true;
              return false
            }).map((route, index) => {
              if(route.routes instanceof Array === true) {
                return (<Accordion.Item key={index} eventKey={index} style={{background: "var(--nav_bg0)"}} >
                  <Accordion.Header >{route.label}</Accordion.Header>
                  <Accordion.Body style={{background: "rgba(0,0,0,0.14)", color: "lightblue", padding: "0px"}}>
                    {route.routes.map((inr, ind) => {
                      return (
                        <div key={ind} className="nav-elm-now-perfectevolution d-flex f-column" onClick={() => navigate(inr.path)}>
                          <strong  style={{width: "100%", cursor: "pointer"}}>
                            {inr.text}
                          </strong>
                        </div>
                      )
                    })}
                  </Accordion.Body>
                </Accordion.Item>)
              } else {
                return (
                  <div>not implemented</div>
                )
              }
            })
          } 
          </Accordion>
        )
      }
      {
        current_option === "history" && (
          <div className="p0" style={{width: "100%", minHeight: 200, height: "calc(100% - 128px)", overflowY: "auto"}}>
              <h2>History</h2>
              <em className="muted">Items not found.</em>
          </div>
        )
      }
      {
        current_option === "favorite" && (
          <div className="p0" style={{width: "100%", minHeight: 200, height: "calc(100% - 128px)", overflowY: "auto"}}>
              <h2>Favorite</h2>
              <em className="muted">Items not found.</em>
          </div>
        )
      }

    </div>
  );
};

export default Navigation;