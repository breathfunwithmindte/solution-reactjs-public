import React from 'react'
import { useParams } from 'react-router'
import useMain from '../../../bssl/Context';
import Form from '../../../components/GenericForm/Form';
import useFetch from '../../../bssl/useFetch';
import Error from './comps/Error';


export default function AdminForm() {
  const { sectorname } = useParams();
  const { state, setState } = useMain();

  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/sector/${sectorname}/getinfo-form`);


  if(loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(error) return <Error error={error} />
  return (<Form sector={res.data} reload={refech} />)
    
}
