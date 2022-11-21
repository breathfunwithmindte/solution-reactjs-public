import React from 'react';
import Button from "react-bootstrap/Button"

function VersionManagement({ formstate }) {
  return (
    <div className="w-100 p0" style={{position: "relative", height: "75vh", minHeight: 300, overflow: "auto"}}>
      asdasd
      
      {
        formstate["updatedBy"] instanceof Array === true ? (
          <div>
            {formstate["updatedBy"].length === 0 && (
              <strong>There are 0 versions recorded.</strong>
            )}
            {formstate["updatedBy"].map((updated, index) => {
              return (
                <div className="w-100 d-flex f-column p0 mb0" style={{border: "1px solid var(--h)"}}>
                  <strong>Updated By<span style={{fontWeight: 300}}>{ updated.user }</span></strong>
                  <strong>When<span style={{fontWeight: 300}}>{ updated.timestamps }</span></strong>
                  <hr />
                  <strong>Previous</strong>
                  <pre>{updated.history_previous}</pre>
                  <strong>Changed To</strong>
                  <pre>{updated.history_after}</pre>
                  <Button disabled>Back to this version</Button>
                </div>
              )
            })}
          </div>
        ): (
          <h2>No versions are available</h2>
        )
      }
    </div>
  );
}

export default VersionManagement;