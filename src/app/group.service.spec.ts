import { async,TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { GroupService } from './group.service';
import { doesNotThrow } from 'assert';



describe('GroupService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      HttpClientModule
    ]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: GroupService = TestBed.get(GroupService);
    expect(service).toBeTruthy();
  });

  it('should return the name of group', async(() => {
    const service: GroupService = TestBed.get(GroupService);
    service.getgroup('super').subscribe(value=>{
      expect(value[0].name).toEqual('group1');
    })
  }));

  it('should return the name of channel', async(() => {
    const service: GroupService = TestBed.get(GroupService);
    service.getchannel().subscribe(value=>{
      expect(value[0].name).toEqual('a');
    })
  }));
});
