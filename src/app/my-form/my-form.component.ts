import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TablezService } from '../my-table/services/tablez.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { formatDate, Location } from '@angular/common';
import { Pessoa } from '../my-table/model/Pessoa.model';
import { EMPTY, Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {
  form:FormGroup;
  dateOfBirth:String="";
  //Pessoa[]=[];//Observable<Pessoa[]> = EMPTY;
  editPerson:Pessoa=
  {"id":-1,"nome":"","telefone":"",
  "estadoCivil":"","sexo":"",
  "cpf":"","dataNasc":"","nomeMae":""};
  isEdit:Boolean=false;

  constructor(private formBuilder:FormBuilder,
    private service:TablezService,
    private snackBar:MatSnackBar,
    private location:Location) {
      this.form = this.formBuilder.group({
        nome: [null],
        telefone:[null],
        estadoCivil: [null],
        sexo:[null],
        cpf: [null],
        dataNasc:[null],
        nomeMae: [null],
        })

      if(location.path().includes("edit")){
        this.isEdit=true;
        var register : String = location.path().split('/')[1];
        this.service.getOne(register)
          .subscribe( (ele : any) => { 
            this.editPerson = ele as Pessoa

            this.form = this.formBuilder.group({
                nome: [this.editPerson.nome],
                telefone:[this.editPerson.telefone],
                estadoCivil: [this.editPerson.estadoCivil],
                sexo:[this.editPerson.sexo],
                cpf: [this.editPerson.cpf],
                dataNasc:[this.editPerson.dataNasc],
                nomeMae: [this.editPerson.nomeMae],
              });

          } );
      }
    }

  ngOnInit(): void {
  }

  onSubmit(){
    //this.form.value.dataNasc = this.dateOfBirth;
    this.service.create(this.form.value)
      .subscribe({
        next: () => this.onSucess(),
        error: (e:any) => this.snackBar.open(e, "", {duration:1000 }),
        complete: () => console.info('complete')
    })
  }
  onUpdate(){
    //this.form.value.dataNasc = this.dateOfBirth;
    var register : String = this.location.path().split('/')[1];
    this.service.update(+register,this.form.value)
      .subscribe({
        next: () => this.onSucess(),
        error: (e:any) => this.snackBar.open(e, "", {duration:1000 }),
        complete: () => console.info('complete')
    })
  }
  onSucess(){
    this.snackBar.open("Salvo!", "", {duration:4000 })
    this.location.back();
  }
  
  onCancel(){
    this.location.back();
  }

}
