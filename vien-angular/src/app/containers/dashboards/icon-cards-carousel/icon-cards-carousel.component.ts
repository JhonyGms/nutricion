import { Component, Input, ViewChild } from '@angular/core';
import { GlideComponent } from 'src/app/components/carousel/glide/glide.component';

interface IIconCardItem {
  title: string;
  icon: string;
  value: string;
}

@Component({
  selector: 'app-icon-cards-carousel',
  templateUrl: './icon-cards-carousel.component.html',
})
export class IconCardsCarouselComponent {
  @Input() class = 'icon-cards-row';
  @ViewChild('carousel', { static: false }) carousel: GlideComponent;
  data: IIconCardItem[] = [
    { title: 'Citas prgamadas', icon: 'iconsminds-clock', value: `${4}%` },
    { title: 'Mails pendientes', icon: 'iconsminds-mail-read', value: `${3}%` },
    { title: 'Suplementos', icon: 'iconsminds-basket-coins', value: `${14}%` },
    {
      title: 'dashboards.refund-requests',
      icon: 'iconsminds-arrow-refresh',
      value: `${14}%`,
    },
  ];

  constructor() {}
}
