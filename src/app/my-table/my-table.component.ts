import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { catchError, empty, Observable, of } from 'rxjs';
import { Pessoa } from './model/Pessoa.model';
import {Responsez} from './model/Responsez.model';
import { MyTableDataSource, MyTableItem } from './my-table-datasource';
import { TablezService } from './services/tablez.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';


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
  arr : Observable<Pessoa[]> = empty();
  totalElements : number =0;
  pageSize : number = 0;
  //content : Observable<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private tableService: TablezService, private snackBar:MatSnackBar) {
    this.dataSource = new MyTableDataSource();
    
    this.tableService.list(0)
      .subscribe( (ele : any) => { 
        this.arr = of(ele.content);
        this.totalElements = ele.totalElements;
        this.pageSize = ele.size;
      } );

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }

  /*
  onError(msg:string, action:string, duration:number){
    this.snackBar.open(msg, action, {
      duration:duration
    })
  }
  */
  onError(msg:string, action:string){

    this.snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar']
    })
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

    this.tableService.list(e.pageIndex)
      .subscribe( (ele : any) => { 
        this.arr = of(ele.content);
      } );
  }
}
