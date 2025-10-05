import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-todo-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './TodoLayout.component.html',
})
export class TodoLayoutComponent { }
