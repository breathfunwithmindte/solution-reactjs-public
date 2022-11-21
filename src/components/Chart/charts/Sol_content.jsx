import React, { useMemo } from "react";
import replace_string from "../../../bssl/replace_string"

const Sol_content = ({ state, chartprops }) => {


  return (
    <div
      className="p0 my0 d-flex al-items-center j-cont-between f-wrap"
      style={{ height: chartprops.height || "fit-content", width: chartprops.width, maxWidth: "97%", minWidth: 129 }}
    >
        {chartprops.items.map((item, index) => {
          if(item.type === "img") return (
            <img src={item.content} style={{width: "100%", height: "auto", maxHeight: "69vh"}} />
          )
          if(item.type === "title") return (
            <div className="w-100">
              <h1>{replace_string(item.content, state)}</h1>
              <hr />
            </div>
          )
          if(item.type === "title-text") return (
            <div className="w-100">
              <h3>{replace_string(item.name, state)}</h3>
              <pre>{item.content}</pre>
            </div>
          )
          return (
            <p className="w-100">{replace_string(item.content, state)}</p>
          )
        })}
    </div>
  );
};

export default Sol_content;
