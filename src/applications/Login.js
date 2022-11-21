import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import config from "../bssl/config.json";

function Login(props) {
  const [loginstate, setloginstate] = useState({ login_value: "", password: "" });

  const handleChange = (e) => {
    setloginstate(pr => { return {...pr,  [e.target.name]: e.target.value } })
  }

  useEffect(() => {
    const storage = localStorage.getItem("authentication");
    // ({impersonating: null, master_token: data.data.token, users: []})
    if(!storage) return;
    const storage_data = JSON.parse(storage);
    if(storage_data.impersonating) {
      localStorage.setItem("authentication", JSON.stringify({ ...storage_data, impersonating: null }));
    }
  }, [])

  const handleSubmit = async () => {
    try {
      console.log(loginstate)
      fetch((config.mode === "dev" ? config["dev-domain"] : config["prod-domain"]) + "/api/v1/auth/login", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(loginstate)
      }).then(async e => {
        const data = await e.json();
        if(e.status === 201) {
          localStorage.setItem(
            "authentication",
            JSON.stringify({impersonating: null, master_token: data.data.token, users: []})
          )
          window.location.reload(false);
        }else{
          alert("Not authenticated | 401")
        }
      })

    }catch(err) {
      alert("Something went wrong");
    }
  }


  return (
    <div className="w-100 d-flex al-items-center j-cont-center" style={{ height: "100vh", overflowY: "auto" }}>
      <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
        <img src="https://www.infrajournal.com/documents/408572/527677/GettyImages-154050297.jpg" 
        style={{width: "100%", heigth: "100%", minHeight: "100%"}} 
        />
      </div>
      <div style={{position: "relative", zIndex: 3, padding: "3.4vw", background: "rgba(255, 255, 255, 0.35)"}}> 
        <Form style={{width: "calc(256px + 6.9vw)"}}>
          <h1>Solution Platform Series</h1>
          <strong>IT SERVICE MANAGEMENT - Best practises</strong>
          <Form.Control className="my0" placeholder="Email or Username" name="login_value" onChange={handleChange} />
          <Form.Control className="my0" placeholder="password" type="password" name="password" onChange={handleChange}  />
          <Button onClick={handleSubmit}>Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;