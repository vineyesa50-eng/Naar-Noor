import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  private readonly fb     = inject(FormBuilder);
  readonly cart           = inject(CartService);
  private readonly api    = inject(ApiService);
  private readonly router = inject(Router);
  private readonly toast  = inject(ToastService);
  private readonly seo    = inject(SeoService);

  form!: FormGroup;
  submitting = false;

  readonly orderTypes = [
    { value: 'collection', label: 'Takeaway',  sub: 'Pick up in store',           icon: 'solar:bag-5-linear' },
    { value: 'delivery',   label: 'Delivery',  sub: 'Delivered to your door',     icon: 'solar:delivery-linear' },
    { value: 'dine-in',    label: 'Dine-in',   sub: 'Eat at your reserved table', icon: 'solar:tea-cup-linear' }
  ];

  ngOnInit(): void {
    this.seo.setCheckout();
    if (this.cart.isEmpty()) {
      this.router.navigate(['/']);
      return;
    }
    this.form = this.fb.group({
      customerName:         ['', [Validators.required, Validators.minLength(2)]],
      email:                ['', [Validators.required, Validators.email]],
      phoneNumber:          ['', [Validators.required, Validators.minLength(7)]],
      type:                 ['collection', Validators.required],
      deliveryAddress:      [''],
      tableReservationName: [''],
      notes:                ['', Validators.maxLength(300)]
    });

    this.form.get('type')!.valueChanges.subscribe(val => {
      const addr  = this.form.get('deliveryAddress')!;
      const table = this.form.get('tableReservationName')!;

      addr.clearValidators();
      addr.setValue('');
      table.clearValidators();
      table.setValue('');

      if (val === 'delivery') {
        addr.setValidators([Validators.required, Validators.minLength(5)]);
      } else if (val === 'dine-in') {
        table.setValidators([Validators.required, Validators.minLength(2)]);
      }

      addr.updateValueAndValidity();
      table.updateValueAndValidity();
    });
  }

  get orderType(): string { return this.form?.get('type')?.value ?? ''; }
  get isDelivery(): boolean { return this.orderType === 'delivery'; }
  get isDineIn():   boolean { return this.orderType === 'dine-in'; }

  get f() { return this.form.controls; }

  err(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const val = this.form.value;
    this.api.createOrder({
      customerName:         val.customerName,
      email:                val.email,
      phoneNumber:          val.phoneNumber,
      notes:                val.notes || undefined,
      type:                 val.type,
      deliveryAddress:      val.deliveryAddress  || undefined,
      tableReservationName: val.tableReservationName || undefined,
      items: this.cart.items().map(i => ({
        menuItemId:   i.menuItemId,
        menuItemName: i.name,
        unitPrice:    i.price,
        quantity:     i.quantity
      }))
    }).subscribe({
      next: (res) => {
        this.cart.clear();
        this.router.navigate(['/order-confirmed'], { queryParams: { id: res.id } });
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.errors
          ? Object.values(err.error.errors).flat().join('. ')
          : 'Something went wrong. Please try again.';
        this.toast.error(msg as string);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
