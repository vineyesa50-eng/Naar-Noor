import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-order-confirmed',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('500ms 200ms cubic-bezier(0.32,0.72,0,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('checkmark', [
      transition(':enter', [
        animate('600ms 100ms ease-out', keyframes([
          style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1.2)', offset: 0.7 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ],
  template: `
    <div class="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-20">
      <div class="text-center max-w-lg w-full">

        <!-- Checkmark -->
        <div @checkmark class="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <iconify-icon icon="solar:check-circle-bold" width="52" class="text-emerald-400"></iconify-icon>
        </div>

        <!-- Content -->
        <div @fadeUp>
          <span class="text-[#C65A1E] text-xs font-medium tracking-[0.2em] uppercase mb-3 block">Confirmed</span>
          <h1 class="font-['Forum'] text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Order Received!
          </h1>
          <p class="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            Thank you for your order. Our team will review it and confirm by phone shortly.
          </p>

          <!-- Order ID -->
          <div *ngIf="orderId" class="mt-8 inline-flex items-center gap-2 px-4 py-2.5 bg-[#111] border border-white/5 rounded-xl">
            <iconify-icon icon="solar:tag-linear" width="16" class="text-neutral-500"></iconify-icon>
            <span class="text-xs text-neutral-500">Order reference</span>
            <span class="text-xs text-white font-medium font-mono">{{ shortId }}</span>
          </div>

          <!-- What happens next -->
          <div class="mt-10 bg-[#111] border border-white/5 rounded-2xl p-6 text-left space-y-4">
            <h3 class="text-sm font-medium text-neutral-300 mb-4">What happens next</h3>
            <div *ngFor="let step of steps; let i = index" class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-[#C65A1E]/10 border border-[#C65A1E]/20 flex items-center justify-center shrink-0 mt-0.5">
                <span class="text-[10px] font-bold text-[#C65A1E]">{{ i + 1 }}</span>
              </div>
              <div>
                <p class="text-sm text-white">{{ step.title }}</p>
                <p class="text-xs text-neutral-500 mt-0.5">{{ step.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button (click)="goHome()"
                    class="w-full sm:w-auto px-8 py-3.5 text-sm font-medium text-[#0a0a0a] bg-white rounded-xl hover:bg-[#C65A1E] hover:text-white hover:shadow-[0_0_20px_rgba(198,90,30,0.35)] transition-all duration-300">
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class OrderConfirmedComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  orderId: string | null = null;
  shortId = '';

  readonly steps = [
    { title: 'We review your order', desc: 'Our kitchen team looks over your items and confirms availability.' },
    { title: 'You get a call', desc: "We'll ring you on the number provided to confirm and arrange payment." },
    { title: 'Your food is prepared', desc: 'Freshly made with Himalayan care, ready for collection or delivery.' }
  ];

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setOrderConfirmed();
    this.orderId = this.route.snapshot.queryParamMap.get('id');
    if (this.orderId) {
      this.shortId = this.orderId.split('-')[0].toUpperCase();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
