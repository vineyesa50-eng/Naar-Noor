import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories = [
    {
      title: 'Starters',
      image: 'assets/categories/Starters.jpg'
    },
    {
      title: 'Grill & BBQ',
      image: 'assets/cinematic/Grill-BBQ.jpg'
    },
    {
      title: 'Himalayan Mains',
      image: 'assets/categories/Himalayan-Mains.jpg'
    },
    {
      title: 'Cocktails',
      image: 'assets/categories/Cocktails.jpg'
    }
  ];
}
