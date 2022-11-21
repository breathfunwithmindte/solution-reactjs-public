import CodeEditor from "../../../../components/CodeEditor";

export default ({ error }) => <div className="bg0" style={{ 
  padding: "3.4rem", width: "99.69%", boxShadow: "inset 1.4px 1.4px 14px 1.14px red", minHeight: "100%"
  }}>
  <h1>[ERROR]</h1>
  <CodeEditor 
    language={"json"}
    height="693px"
    readonly={true}
    value={JSON.stringify( error, null, 2 )}
  />
</div>