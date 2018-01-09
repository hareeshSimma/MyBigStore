import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EqualValidator } from './shared/directives/equal-validator.directive';

@NgModule({
    imports : [

        CommonModule,
    ],
    declarations : [
        
        EqualValidator,
       
    ],
    providers :  [
    ],
    exports:[EqualValidator]
})
export class validatorModule {}
