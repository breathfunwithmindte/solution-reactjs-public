import React, { useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';

function DeleteDoc({document_id}) {
  const [deletestate, setDeletestate] = useState("")
  return (
    <div  className="w-100 py0" style={{position: "relative", height: "75vh", minHeight: 350}}>
      <Alert>
        <Alert.Heading severity="info" >
          Delete Document
        </Alert.Heading>
        In some cases the document can require a delete approvement to complete the delete action.
      </Alert>
      <div className="p0">
      <Form.Control placeholder="type 'delete' to complete the task" onChange={e => setDeletestate(e.target.value)} />
      <Button className="my0 w-250" disabled={deletestate !== "delete"} variant="danger">
        Delete
      </Button>
      </div>
    </div>
  );
}

export default DeleteDoc;