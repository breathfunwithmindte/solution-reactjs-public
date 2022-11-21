import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import useMain from "../../bssl/Context";
import useFetch from "../../bssl/useFetch";
import config from "../../bssl/config.json";

import replace_string from "../../bssl/replace_string";
import GenericReaderSimple from "../../components/GenericTable/GenericReaderSimple";
import FormApiTypes from "../../types/FormApiTypes";

function get_query_url (query, sector, user, reference, document) {
  if(!sector) return null;
  return replace_string(query, {
    sector: sector,
    sectorname: sector.name,
    reference: reference,
    document: document,
    document_id: document?._id,
    domain: config["mode"] === "dev" ? config["dev-domain"] : config["prod-domain"],
    apidomain: config["mode"] === "dev" ? config["dev-domain-api"] : config["prod-domain-api"],
    config: config,
    user: user
  })
}

export default function NonpageReader ({ 
  sectorname, query, height, onclick, clickable, reference, document, onnavigate,
  new_btn, used_as = "ref"
}) {
  const { state, setState } = useMain();

  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/sector/${sectorname}/getinfo-${used_as}`);

  const read_path = useMemo(() => {
    if(error) return;
    if(!res) return;
    if(!res.data) return;
    let used_data  = { user: state.user };
    if(document) { used_data["document"] = document; used_data["document_id"] = document._id }
    return FormApiTypes.ApiTypes.READ_MANY(res.data, used_data);
  }, [res])

  if(loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(error) return (
    <div>table not found error {JSON.stringify(error)}</div>
  )
  return (<GenericReaderSimple 
            new_btn={new_btn}
            sector={res.data} 
            onnavigate={onnavigate}
            used_as={used_as}
            fetch_path={
              read_path + "?" + 
              (query ? (get_query_url(query, res.data, state.user, reference, document) + "&") : "")
            } 
            height={height} 
            onclick={onclick} 
            clickable={clickable} 
          />)
}
