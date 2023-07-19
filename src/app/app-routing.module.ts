import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { NewMomentComponent } from './pages/new-moment/new-moment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'momentos/new', component: NewMomentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
