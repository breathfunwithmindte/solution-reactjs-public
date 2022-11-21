import React from 'react'
import { useParams } from 'react-router'
import useMain from '../../bssl/Context';
import Form from '../../components/GenericForm/Form';
import useFetch from '../../bssl/useFetch';
import SimpleForm from './SimpleForm';
import Error from '../../applications/admin/pages/comps/Error';


export default function NonpageForm({ sectorname }) {
  const { state, setState } = useMain();
  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/sector/${sectorname}/getinfo-simpleform`);

  console.log("NON PAGE FOR RENDERING AND FETCHING");

  if(loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(error) return <Error error={error} />
  return (<SimpleForm sector={res.data} reload={refech} />)
    
}
