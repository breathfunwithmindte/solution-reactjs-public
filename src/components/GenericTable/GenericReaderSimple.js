import React, { useState, useMemo, useEffect } from 'react';
import useFetch from '../../bssl/useFetch';
import replace_string from "../../bssl/replace_string";
import GenericForm from "../../components/GenericForm/GenericForm";
import config from "../../bssl/config.json";
import GenericTable from "../../components/GenericTable/GenericTable";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import NonpageForm from '../GenericForm/NonpageForm';
import { Modal } from 'react-bootstrap';
import TableActionSection from './components/TableActionSection';

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


function GenericReaderSimple({ sector, fetch_path, height, clickable, onclick, new_btn, onnavigate, used_as }) {
  const [filters, setFilters] = useState({});
  const [skip, setSkip] = useState(0);
  const [opennew, setOpennew] = useState(true);
  const [res, loading, error, refetch, setRes] = useFetch(fetch_path + `table=${used_as}&limit=50&skip=${skip}${filters_to_query_string({  })}`);
  const [tablerenderstate, setTableenderstate] = useState(sector.tablerenderstate || `${used_as}reader`);
  const navigate = useNavigate()
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

  useEffect (() => {
    if(!res) return
    if(error) return
    if(!res.data) return
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
       {error ? (
        <pre style={{background: "var(--h)", padding: "1.4rem"}}>{JSON.stringify(error, null, 2)}</pre>
      ) : (         
        <GenericTable 
          tablename="sol-table" total={res && res.data ? res.data.total : 0} 
          filters={filters} setFilters={setFilters}
          onnavigate={onnavigate}
          onclick={onclick} 
          clickable={clickable} 
          rows={rows} columns={columns.map(i => {
            return { 
              ...i, type: i.table_type, label: i.label ? i.label : i.placeholder
            }
          })}  height={height || "56vh"} />
      )}
    </div>
  );
}

export default GenericReaderSimple;