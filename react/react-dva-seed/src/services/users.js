import request from '../utils/request';

const server = 'http://127.0.0.1:8778';

export async function showProject(projectId) {
  return request(server + '/api/projects/' + projectId, { method: 'GET' });
}
