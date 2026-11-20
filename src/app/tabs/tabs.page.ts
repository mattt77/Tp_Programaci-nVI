import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { helpCircle, list, people } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  constructor() {
    addIcons({ list, people, helpCircle });
  }
}