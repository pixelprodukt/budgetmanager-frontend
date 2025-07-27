import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MenuBarComponent
    ],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements OnInit {
    @HostBinding('class.dark') classDark = false;

    private authService = inject(AuthService);

    protected title = 'budgetmanager-frontend';
    protected isAuthenticated = false;

    public ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
    }
}
