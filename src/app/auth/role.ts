export enum ROLE {
  SUPER_USER = 'SUPER_USER',
  STUDENT = 'STUDENT',
  TEACHER = "TEACHER",
}

export const ROLE_MAPPER = {
  [ROLE.SUPER_USER]: 'SUPER_USER',
  [ROLE.STUDENT]: 'STUDENT',
  [ROLE.TEACHER]: 'TEACHER',
}
// {[char: string]: string}
