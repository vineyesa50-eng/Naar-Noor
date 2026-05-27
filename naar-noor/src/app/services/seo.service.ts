import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

const BASE_TITLE = 'Naar & Noor';
const DEFAULT_DESCRIPTION = 'Authentic Himalayan cuisine with flame-grilled specialties. Reserve your table or order online.';
const DEFAULT_IMAGE = 'https://www.naarnooor.com/assets/hero/hero.webp';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  set(config: SeoConfig): void {
    const fullTitle = config.title === BASE_TITLE
      ? BASE_TITLE
      : `${config.title} | ${BASE_TITLE}`;

    this.titleService.setTitle(fullTitle);

    const desc = config.description ?? DEFAULT_DESCRIPTION;
    const image = config.ogImage ?? DEFAULT_IMAGE;
    const type = config.ogType ?? 'website';

    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    if (config.canonicalUrl) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = config.canonicalUrl;
    }
  }

  setHome(): void {
    this.set({
      title: 'Naar & Noor — Authentic Himalayan Restaurant',
      description: 'Experience Naar & Noor — authentic Himalayan recipes, flame-grilled specialties, and modern dining in a premium atmosphere. Reserve your table or order online.',
      ogType: 'restaurant'
    });
  }

  setCheckout(): void {
    this.set({
      title: 'Checkout',
      description: 'Complete your order at Naar & Noor. Choose collection or delivery and place your Himalayan food order.',
    });
  }

  setOrderConfirmed(): void {
    this.set({
      title: 'Order Confirmed',
      description: 'Your order at Naar & Noor has been received. We will confirm by phone shortly.',
    });
  }
}
