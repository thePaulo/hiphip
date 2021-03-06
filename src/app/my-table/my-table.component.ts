import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { catchError, EMPTY, empty, first, Observable, of, tap } from 'rxjs';
import { Pessoa } from './model/Pessoa.model';
import {Responsez} from './model/Responsez.model';
import { MyTableDataSource, MyTableItem } from './my-table-datasource';
import { TablezService } from './services/tablez.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MyTableItem>;
  dataSource: MyTableDataSource;

  //tableService: TablezService;
  //arr : Observable <Pessoa[]>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  currentPage : number = 0;
  arr : Observable<Pessoa[]> = EMPTY;//empty();
  totalElements : number =0;
  pageSize : number = 0;
  sortInfo : Sort ={active:"id",direction:"asc"};
  //content : Observable<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome','cpf','telefone','sexo','estadoCivil','nomeMae','acao'];

  constructor(private tableService: TablezService,
     private snackBar:MatSnackBar,
     private router:Router,
     private activatedRoute:ActivatedRoute) {
    this.dataSource = new MyTableDataSource();
    
    /*
    this.tableService.list(this.currentPage,this.sortInfo)
      .subscribe( (ele : any) => { 
        this.arr = of(ele.content);
        this.totalElements = ele.totalElements;
        this.pageSize = ele.size;
      } );
    */  
    this.tableService.list(this.currentPage,this.sortInfo)
      .subscribe( 
        { 
          next:
          (ele : any) => { 
            this.arr = of(ele.content);
            this.totalElements = ele.totalElements;
            this.pageSize = ele.size;
          },
          error: (e)=> {
            console.log(e),
            this.onError(e.message, "X")
            }, 
      });
      
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }
  onDelete(id:number){
    this.tableService.delete(id)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () =>
         
        this.tableService.list(this.currentPage,this.sortInfo)
        .subscribe( (ele : any) => { 
          this.arr = of(ele.content);
          this.totalElements = this.totalElements-1;
        } )
    }); 
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  onEdit(id:number){
    this.router.navigate([id.toString()+'/edit'], {relativeTo: this.activatedRoute})
  }

  onError(msg:string, action:string){

    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar']
    })
  }

  handleSort(e : Sort){

    this.sortInfo = e;
    this.tableService.list(this.currentPage,e)
      .subscribe( (ele : any) => { 
        this.arr = of(ele.content);
      } );
  }

  handlePage(e:PageEvent) {
    
    this.currentPage= e.pageIndex;
    /*
    this.arr = this.tableService.list(e.pageIndex)
    .pipe(        
      catchError( error => {
        console.log(error);
        this.onError(error.message, "X");//, 1000);
        return of([])
      })
    );
    console.log(e);
    return e;
    */

    this.tableService.list(e.pageIndex,this.sortInfo)
      .subscribe( (ele : any) => { 
        this.arr = of(ele.content);
      } );
  }
}
