import { AbstractControl, ValidationErrors } from "@angular/forms";

export function uruguayanDocumentValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const cedula = control.value?.replace(/\D/g, ''); // Remove non-digits

        if(!cedula) return { invalidDocument: 'Document is required' };
        if(cedula.length !== 8) return { invalidDocument: 'Document must be 8 digits' };

        // Get verification digit (last digit)
        const verificationDigit = parseInt(cedula.charAt(cedula.length - 1));

        // Calculate check digit
        const multipliers = [2, 9, 8, 7, 6, 3, 4];
        let sum = 0;

        for(let i = 0; i < 7; i++) {
            sum += parseInt(cedula.charAt(i)) * multipliers[i];
        }

        const calculatedCheckDigit = (10 - (sum % 10)) % 10;

        if(verificationDigit !== calculatedCheckDigit) return { invalidDocument: 'Invalid verification digit' };

        return null;
    };
}