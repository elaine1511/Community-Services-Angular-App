import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProviderListsComponent } from './provider-lists/provider-lists.component';
import { AuthGuard } from '../auth.guard';
import { RequestListsComponent } from './request-lists/request-lists.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddComponent,
    ProviderListsComponent,
    RequestListsComponent,
    EditComponent,
    DeleteComponent,
    PostInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'providers', component: ProviderListsComponent, canActivate: [AuthGuard] },
      { path: 'requests', component: RequestListsComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
      { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
      { path: 'delete', component: DeleteComponent, canActivate: [AuthGuard] },
      { path: 'detail', component: PostInfoComponent, canActivate: [AuthGuard] },
    ]),
  ],
  exports: [
    AddComponent,
    ProviderListsComponent,
    RequestListsComponent,
    EditComponent,
    DeleteComponent,
    PostInfoComponent
  ]
})
export class PostsModule { }
