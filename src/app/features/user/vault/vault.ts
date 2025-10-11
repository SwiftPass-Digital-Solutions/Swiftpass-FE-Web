import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { VaultCard } from "./components/vault-card";

@Component({
    selector: 'app-vault',
    imports: [VaultCard],
    templateUrl: './vault.html',
})
export class Vault implements OnInit{
    private authService = inject(AuthService);

    user = computed(() => this.authService.user());

    vaults = signal<any[]>([]);

    ngOnInit(): void {
        this.vaults.set([
            {
                name: 'Bio Data',
                status: 'Awaiting Approval',
                documentSize: '1.2MB',
                count: 4,
                colors:{ 
                    background: '#EDF3FE'
                }
            }
        ]);
    }
}