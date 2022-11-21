import React from 'react';
import { useParams } from 'react-router';
import useMain from '../../../bssl/Context';

function DashboardByGroup(props) {
  const { group_id } = useParams();
  const { state, setState } = useMain();

  const [res, loading, error, refech, setRes] = useFetch(`/api/v1/unsector/dashboard-bygroup/${group_id}`);

  if(loading) return (
    <div>
      <h1>loading ...</h1>
    </div>
  )
  if(error) return (
    <div>table not found error {JSON.stringify(error)}</div>
  )
  return (<Form sector={res.data} reload={refech} />)
}

export default DashboardByGroup;