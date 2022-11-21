import React, { useState } from 'react';
import useMain from '../../bssl/Context';
import Button from "react-bootstrap/Button";
import Sol_areachart from "./charts/Sol_areachart";
import Sol_barchart from "./charts/Sol_barchart";
import Sol_cardchart from "./charts/Sol_cardchart";
import Sol_content from "./charts/Sol_content";
import Sol_linechart from "./charts/Sol_linechart";
import Sol_piechart from "./charts/Sol_piechart";
import Sol_scatterchart from "./charts/Sol_scatterchart";

function SectorCart({ chart_schema, actions, chart_data, reload, sector }) {
  const [cart_state, setCart_state] = useState(chart_data || []);
  const {state} = useMain();

  return (
    <div className="w-100 pb0 d-flex f-wrap j-cont-between"
    style={{
      position: "relative",
      height: "fit-content",
      marginBottom: 256,
    }}>
      <section className="px0 py1 w-100 bg0 d-flex j-cont-between al-items-center"
        style={{borderBottom: "1px solid var(--h)", position: "sticky", top: 0, zIndex: 14}}
      >
        <h3 className="m2">Dashboard {sector?.label}<br />Hello, {state.user.username}</h3>
        <Button
          className="d-flex justify-content-center align-items-center mr1"
          variant="default"
          onClick={() => reload()}
        >
          <span className="material-icons">replay</span>
        </Button>
      </section>
      <div className="w-100 d-flex f-wrap al-items-center j-cont-between">
      {/* {JSON.stringify(chart_schema)} */}
      {chart_schema.map((chart, index) => {
        switch (chart.type) {
          case "linechart":
            return (
              <Sol_linechart
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            );
          case "barchart":
            return (
              <Sol_barchart
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            );
          case "areachart":
            return (
              <Sol_areachart
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            );
          case "scatterchart":
            return (
              <Sol_scatterchart
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            );
          case "piechart":
            return (
              <Sol_piechart
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            )
          case "cardchart":
            return (
              <Sol_cardchart
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            )
          case "contentchart":
            return (
              <Sol_content
                key={index}
                state={cart_state}
                chartprops={chart}
              />
            )
          default:
            break;
        }
      })}
      </div>
    </div>
  );
}

export default SectorCart;


/**
 * loop 
 */


