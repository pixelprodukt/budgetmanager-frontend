import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookOpen, CirclePlus, CircleUserRound, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'bm-menu-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LucideAngularModule
],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
    protected readonly userIcon = CircleUserRound;
    protected readonly bookIcon = BookOpen;
    protected readonly plusIcon = CirclePlus;

}
