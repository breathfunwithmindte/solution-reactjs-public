import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useMain from '../../../bssl/Context';
import UpdateForm from '../../../components/GenericForm/UpdateForm';
import useFetch from '../../../bssl/useFetch';
import config from "../../../bssl/config.json";
import replace_string from '../../../bssl/replace_string';
import Request from '../../../bssl/Request';
import FormApiTypes from '../../../types/FormApiTypes';
import Error from './comps/Error';


export default function AdminUpdateForm() {
  const { sectorname, document_id } = useParams();
  const { state, setState } = useMain();

  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/sector/${sectorname}/getinfo-formupdate`);
  const [doc_loading, setDoc_loading] = useState(true);
  const [response, setResponse] = useState(null);
  const [doc_error, setDoc_error] = useState(null);

  const do_default = (title, message) => {
    setDoc_error({ title: title, message: message });
    setDoc_loading(false);
  }

  useEffect(() => {
    if(!res) return;
    if(!res.data) return;
    const fetch_doc_path = FormApiTypes.ApiTypes.READ_BY_ID(res.data, { user: state.user, document_id });
    if(fetch_doc_path === -1) return do_default("Api not found || 404", "Api for current sector, to fetch document by id, not found.");
    (async () => {
      await Request.get(fetch_doc_path, ({status, error, response, data, content_type}) => {
        if(error) return do_default("Something went wrong", error.toString())
        if(status !== 200) return do_default("Error || " + status, data ? data.message : "Something went wrong");
        if(!data.data) return do_default("Error || " + status, data ? data.message : "Missing data");
        if(data.data.document === null || !data.data.document) return do_default("Not found || 404", "Document not found with this id.");

        setResponse(data.data);
        
        setDoc_loading(false);
      })
    })();
  }, [res])



  if(loading || doc_loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(doc_error) return (
    <div className="p0"><h1>{doc_error.title}</h1><pre>{doc_error.message}</pre></div>
  )
  if(error) return <Error error={error} />
  return (<UpdateForm sector={res.data} response={response} document_id={document_id} reload={refech} />)
    
}
