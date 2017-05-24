import xFetch from './xFetch';

const server = 'http://127.0.0.1:8778';

/**
 * create、delete、get(show)、update(modify,put)
 * HTTP动词：GET、POST、PUT、PATCH、DELETE
 */

// Debug

export async function apiDemo(){
  return xFetch(server + '/demo', {method: 'GET'});
};
