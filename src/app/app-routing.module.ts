import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { NewMomentComponent } from './pages/new-moment/new-moment.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { EditComponent } from './views/edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'momentos/new', component: NewMomentComponent },
  { path: 'momentos/edit/:id', component: EditComponent },
  { path: 'momentos/:id', component: DetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
