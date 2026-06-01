# 🎨 Frontend Development Guide

Complete guide to developing the **Naar & Noor** Angular frontend application.

---

## 🚀 Quick Start

### Installation

```bash
cd naar-noor
npm install
```

### Development Server

```bash
npm run dev
```

✅ **Application running at:** `http://localhost:5000`

The app will automatically reload when you save changes to source files.

### Production Build

```bash
npm run build
```

Build artifacts are stored in `dist/lost-yeti/browser/`

---

## 📁 Project Structure

For detailed project structure and file organization, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

---

## 🧩 Components

### Component Architecture

Each component follows Angular's standalone component pattern:

```
component-name/
├── component-name.component.ts      # Logic and state
├── component-name.component.html    # Template
└── component-name.component.css     # Scoped styles
```

### Creating Components

```bash
ng generate component components/my-component
```

### Component Example\n\n```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent implements OnInit {
  title = 'My Component';

  constructor() {}

  ngOnInit(): void {
    // Component initialization logic
  }
}
```

---

## 🔌 Services

### API Service

The `api.service.ts` centralizes all HTTP communication with the backend API.\n\n```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Chefs
  getChefs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chefs`);
  }

  // Menu Items
  getMenuItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu`);
  }

  // Reservations
  createReservation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, data);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations`);
  }

  // Reviews
  getReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`);
  }

  // Contact
  submitContact(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, data);
  }
}
```

### Creating Services

```bash
ng generate service services/my-service
```

---

## 🎨 Styling with Tailwind CSS

### Configuration

Tailwind CSS is configured in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Usage in Templates\n\n```html
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    Click Me
  </button>
</div>
```

### Custom Component Classes

Define reusable classes in `styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

---

## 🛣️ Routing

Routes are defined in `app.routes.ts`:\n\n```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - Naar & Noor'
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'Menu - Naar & Noor'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

---

## 📊 Data Management

### Static Data

Static data is stored in the `data/` directory:\n\n```typescript
// data/menu.data.ts
export const MENU_ITEMS = [
  {
    id: 1,
    name: 'Tandoori Chicken',
    description: 'Grilled chicken marinated in yogurt and spices',
    price: 14.99,
    category: 'Mains',
    imageUrl: '/assets/menu/tandoori-chicken.jpg'
  },
  {
    id: 2,
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato sauce',
    price: 13.99,
    category: 'Mains',
    imageUrl: '/assets/menu/butter-chicken.jpg'
  }
];
```

### Using Static Data

```typescript
import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../data/menu.data';

export class MenuComponent {
  items = MENU_ITEMS;
}
```

---

## 📝 Forms

### Reactive Forms\n\n```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

export class ReservationComponent {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      guestName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      reservationDate: ['', Validators.required],
      numberOfGuests: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      specialRequests: ['']
    });
  }

  submit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.apiService.createReservation(this.form.value).subscribe({
        next: (response) => {
          console.log('Reservation created:', response);
          this.form.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          this.isSubmitting = false;
        }
      });
    }
  }
}
```

### Form Template

```html
<form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-1">Name</label>
    <input 
      formControlName="guestName" 
      type="text"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Your name"
    />
  </div>
  
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input 
      formControlName="email" 
      type="email"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="your@email.com"
    />
  </div>
  
  <button 
    type="submit" 
    [disabled]="!form.valid || isSubmitting"
    class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
  >
    {{ isSubmitting ? 'Submitting...' : 'Submit Reservation' }}
  </button>
</form>
```

---

## 🔐 HTTP Interceptors

Create interceptors for common HTTP operations:\n\n```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        console.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
```

---

## ✅ Best Practices

| Practice | Description |
|----------|-------------|
| **Component Reusability** | Create small, focused, reusable components |
| **Service Injection** | Use dependency injection for all services |
| **Reactive Programming** | Leverage RxJS observables for async operations |
| **Type Safety** | Always define TypeScript interfaces and types |
| **Error Handling** | Implement comprehensive error handling |
| **Performance** | Use OnPush change detection when possible |
| **Accessibility** | Use semantic HTML and ARIA attributes |
| **Code Organization** | Follow Angular style guide conventions |

---

## 🧪 Testing

### Running Tests

```bash
ng test
```

### Unit Test Example\n\n```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toBe('My Component');
  });
});
```

---

## 🐛 Debugging

### Browser DevTools

1. Press **F12** to open Chrome DevTools
2. Navigate to **Sources** tab
3. Set breakpoints by clicking line numbers
4. Use **Console** for logging and debugging

### Angular DevTools

Install [Angular DevTools](https://angular.io/guide/devtools) browser extension for:
- Component tree inspection
- Change detection profiling
- Dependency injection debugging

---

## ⚡ Performance Optimization

| Technique | Description |
|-----------|-------------|
| **Lazy Loading** | Load feature modules only when needed |
| **OnPush Change Detection** | Reduce change detection cycles |
| **Unsubscribe Observables** | Prevent memory leaks |
| **TrackBy Functions** | Optimize *ngFor rendering |
| **Production Build** | Enable minification and tree-shaking |
| **Image Optimization** | Use WebP format and lazy loading |

### Example: TrackBy Function

```typescript
trackByItem(index: number, item: any): number {
  return item.id;
}
```

```html
<div *ngFor="let item of items; trackBy: trackByItem">
  {{ item.name }}
</div>
```

---

## 🔗 Useful Resources

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Need Help?** Check the [Troubleshooting Guide](./TROUBLESHOOTING.md) or [API Documentation](./API.md).