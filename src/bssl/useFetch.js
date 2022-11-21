import { useCallback, useEffect, useState } from "react";
import default_callback from "./default_callback";
import Request from "./Request";


/**
 * @typedef {*} Data
 * @typedef {Object} Error
 * @property {number} status
 * @property {string} description
 * @property {*} data
 * 
 * @typedef {Array} ApiReturn
 * @property {Data} data
 * @property {boolean} loading
 * @property {Error} error
 * @property {string} message
 */

/**
 * @param {string} path 
 * @returns {ApiReturn}
 */
export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const makefetch = async (prop_path) => {
    setLoading(true);
    const default_callback_binded = default_callback.bind({ setData, setLoading, setError });
    await Request.get(prop_path || path, default_callback_binded);
  }

  useEffect(() => {
    makefetch();
  }, [path]);

  const refetch = useCallback((newpath) => {
    return makefetch(newpath || path);
  }, [path]);

  return [data, loading, error, refetch, setData];
}