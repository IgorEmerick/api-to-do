export interface ICreateProjectMemberDTO {
  project_id: string;
  user_id: string;
  permission: 'VIEW' | 'EDIT' | 'ADMIN';
}
