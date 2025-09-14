import { Component, computed, inject } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-vault',
    templateUrl: './vault.html',
})
export class Vault {
    private authService = inject(AuthService);

    user = computed(() => this.authService.user());
}