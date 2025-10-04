import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/Navbar/Navbar.component";
import { ModalButtonComponent } from "../../components/modal-button/modal-button.component";

@Component({
  selector: 'app-todo-layout',
  imports: [RouterOutlet, NavbarComponent, ModalButtonComponent],
  templateUrl: './TodoLayout.component.html',
})
export class TodoLayoutComponent { }
