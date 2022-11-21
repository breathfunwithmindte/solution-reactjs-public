import React, { useMemo, useState } from 'react';
import Alert from "react-bootstrap/Alert"

function HelpComp({ form_ui_info }) {

  return (
    <div className="w-100" style={{position: "relative", height: "75vh", minHeight: 256, overflowY: "auto"}}>
      <Alert>
        <Alert.Heading severity="info" >
          HELP
        </Alert.Heading>
        In some cases the document can require a delete approvement to complete the delete action.
      </Alert>
      <pre>
        Some more text goest here;
      </pre>
    </div>
  );
}

export default HelpComp;