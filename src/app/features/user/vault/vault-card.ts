import { Component, input, OnInit } from "@angular/core";
import darkenColor from "@shared/utils/darkenColor";

@Component({
    selector: 'app-vault-card',
    template: `
        <div 
            [style.background-color]="vault().color" 
            [style.border-color]="borderColor"
            class="relative min-w-[300px] h-[182px] rounded-[20px] border-[0.65px] p-4"
        >
            <div class="flex items-center justify-between">
                <h5 class="font-bold text-lg">{{ vault().name }}</h5>
                <p 
                    class="text-xs px-2 py-1 rounded-[28px]"
                    [style.background-color]="statusBackground"
                    [style.color]="primaryDark"
                >
                    {{ vault().status }}
                </p>
            </div>

            <div class="w-full bottom-4">
                <p class="text-sm text-gray-600 my-3">
                    Size: {{ vault().documentSize }}
                </p>

                <div class="flex gap-1">
                    @for(item of [1,2,3,4]; track $index) {
                        <hr [style.background-color]="$index === 3 ? primaryDark : borderColor">
                    }
                </div>
            </div>
        </div>
    `
})
export class VaultCard implements OnInit {
    vault = input<any>();
    statusBackground = '';
    primaryDark = '';
    borderColor = '';

    ngOnInit(): void {
        this.primaryDark = darkenColor(this.vault().color, 70);
        this.statusBackground = darkenColor(this.vault().color, 30);
        this.borderColor = darkenColor(this.vault().color, 10);
    }
}
