import React, { useMemo } from "react";
import replace_string from "../../../bssl/replace_string"

const Sol_cardchart = ({ state, chartprops }) => {

  return (
    <div
      className="p0 my0 d-flex al-items-center j-cont-between f-wrap"
      style={{ height: "fit-content", width: chartprops.width, maxWidth: "97%", minWidth: 129 }}
    >
        {chartprops.items.map((item, index) => {
          // icon description, name, datastr, color
          return (
            <div className="bg0 p0 m1 d-flex al-items-center j-cont-between chartcard" key={index}
              style={{borderRadius: "14px", boxShadow: "0px 1.4px 6.9px 0.14px var(--h)"}}>
                <span style={{ color: item.color || "red", fontSize: "2.5rem" }} className="material-icons">{item.icon}</span>
                <div style={{width: "84%"}} className="d-flex f-column p1">
                  <h2 style={{ color: item.color }}>{replace_string(item.datastr, { ...state[chartprops.data_properties[0]] })}</h2>
                  <em className="muted">{item.description}</em>
                </div>
            </div>
          );
        })}
    </div>
  );
};

export default Sol_cardchart;
