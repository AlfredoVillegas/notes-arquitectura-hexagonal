import { Hashing } from '../../../../src/Modules/User/domain/Hashing';

export class MockHasher implements Hashing {
  private callsToHashPassword = 0;

  hashPassword(password: string): Promise<string> {
    this.callsToHashPassword++;
    return Promise.resolve(password + 'hashered');
  }

  public getCallsToHashPassword(): number {
    return this.callsToHashPassword;
  }
}
