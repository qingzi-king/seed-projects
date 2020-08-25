/*
 * @Descripttion: 
 * @Author: qingzi.wang
 * @Date: 2020-07-31 09:25:21
 */
import axios from './request';

export async function getStandardRoles(queryStr) {
  let baseUrl = `/api/standardRoles`;
  if (queryStr) baseUrl += queryStr;
  return axios(baseUrl, 'GET', null); // 获取标准角色
}
export async function getUsers(queryStr) {
  let baseUrl = `/api/users`;
  if (queryStr) baseUrl += queryStr;
  return axios(baseUrl, 'GET', null); // 获取人员
}

export async function getProjects () {
  return axios(`/api/projects`, 'GET', null); // 获取所有项目
}
export async function createProject (datas) {
  return axios(`/api/project`, 'POST', datas); // 创建项目
}
export async function getProject (uuid) {
  return axios(`/api/projects/${uuid}`, 'GET', null); // 获取指定项目
}
export async function modifyProject (uuid, datas) {
  return axios(`/api/projects/${uuid}`, 'PUT', datas); // 修改项目
}
export async function deleteProject (uuid) {
  return axios(`/api/projects/${uuid}`, 'DELETE', null); // 删除项目
}
export async function setProjectPerson (uuid, datas) {
  return axios(`/api/projects/${uuid}/addPerson`, 'POST', datas); // 设置项目成员
}
export async function changeProjectUser (p_uuid, u_uuid, datas) {
  return axios(`/api/projects/${p_uuid}/users/${u_uuid}`, 'POST', datas); // 变更项目成员
}
export async function deleteProjectUser (p_uuid, u_uuid) {
  return axios(`/api/projects/${p_uuid}/users/${u_uuid}`, 'DELETE', null); // 删除项目指定成员
}
export async function getModularAuths() {
  return axios(`/api/modular-auths`, 'GET', null); // 获取模块权限
}