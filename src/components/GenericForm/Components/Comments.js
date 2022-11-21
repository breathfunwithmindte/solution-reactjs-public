import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import useMain from '../../../bssl/Context';
import useFetch from '../../../bssl/useFetch';
import FormApiTypes from '../../../types/FormApiTypes';
import Button from "react-bootstrap/Button";
import Request from '../../../bssl/Request';

function Comments({ sector, document_id }) {
  const { state } = useMain();
  const [res, loading, error, refech, setRes] = useFetch(FormApiTypes.ApiTypes.COMMENT_READ(sector, { 
    user: state.user, document_id: document_id
  }));
  const [comment, setComment] = useState("");

console.log(res)
  if(loading) return <p>loading...</p>
  if(!res) return <p>No Response</p>
  return (
    <div className="w-100" style={{position: "relative", height: "75vh", minHeight: 300}}>
      <div className="w-100 bg0 p1" style={{position: "sticky", top: 0, height: 50}} >
        <h2>Comments ({res.data.comments instanceof Array === true ? res.data.comments.length : 0})</h2>
      </div>
      <div className="d-flex f-column al-items-center w-100 px1" style={{height: "calc(100% - 128px)", overflowY:"auto"}}>
        {
          res.data.comments instanceof Array === true && res.data.comments.map((comment, ind) => {
            return (
              <div className="d-flex mb1 py1" style={{border: "1px solid var(--h)", width: "99%"}}>
                <img className="avatar-img" src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" width="56px" height="56px" />
                <div style={{width: "calc(100% - 69px)"}} className="p2">
                  <strong>{comment?.user.username || "@Unknown"}</strong>
                  <pre>{comment.comment}</pre>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="w-100 p1" style={{position: "absolute", bottom: 0, left: 0}}>
        <Form.Control
          as={"textarea"}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
          placeholder="Aa..."
        />
        <hr />
        <Button className="w-250" onClick={async () => {
          await Request.post(FormApiTypes.ApiTypes.COMMENT_WRITE(sector, { user: state.user, document_id }), {
            comment: comment
          }, ({status}) => {
            if(status === 200 || status === 201) {
              setRes(pr => {
                const data = pr.data;
                const newdata = { ...data, comments: data.comments.concat({ user: state.user, comment: comment }) };
                return {...pr, data: newdata}
              })
            }else {
              alert("error");
            }
          })
        }}>Send</Button>
      </div>
    </div>
  )
}

export default Comments;