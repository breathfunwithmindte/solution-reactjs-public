import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import useMain from "../../../bssl/Context";
import useFetch from "../../../bssl/useFetch";
import config from "../../../bssl/config.json";
import FormApiTypes from "../../../types/FormApiTypes";

import GenericReader from "../../../components/GenericTable/GenericReader";
import replace_string from "../../../bssl/replace_string";
import Error from "./comps/Error";

function get_reader_url (sector, user) {
  if(!sector) return null;
  if(!sector.apis.find(a => a.type === "read_many")) return null;
  return replace_string(sector.apis.find(a => a.type === "read_many").path, {
    sector: sector,
    sectorname: sector.name,
    domain: config["mode"] === "dev" ? config["dev-domain"] : config["prod-domain"],
    apidomain: config["mode"] === "dev" ? config["dev-domain-api"] : config["prod-domain-api"],
    config: config,
    user: user
  })
}


export default function AdminReader() {
  const { sectorname } = useParams();
  const { state, setState } = useMain();
  const { search } = useLocation();
  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/sector/${sectorname}/getinfo-reader`);

  useEffect(() => {
    if(loading) return;
    if(!res) return;
    refech();
  }, [search])

  const read_path = useMemo(() => {
    if(error) return;
    if(!res) return;
    if(!res.data) return;
    const read_path = FormApiTypes.ApiTypes.READ_MANY(res.data, { user: state.user });
    const obj = new URLSearchParams(search);
    let search_obj = "?";
    obj.forEach((v, k) => {
      if(k === "default_view") return;
      search_obj = search_obj + `${k}=${v}&`;
    })
    return read_path + search_obj;
  }, [res])


  if(loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(error) return <Error error={error} />
  return (<GenericReader sector={res.data} fetch_path={read_path}  />)
}
