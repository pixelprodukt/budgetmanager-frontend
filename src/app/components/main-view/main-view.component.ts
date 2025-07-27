import { Component } from '@angular/core';
import { MenuBarComponent } from "../menu-bar/menu-bar.component";

@Component({
    selector: 'bm-main-view',
    imports: [
        MenuBarComponent
    ],
    templateUrl: './main-view.component.html',
    styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
