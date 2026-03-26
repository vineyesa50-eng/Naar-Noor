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
      image: 'assets/Starters.jpg'
    },
    {
      title: 'Grill & BBQ',
      image: 'assets/Grill-BBQ.jpg'
    },
    {
      title: 'Himalayan Mains',
      image: 'assets/Himalayan-Mains.jpg'
    },
    {
      title: 'Cocktails',
      image: 'assets/Cocktails.jpg'
    }
  ];
}
