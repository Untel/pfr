import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LyResizingCroppingImageModule } from 'alyle-ui/resizing-cropping-images';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        LyResizingCroppingImageModule,
        FormsModule,
    ],
    declarations: [
        UserComponent,
    ]
})

export class UserModule {}
