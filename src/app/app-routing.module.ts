import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'offers', loadChildren: './pages/offers/offers.module#OffersPageModule' },
  { path: 'book/:id', loadChildren: './pages/detail-book/detail-book.module#DetailBookPageModule' },  
  { path: 'admin/list-books', loadChildren: './pages/admin/list-books/list-books.module#ListBooksPageModule' },
  // { path: 'hero', loadChildren: './pages/hero/hero.module#HeroPageModule' },
  // { path: 'modal', loadChildren: './pages/modal/modal.module#ModalPageModule' },
  // { path: 'navbar', loadChildren: './pages/navbar/navbar.module#NavbarPageModule' },
  // { path: 'page404', loadChildren: './pages/page404/page404.module#Page404PageModule' },
  { path: 'user/login', loadChildren: './pages/users/login/login.module#LoginPageModule' },
  { path: 'user/profile', loadChildren: './pages/users/profile/profile.module#ProfilePageModule' },
  { path: 'user/register', loadChildren: './pages/users/register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
