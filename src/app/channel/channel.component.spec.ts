import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChannelComponent } from './channel.component';
import {HttpClientModule} from '@angular/common/http';
import { doesNotThrow } from 'assert';
import { By } from '@angular/platform-browser';

describe('ChannelComponent', () => {
  let component: ChannelComponent;
  let fixture: ComponentFixture<ChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,HttpClientModule
      ],
      declarations: [ ChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the isinchannel function',() =>{
    component.isinchannel();
    expect(component.isinchannel).toBeTruthy();
  })

  it('should call the checkauth function',() =>{
    component.checkauth('group1');
    expect(component.checkauth).toBeTruthy();
  })

  
});
