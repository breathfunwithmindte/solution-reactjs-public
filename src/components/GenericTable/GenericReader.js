import React, { useEffect, useMemo, useRef, useState } from 'react';
import useFetch from '../../bssl/useFetch';
import replace_string from "../../bssl/replace_string";
import GenericForm from "../../components/GenericForm/GenericForm";
import config from "../../bssl/config.json";
import GenericTable from "../../components/GenericTable/GenericTable";
import Button from "react-bootstrap/Button";
import CodeEditor from "../../components/CodeEditor";
import { Form } from "react-bootstrap";
import object_to_xml from "../../bssl/object_to_xml";
import o2x from 'object-to-xml';
import SolAlert from '../Alert/SolAlert';
import { useLocation, useNavigate } from 'react-router';
import TableActionSection from './components/TableActionSection';

const CurrentRender = ({ sector, rows, res, view, total, filters, setFilters, tablerenderstate, columns }) => {
  if(view === "JSON") {
    return (<div className="p0 mb0">
      <CodeEditor value={JSON.stringify(res, null, 3)} />
    </div>)
  }else if (view === "XML") {
      return (<div className="p0 mb0">
      <CodeEditor value={o2x(res)} language="xml" />
    </div>)
  }else if (view === "TABLE" || view==="default") {
    return <GenericTable filters={filters} setFilters={setFilters} tablename="sol-table" 
      total={total} columns={columns.map(i => {
      return { 
        ...i, type: i.table_type, label: i.label ? i.label : i.placeholder
      }
    })} rows={rows || []} sector={sector} />
  } else {
    return <p>reader exist {JSON.stringify(sector)}</p>
  }
}

function filters_to_query_string (filters) {
  let query_string = "";
  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key)) {
      if(!filters[key]) continue;
      query_string = query_string + "&" + key + "=" + filters[key];
    }
  }
  return query_string
}


function GenericReader({ sector, fetch_path }) {
  const [view, setView] = useState(sector.default_view || "default");
  const [filters, setFilters] = useState({});
  const [alerts, setAlerts] = useState(sector.alerts || [])
  const [skip, setSkip] = useState(0);
  const [tablerenderstate, setTablerenderstate] = useState(sector.tablerenderstate || "reader");
  const [res, loading, error, refetch, setRes] = useFetch(fetch_path + `limit=50&skip=${skip}${filters_to_query_string({  })}`);
  const [columns, setColumns] = useState(() => {
    let tmparr = [];
    if(sector.fields instanceof Array === false) return [];
    sector.fields.map(i => {
      if(i.renderstates instanceof Array === false) return;
      if(i.renderstates.some(s => s === tablerenderstate)) {
        tmparr.push(i);
      }
    })
    return tmparr;
  })
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if(!sector) return;
    const obj = new URLSearchParams(search);
    if(obj.has("default_view")) {
      setView(obj.get("default_view"))
    }
  }, [sector])

  const filters_query_string = useMemo(() => {
    let query_string = "";
    for (const key in filters) {
      if (Object.hasOwnProperty.call(filters, key)) {
        if(!filters[key]) continue;
        query_string = query_string + "&" + key + "=" + filters[key];
      }
    }
    return query_string
  }, [filters])

  useEffect (() => {
    if(!res) return
    if(error) return
    if(!res.data) return
    if(res.data.alerts) setAlerts(res.data.alerts);
    let res_rows = res.data["documents"] || [];
    const curr = sector.client_scripts.filter(f => f.type === "table_onload");
    curr.map(i => { try{ eval(i.script) }catch(err){console.log(err)} })
    setRows(res_rows)
  }, [res])

  const paginations = useMemo(() => {
    if(!res) return []
    if(error) return [];
    if(!res.data) return [];
    if(!res.data.total) return [];
    const pages_length_pre = res.data.total / 50;
    const paginations_tmp = [];
    if(res.data.block_pagination) return paginations_tmp;
    for (let i = 1; i < (Number(pages_length_pre.toFixed(0)) + 2); i++) {
      paginations_tmp.push({
        page: i,
        is_current: (i - 1) === skip
      })
    }
    return paginations_tmp
  }, [res])


  return (
    <div>
      <TableActionSection 
        loading={loading}
        setSkip={setSkip}
        paginations={paginations}
        sector={sector}
        title={sector.label}
        tablerenderstate={tablerenderstate}
        reload={() => { refetch(fetch_path + `limit=50&skip=${skip}${filters_query_string}`) }}
      />
      {alerts.filter(f => f.type === "reader").map((a, i) => {
        return (
         <SolAlert key={i} index={i} alert={a} setAlerts={setAlerts} />
        )
      })}
       {error ? (
        <pre style={{background: "var(--h)", padding: "1.4rem"}}>{JSON.stringify(error, null, 2)}</pre>
      ) : ( 
        <CurrentRender 
          sector={sector} 
          filters={filters} setFilters={setFilters}
          alerts={alerts}
          options={res && res.data ? res.data["options"] : {  }}
          rows={rows} 
          columns={columns}
          total={res && res.data ? res.data.total : 0} res={res} 
          tablerenderstate={tablerenderstate}
          view={view} 
        />
      )}
    </div>
  );
}

export default GenericReader;