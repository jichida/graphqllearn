// import { stringify } from "query-string";
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  // UPDATE_MANY,
  DELETE,
  // DELETE_MANY
} from "react-admin";

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */

  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = `${apiUrl}/${resource}`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        type: type,
        params: params
      })
    };
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    let data = [];
    const { json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        json.docs.forEach(obj => {
          obj.id = obj._id;
          delete obj._id;
          data.push(obj);
        });
        // console.log("GET_LIST|json data:" + JSON.stringify( {
        //     data: data,
        //     total: json.total,
        // }));
        return {
          data: data,
          total: json.total
        };
      case UPDATE:
      case GET_ONE:
      case CREATE:
      case DELETE:
        json.id = json._id;
        delete json._id;
        // console.log("UPDATE| json data:" + JSON.stringify( {data:json}));
        return { data: json };
      case GET_MANY:
        json.forEach(obj => {
          obj.id = obj._id;
          delete obj._id;
          data.push(obj);
        });
        console.log("GET_MANY json data:" + JSON.stringify({ data }));
        return { data };
      default:
        console.log("default json data:" + JSON.stringify(json));
        return json;
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHTTPResponseToREST(response, type, resource, params)
    );
  };
};
