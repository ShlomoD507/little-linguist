import { ComponentFixture, TestBed } from '@angular/core/testing';
import { addCategoryComponent } from './add-category.component';

describe('EditCategoryComponent', () => {
  let component: addCategoryComponent;
  let fixture: ComponentFixture<addCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [addCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(addCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
