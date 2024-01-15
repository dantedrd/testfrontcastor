import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadChildren: () => import(`./employee/employee.module`).then((m) => m.EmployeeModule)
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
            paramsInheritanceStrategy: 'always',
            scrollPositionRestoration: 'enabled',
        })
    ],
    exports: [RouterModule],
    bootstrap: [AppComponent],
})
export class AppRoutingModule { }
