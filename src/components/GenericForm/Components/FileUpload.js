import React, { useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import config from "../../../bssl/config.json"
import {nanoid, customAlphabet} from "nanoid";

function FileUpload({ formstate, setFormstate, sector }) {
  const [deletestate, setDeletestate] = useState("");
  const [files, setFiles] = useState([]);


  return (
    <div  className="w-100 py0" style={{position: "relative", height: "75vh", minHeight: 350}}>
      <Alert>
        <Alert.Heading severity="info" >
          Upload Files
        </Alert.Heading>
        Upload files here before submit the form.
      </Alert>
      <div className="p0">
      <Form.Control type="file" multiple onChange={(e) => {
        const tmparr = []
        for (const key in e.target.files) {
          if (Object.hasOwnProperty.call(e.target.files, key)) {
            tmparr.push(e.target.files[key]);
          }
        }
        setFiles(tmparr)
      }} />
      
      <Button className="my0 w-250" variant="primary" onClick={async (e) => {
        try {
          const formdata = new FormData();
          files.map(i => {
            const randomnumbers = customAlphabet("0123456789qwertyuiioplkjhasdfzxcvbnm")
            formdata.append(i.name.split(" ")[0].toLowerCase() + "_" + randomnumbers(14), i)
          })
          const res = await fetch(config["dev-domain"] + `/api/v1/sector/${sector.name}/file-upload`, {
            method: "post", headers: {

            }, body: formdata
          })
          if(res.status === 200) {
            console.log(res);
          } else {
            alert("Something went wrong " + res.status)
          }
        } catch(err) {
          alert("Something went wrong " + err.toString())
        }
      }}>
        Upload
      </Button>
      </div>
    </div>
  );
}

export default FileUpload;