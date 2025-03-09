import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTypeEnum } from '../../../Other/Enums/input-type-enum';
import { NgSelectModule } from '@ng-select/ng-select';
import { Form } from '../../Models/Form.model';
import { IForm } from '../../Interface/Forms.interface';

@Component({
  selector: 'app-form-general',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './form-general.component.html',
  styleUrl: './form-general.component.css'
})
export class FormGeneralComponent implements OnInit {
  @Input({ required: true }) formInput!: Form
  inputImages!: IForm | undefined

  types = InputTypeEnum

  constructor() { }

  ngOnInit(): void {
    this.inputImages = this.formInput.FormData.find(data => data.Type === InputTypeEnum.Image);

  }

  onSubmit() {
    this.formInput.submit()
  }

  onImageSelected(e: any) { }
  removeImage(index: number) { }

}
