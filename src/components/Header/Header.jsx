import React, { useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import useMain from '../../bssl/Context';
import Request from '../../bssl/Request';

const Header = () => {
  const {state, setState} = useMain();
  const [impersonate_model, setImpersonate_model] = useState(false);
  const [notification_open, setNotification_open] = useState(false);
  const [impersonate_user, setImpersonate_user] = useState("");

  const impersonate_info = useMemo(() => {
    try {
      const storage = localStorage.getItem("authentication");
      // ({impersonating: null, master_token: data.data.token, users: []})
      if(!storage) return { impersonating: false, users: [] };
      const storage_data = JSON.parse(storage);
      if(storage_data.impersonating) return { impersonating: true, users: storage_data.users || [] };
      return { impersonating: false, users: storage_data.users || [] };
    } catch (err) {
      return { impersonating: false, users: [] };
    }
  }, [])

  return (
    <header className="d-flex al-items-center j-cont-between px1 " 
    style={{ fontFamily: "monospace", cursor: "pointer", border: "34px solid var(pr1)", color: "#FFF", zIndex: 100, background: "var(--nav_bg0)"}}>
      <h1 style={{letterSpacing: ".69rem"}} onClick={() => {
        window.location.href = "/"
      }}>S<span style={{color: "var(--pr)"}}>O</span>L<span style={{
        fontFamily: "serif", letterSpacing: "-2px", fontSize: "1rem", verticalAlign: "bottom",
        fontWeight: 100, fontStyle: "italic"
        }}>&lt; perfect-evoluton /&gt;</span></h1>
      <section className="d-flex al-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="default" className="text-white" id="dropdown-basic">
              {state?.user?.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                impersonate_info.impersonating ? 
                <Dropdown.Item onClick={_=> {
                  localStorage.setItem("authentication", JSON.stringify({...JSON.parse(localStorage.getItem("authentication")), impersonating: null}))
                }}><span style={{color: "red"}}>end impersonating</span></Dropdown.Item>
                :
                <Dropdown.Item onClick={_=>setImpersonate_model(true)}>Impersonate</Dropdown.Item>
              }
              <Dropdown.Item onClick={_=> {localStorage.removeItem("authentication"); window.location.reload(false)}}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button 
            className="d-flex justify-content-center align-items-center text-white" 
            aria-label="header-add-more" variant="default" 
            style={{position: "relative"}}
            onClick={() => {
              setState(pr => {return {...pr, unread_notifications: 0}})
              setNotification_open(pr => !pr)
            }}
          >
            <span className="material-icons">notifications</span>
            {state.unread_notifications > 0 && (
              <span 
              className="d-flex al-items-center j-cont-center" 
              style={{color: "red", position: "absolute", top: -1.4, right: 0, borderRadius: "100%", background: "red", color: "#FFF", width: 20, height: 20, fontSize: "0.75rem"}}>23</span>
            )}
          </Button>
          {notification_open && (
          <div className="sol-opened-menu-header py0 px1 pb0 d-flex al-items-center j-cont-between f-column">
              <strong>Notification</strong>
              <hr />
              <div className="notification-wrapper">
                {state.notifications && state.notifications.map((n, i) => {
                  return (
                    <div key={i} className="d-flex al-items-center j-cont-between p1" style={{border: "1px solid var(--h)", borderRadius: "6.9px", marginBottom: "1.4px"}}>
                      <img className="avatar-img" src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" width="23px" height="23px" />
                      <p style={{width: "calc(100% - 34px)", wordBreak: "break-all"}} className="m1">{n.notification || "Message not found"}</p>
                    </div>
                  )
                })}
              </div>
          </div>
          )}

          <Button 
            className="d-flex justify-content-center align-items-center text-white" 
            aria-label="header-add-more" variant="default" 
            onClick={() =>{alert("Message and group chatroom are not enabled for current platform.")}}
          >
            <span className="material-icons">mail</span>
          </Button>
          <Button 
            className="d-flex justify-content-center align-items-center text-white" 
            aria-label="header-add-more" variant="default" 
            onClick={() =>{}}
          >
            <span className="material-icons">settings</span>
          </Button>
      </section>
      <Modal show={impersonate_model} onHide={pr => setImpersonate_model(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Impersonate User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control value={impersonate_user} placeholder="username" onChange={e => setImpersonate_user(e.target.value)} />
            <hr />
            <strong>Recent:</strong>
            <ul>
            {
              impersonate_info.users && impersonate_info.users.map((u, i) => {
                return (
                  <li  key={i}>
                    <Button variant="link" onClick={e => setImpersonate_user(u)}>{u}</Button>
                  </li>
                )
              }) 
            }
            </ul>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={pr => setImpersonate_model(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={async pr => {
            await Request.post("/api/v1/user/impersonate", { username: impersonate_user }, ({ status, data }) => {
              if(status !== 200) {
                alert("Something went wrong || " + status)
              } else {
                alert("ok" + JSON.stringify(data))
                const storage = localStorage.getItem("authentication");
                if(!storage) return alert("bug");
                const storage_data = JSON.parse(storage);
                let users;
                if(storage_data.users.some(s => s === impersonate_user)) {
                  users = storage_data.users;
                }else {
                  users = storage_data.users;
                  users.push(impersonate_user)
                }
                localStorage.setItem("authentication", JSON.stringify({ ...storage_data, impersonating: data.data.token, users: users || [] }))
                window.location.reload(false);
              }
            })
          }}>
            Try Impersonate
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;