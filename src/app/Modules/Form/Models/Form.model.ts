import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { IForm } from "../Interface/Forms.interface";

export class Form {
    FormData: IForm[]
    Form!: FormGroup;
    IsEdit: boolean;
    public formChange: Subject<FormGroup> = new Subject<FormGroup>();

    constructor(isEdit: boolean, formData: IForm[]) {
        this.IsEdit = isEdit;
        this.FormData = formData;

        if (formData && formData.length > 0) {
            this.createForm();
        }
    }

    createForm() {
        this.Form = new FormGroup({});
        for (let item of this.FormData) {
            this.Form.addControl(item.Name, new FormControl(item.DefaultValue ? item.DefaultValue : '', item.IsRequired ? Validators.required : null));
        }

    }

    updateData(isEdit: boolean, formData: IForm[]) {
        this.IsEdit = isEdit;
        this.FormData = formData;
        this.createForm()
    }

    submit() {
        //controlar que el form sea valido
        this.formChange.next(this.Form)
    }

    //Agregar lo de cargar una o varias imagenes.
}