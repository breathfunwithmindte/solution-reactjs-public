import React from 'react'
import { useParams } from 'react-router'
import useMain from '../../../bssl/Context';
import useFetch from '../../../bssl/useFetch';
import Error from './comps/Error';
import SectorCart from '../../../components/Chart/SectorCart';


export default function AdminChart() {
  const { sectorname } = useParams();
  const { state, setState } = useMain();

  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/sector/${sectorname}/getinfo-analyse`);

  if(loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(error) return <Error error={error} />
  if(!res) return <Error error={{ message: "no response" }} />
  if(!res.data) return <Error error={{ message: "no data property on response" }} />
  return (<SectorCart 
    sector={res.data.sector} chart_schema={res.data.schema} chart_data={res.data.data} actions={res.data.actions} reload={refech} 
  />)
    
}
