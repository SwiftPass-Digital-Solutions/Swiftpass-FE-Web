import { Component, input } from "@angular/core";

@Component({
    selector: 'app-vault-card',
    template: `
        <div class="min-w-[300px] h-[182px] rounded-[20px] border-[0.65px] p-4">
            <div>
                <h5 class="font-bold text-xl">{{ vault.name }}</h5>
                <p class="text-[12px]">{{ vault.status }}</p>
            </div>
            </div>
        </div>
    `
})
export class VaultCard {
    vault = input();
}