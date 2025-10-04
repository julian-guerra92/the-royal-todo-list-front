import { Routes } from '@angular/router';
import { TodoHandlerComponent } from './pages/todo-handler/todo-handler.component';
import { TodoLayoutComponent } from './layouts/TodoLayout/TodoLayout.component';

export const todoRoutes: Routes = [
  {
    path: '',
    component: TodoLayoutComponent,
    children: [
      {
        path: 'general-management',
        component: TodoHandlerComponent,
      },
      {
        path: '**',
        redirectTo: 'general-management',
      }
    ],
  },
];

export default todoRoutes;
