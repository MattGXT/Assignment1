import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GroupComponent } from './group.component';
import {HttpClientModule} from '@angular/common/http';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,HttpClientModule
      ],
      declarations: [ GroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with a isadmin as false', () => {
    expect(component.isadmin).toEqual(false);
  });

  it('should start with a isadmin as false', () => {
    expect(component.isassis).toEqual(false);
  });
});
