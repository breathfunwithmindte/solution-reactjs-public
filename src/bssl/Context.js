import { createContext, useContext, useState, useEffect } from "react"
import Login from "../applications/Login";
import useFetch from "./useFetch";
import { LightStyle } from "./Styles";

const mainContext = createContext();

export const ContextProvider = ({children}) => {

  const [res, loading, error, refech, setRes] = useFetch("/api/v1/user/authenticated");

  const [state, setState] = useState(res ? res.data : { loading: true });

  const [theme, setTheme] = useState(LightStyle);

  useEffect(() => {if(res && res.data) { setState(res.data) } }, [res])

  if(loading) return <p>loading...</p>
  if(!res && error && error.status === 401) return <div className="AppWrapper" style={createStyle(theme?.css)}><Login /></div>
  if(!res) return <p>error...{JSON.stringify(error)}</p>
  if(error) return <p>error...</p>
  if(state.loading) return <p>state loading</p>
  if(!state.user || !state.sectors) return <div className="AppWrapper" style={createStyle(theme?.css)}><Login /></div>
  return (
    <mainContext.Provider value={{ theme, state, setState }}>
      <div className="AppWrapper" style={createStyle(theme?.css)}>{children}</div>
    </mainContext.Provider>
  )
}

export default function useMain () {
  const smth = useContext(mainContext);
  return smth;
}

function createStyle(style) {
  let obj = {};
  if(!style) return {};
  for (const key in style) {
    if (Object.hasOwnProperty.call(style, key)) {
      obj[`--${key}`] = style[key];
    }
  }

  return obj;
}