import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersComponent } from './users.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('UsersComponent', () => {

  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let compiled: any;
  let selectType: any;
  let filterText: any;

  const pushInputValue = async (el: any, value: any) => {
    el.value = value;
    el.dispatchEvent(new Event('change'));
    el.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const pushDropdownValue = async (el:any, value:any) => {
    el.value = value;
    el.dispatchEvent(new Event('change'));
    el.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],

    }).compileComponents();

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    component.userData = userData;
    selectType = getByTestId('select-type');
    filterText = getByTestId('filter-input');
    fixture.detectChanges();
  });

  it('Initial UI is rendered as expected', async (done) => {
    fixture.detectChanges();
    expect(filterText.value).toBeFalsy();
    expect(selectType.value).toBe('name');
    fixture.whenStable().then(() => {
      const rowDebugElements = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rowDebugElements.length).toBe(5);
    });
    done();
  });

  it('Default selected option dropdown', async () => {
    const selectEl = fixture.debugElement.query(By.css('select'));
    expect(selectEl.nativeElement.value).toEqual('name');
  });

  it('Default filter with no search result', async (done) => {
    await pushInputValue(filterText, "xzlkan");
    fixture.whenStable().then(() => {
      let rowDebugElements = fixture.nativeElement.querySelectorAll('tbody tr');
      let row = rowDebugElements[0];
      expect(row.cells[0].innerHTML).toBe("No Result Found");
    });
    done();
  });

  it('Default filter search result', async (done) => {
    await pushInputValue(filterText, "Leanne");
    fixture.whenStable().then(() => {
      const rowDebugElements = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rowDebugElements.length).toBe(1);
      let row = rowDebugElements[0];
      expect(row.cells[0].innerHTML).toBe("Leanne Graham");
    });
    done();
  });

  it('Custom column type filter search result', async (done) => {
    await pushDropdownValue(selectType, "email");
    await pushInputValue(filterText, "Shanna@melissa.tv");
    fixture.whenStable().then(() => {
      const selectEl = fixture.debugElement.query(By.css('select'));
      expect(selectEl.nativeElement.value).toEqual('email');
      const rowDebugElements = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rowDebugElements.length).toBe(1);
      let row = rowDebugElements[0];
      expect(row.cells[0].innerHTML).toBe("Ervin Howell");
    });
    done();
  });
 


  const userData = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "address": {
        "street": "Hoeger Mall",
        "suite": "Apt. 692",
        "city": "South Elvis",
        "zipcode": "53919-4257",
        "geo": {
          "lat": "29.4572",
          "lng": "-164.2990"
        }
      },
      "phone": "493-170-9623 x156",
      "website": "kale.biz",
      "company": {
        "name": "Robel-Corkery",
        "catchPhrase": "Multi-tiered zero tolerance productivity",
        "bs": "transition cutting-edge web services"
      }
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "address": {
        "street": "Skiles Walks",
        "suite": "Suite 351",
        "city": "Roscoeview",
        "zipcode": "33263",
        "geo": {
          "lat": "-31.8129",
          "lng": "62.5342"
        }
      },
      "phone": "(254)954-1289",
      "website": "demarco.info",
      "company": {
        "name": "Keebler LLC",
        "catchPhrase": "User-centric fault-tolerant solution",
        "bs": "revolutionize end-to-end systems"
      }
    }
  ]

});
