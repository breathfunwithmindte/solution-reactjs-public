import React from 'react';
import Alert from "react-bootstrap/Alert"
import CodeEditor from '../CodeEditor';

function SolAlert({ alert, setAlerts, index }) {

  if(alert.as === "debug") {
    return (
      <div>
        <Alert variant="warning" dismissible onClose={() => {
          setAlerts(pr => {return pr.filter((f, ii) => ii !== index)})
        }}>
          <Alert.Heading>[DEBUG ALERT MESSAGE]</Alert.Heading>
        </Alert>
        <CodeEditor 
            language={"json"} height={alert.message && alert.message.length > 1400 ? "625px" : "256px"} readonly={true}
            value={alert.message && alert.message.toString()}
        />
      </div>
    )
  }
  return (
    <div>
       <Alert variant={alert.severity} dismissible onClose={() => {
          setAlerts(pr => {return pr.filter((f, ii) => ii !== index)})
        }} >
        <Alert.Heading>{alert.title}</Alert.Heading>
        {alert.link && (
          <Alert.Link href={alert.link || "#"}>{alert.link_message}<br /></Alert.Link>
        )}
        {alert.message && alert.message.split("|next|").map((am, aind) => <p style={{padding: 0, margin: 0}} key={aind}>{am}</p>)}
      </Alert>
    </div>
  );
}

export default SolAlert;