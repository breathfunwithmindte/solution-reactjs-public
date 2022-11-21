// const callback_binded = default_callback.bind({setData, setLoading, setError, good_status: [201], bad_status: [200]})


export default function default_callback({
  status,
  error,
  response,
  data,
  content_type
}) {
  const { setLoading, setData, setError } = this;
  const statuses_good = this.good_status || [200, 201, 202];
  const statuses_bad = this.bad_status || [400, 401, 403, 404, 500, 501];
  const msg_keyword = this.msg_keyword || "message";

  if (status === -1) {
    setLoading(false);
    setData(null);
    setError({ status: status, description: error.toString(), data: null });
    console.log(error);
    return;
  }

  if (
    !statuses_good.some((s) => s === status) &&
    !statuses_bad.some((s) => s === status)
  ) {
    alert("FATAL ERROR | " + status + "\n unsupported status response.");
    return;
  }

  /**
   * @doc catch good request response like 200, 201 etc ...
   * the message of the response is based on the keyword
   */
  if (statuses_good.some((s) => s === status)) {
    setLoading(false);
    setData(data);
    setError(null);
    return;
  }

  /**
   * @doc catch bad request response like 400, 401 etc ...
   * the description of the error is based on the keyword
   */
  if (statuses_bad.some((s) => s === status)) {
    setLoading(false);
    setData(null);
    setError({ status: status, description: data[msg_keyword] || JSON.stringify(data), data: data });
    return;
  }
}