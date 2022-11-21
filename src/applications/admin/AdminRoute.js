import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
// import Table_ReadRecord from "./pages/Table_ReadRecord";
// import Table_AddRecord from "./pages/Table_AddRecord";
import Navigation from "../../components/Navigation/Navigation";
import useMain from "../../bssl/Context";
import AdminForm from "./pages/AdminForm";
import AdminReader from "./pages/AdminReader";
import AdminUpdateForm from "./pages/AdminUpdateForm";
import AdminChart from "./pages/AdminChart";

export default function AdminRoute() {
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
                    path: `/admin/sector/${sector.name.toLowerCase()}/${p.page}${p.query ? `?${p.query}` : ""}`
                  }
                })
              }
          })}
        />
        <div className="bg1" style={{width: "calc(100vw - 300px)", height: "calc(100vh - 70px)", overflow: "auto"}}>
          <Routes>
            <Route  path={`/:sectorname/reader`} element={<AdminReader />} />
            <Route  path={`/:sectorname/update/:document_id`} element={<AdminUpdateForm />} />
            <Route  path={`/:sectorname/form`} element={<AdminForm />} />
            <Route  path={`/:sectorname/chart`} element={<AdminChart />} />
            <Route path={"/*"} element={<div>Page not found || 404</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
