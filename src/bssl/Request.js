import config from "./config.json"

export default class Request {
  /**
   * @typedef  {string} DOMAIN
   * @typedef  {string} MODE
   * @typedef  {string} GET_METHOD
   * @typedef  {string} POST_METHOD
   * @typedef  {string} PUT_METHOD
   * @typedef  {string} DELETE_METHOD
   *
   * @typedef  {Object} OAUTH_HEADER
   * @property  {string} Content-Type // default "application/json"
   * @property  {string} "authorization"
   *
   * @typedef  {Object} AUTH_HEADER
   * @property  {string} Content-Type // default "application/json"
   * @property  {string} "authentication"
   *
   * @typedef  {Object} HEADER
   * @property  {string} Content-Type // default "application/json"
   *
   * @typedef  {Object} OPTIONS
   * @property  {GET_METHOD | GET_METHOD | GET_METHOD | GET_METHOD} method
   * @property  {OAUTH_HEADER | AUTH_HEADER | HEADER} headers
   * @property  {string | null} body
   */

  /**
   * initial default static variables;
   */
  static DOMAIN = config.mode === "dev" ? config["dev-domain"] : config["prod-domain"];
  static mode = config.mode;

  static OAUTH_HEADER = {
    "Content-Type": "application/json",
    authorization: "Bearer " + Request.get_token(),
  };
  static AUTH_HEADER = {
    "Content-Type": "application/json",
    authentication: "Basic someusername:password",
  };
  static HEADER = {
    "Content-Type": "application/json",
  };
  static GET_METHOD = "GET";
  static POST_METHOD = "POST";
  static PUT_METHOD = "PUT";
  static DELETE_METHOD = "DELETE";

  static get_token ()
  {
    const storage = localStorage.getItem("authentication");
    // ({impersonating: null, master_token: data.data.token, users: []})
    if(!storage) return "";
    const storage_data = JSON.parse(storage);
    if(!storage_data.impersonating) return storage_data.master_token;
    return storage_data.impersonating;
  }

  /**
   * Request methods
   */

  /**
   *
   * @param {string} path
   * @param {callback} cb
   * @returns {void}
   */
  static async get(path, cb) {
    const result = await Request.cfetch(path, {method: Request.GET_METHOD, headers: Request.OAUTH_HEADER});
      await cb(result);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   * @returns {void}
   */
  static async post(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.POST_METHOD, headers: Request.OAUTH_HEADER, body: body ? JSON.stringify(body) : null});
    await cb(result);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   * @returns {void}
   */
  static async put(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.PUT_METHOD, headers: Request.OAUTH_HEADER, body: body ? JSON.stringify(body) : null});
    await cb(result);
  }

  /**
   *
   * @param {string} path
   * @param {callback} cb
   * @returns {void}
   */
  static async delete(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.DELETE_METHOD, headers: Request.OAUTH_HEADER});
    await cb(result);
  }

  /**
   * methods starts with _ mean not authenticated requests
   */

  /**
   *
   * @param {string} path
   * @param {callback} cb
   * @returns {void}
   */
  static async _get(path, cb) {
    const result = await Request.cfetch(path, {method: Request.GET_METHOD, headers: Request.HEADER});
    await cb(result);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   * @returns {void}
   */
  static async _post(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.POST_METHOD, headers: Request.HEADER, body: body ? JSON.stringify(body) : null});
    await cb(result);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   * @returns {void}
   */
  static async _put(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.PUT_METHOD, headers: Request.HEADER, body: body ? JSON.stringify(body) : null});
    await cb(result);
  }

  /**
   *
   * @param {string} path
   * @param {callback} cb
   * @returns {void}
   */
  static async _delete(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.DELETE_METHOD, headers: Request.HEADER});
    await cb(result);
  }

  /**
   * @param  {string} path
   * @param  {OPTIONS} options
   */
  static async cfetch(path, options) {
    try {
      const res = await fetch(Request.DOMAIN + path, {
        method: options.method,
        headers: options.headers,
        body: options.body,
      });
      const content_type = res.headers.get("Content-Type");
      if(content_type.search("application/json") !== -1) {
        return { status: res.status, error: null, response: res, data: await res.json(), content_type: "application/json" }
      }else{
        return { status: res.status, error: null, response: res, data: await res.text(), content_type: "application/text" }
      }
    } catch (error) {
      console.log(error, "\n@error in request::fetch");
      return { status: -1, error: error, response: null, data: null, content_type: "none" };
    }
  }

}