export interface Hashing {
  hashPassword(password: string): Promise<string>;
}
