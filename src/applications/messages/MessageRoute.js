import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import useMain from "../../bssl/Context";

export default function MessageRoute() {
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
            <Route  path={`/:message_id`} element={<div>
                <h1>actions</h1>
                <h2>title</h2>
                <strong>from mikekarypidis23@gmail.com</strong>
                <div dangerouslySetInnerHTML={{ __html: `<div class="p0"><h1>hello world ${state.user.username} </h1></div>` }} />

            </div>} />
            <Route path={"/*"} element={<div>Message not found || 404</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
