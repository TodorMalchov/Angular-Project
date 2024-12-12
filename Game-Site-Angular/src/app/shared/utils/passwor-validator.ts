import { ValidatorFn } from "@angular/forms";


export function passwordValidator(
    inputPassoword: string,
    inputRePassword: string
): ValidatorFn{
    return(control)=>{
        const passwordControl = control.get(inputPassoword)
        const rePasswordControl = control.get(inputRePassword)

        const isPasswordMatch = passwordControl?.value == rePasswordControl?.value
        return isPasswordMatch ? null :{passwordValidator : true}
    }
}