import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { catchError, Observable, of } from 'rxjs';
import { Pessoa } from './model/Pessoa.model';
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
  arr : Observable <Pessoa[]>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private tableService: TablezService, private snackBar:MatSnackBar) {
    this.dataSource = new MyTableDataSource();
    //this.tableService = new TablezService();
    this.arr = this.tableService.list()
      .pipe(        
        catchError( error => {
          console.log(error);
          this.onError(error.message, "X");//, 1000);
          return of([])
        })
      );
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
  handlePage(e: any) {
    //this.currentPage = e.pageIndex;
    //this.pageSize = e.pageSize;
    //this.iterator();
  }
}