import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { VaultCard } from "../../../shared/components/vault-card";
import { Button } from "@shared/components/button";

@Component({
    selector: 'app-vault',
    imports: [VaultCard, Button],
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
                documentSize: '1.2mb',
                count: 4,
                color: '#EDF3FE'
            },
            {
                name: 'Identity Document',
                status: 'Pending',
                documentSize: '1.2mb',
                count: 4,
                color: '#FECEEC'
            },
            {
                name: 'Home Address',
                status: 'Pending',
                documentSize: '1.2mb',
                count: 4,
                color: '#FEE2CE'
            },
        ]);
    }
}
