import React from 'react';
import useMain from '../bssl/Context';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';

function Homepage(props) {
  const { state } = useMain()


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
          <div className="d-flex al-items-center j-cont-center w-100" style={{position: "relative", height: "92vh"}}>
            <img src={"https://thumbs.dreamstime.com/b/consultant-presenting-tag-cloud-information-technology-224099191.jpg"} 
              style={{width: "100%", height: "100%", position: "absolute"}}
            />
            <div className="p0" style={{position: "relative", zIndex: 3, background: "var(--bg0)", borderRadius: "14px", boxShadow: "1px 1px 14px 0.14px var(--pr1)"}}>
              <h1>Solution Platform Series</h1>
              <strong>IT SERVICE MANAGEMENT - Best practises</strong>
              <p>For more options on homepage, contact us and we are creating the right homepage/dashboard for your company.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;


