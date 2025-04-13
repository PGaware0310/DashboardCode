import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  columns: any[] = [];
  data: any[] = [];
  selectAll: boolean = false;
  currentPage = 1;
itemsPerPage = 10;
isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   setTimeout(() => {
      this.isLoading = false;
      this.fetchData();
    }, 2000);
  }

  fetchData(): void {
    this.http.get<any>('https://01.fy25ey01.64mb.io/').subscribe(response => {
      this.columns = response.grid_columns;
      this.data = response.grid_data.map((user: any) => ({
        ...user,
        selected: false
      }));
    });
    
  }

  toggleSelectAll(): void {
    this.data.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected(): void {
    this.selectAll = this.data.every(user => user.selected);
  }

  getInitials(first: string, last: string): string {
    return `${first?.charAt(0) ?? ''}${last?.charAt(0) ?? ''}`.toUpperCase();
  }
  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }
  
  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  goToPage(page: number) {
    this.currentPage = page;
  }
  
  goToPreviousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
  selectedUser: any = null;

openModal(user: any) {
  this.selectedUser = user;
}

closeModal() {
  this.selectedUser = null;
}
deleteUser(id: string) {
  const confirmDelete = confirm('Are you sure you want to delete this user?');
  if (confirmDelete) {
    this.data = this.data.filter(user => user.id !== id);
  }
}

}
