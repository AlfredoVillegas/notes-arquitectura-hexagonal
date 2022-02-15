export class UserEmailAlreadyExists extends Error {
  constructor(email: string) {
    super(`User whit email: ${email} already exists`);
  }
}

export class UserNotExist extends Error {
  constructor(id: string) {
    super(`User whit id: ${id} not exists`);
  }
}
