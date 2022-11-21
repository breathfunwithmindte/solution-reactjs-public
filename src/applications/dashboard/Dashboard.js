import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import useMain from "../../bssl/Context";
import GenericChart from "../../components/Chart/GenericChart";

export default function Dashboard() {
  const { state } = useMain();

  return (
    <div className="Application">
      <Header />
      <div
        className="d-flex j-cont-between"
        style={{ height: "calc(100vh - 69px)", width: "100vw" }}
      >
        <Navigation
          routes={state.sectors.map((sector) => {
              return {
                icon: "send_icon",
                label: sector.label,
                name: sector.name,
                category: sector.category,
                routes: sector.navigations.map(p => {
                  return {
                    text: p.label,
                    path: `/admin/sector/${sector.name.toLowerCase()}/${
                      p.page === "reader" ? "reader" : "form"
                    }${p.query ? `?${p.query}` : ""}`
                  }
                })
              }
          })}
        />
        <div className="bg1" style={{width: "calc(100vw - 300px)", height: "calc(100vh - 70px)", overflow: "auto"}}>
          <Routes>
            <Route  path={`/:username/:chart`} element={<GenericChart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
