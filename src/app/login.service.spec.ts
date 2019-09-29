import { TestBed, async } from '@angular/core/testing';

import { LoginService } from './login.service';
import { doesNotThrow } from 'assert';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('should return the name of channel', async(() => {
    const service: LoginService = TestBed.get(LoginService);
    service.login();
    service.logined((res)=>{
      expect(res).toBe('promise value');
    })
  }));
});
