import request from '../utils/request';

const server = 'http://desp.cq-tct.com';

export async function showProject(projectId) {
  return request(server + '/api/projects/' + projectId, { method: 'GET' });
}
