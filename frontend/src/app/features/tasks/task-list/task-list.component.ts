import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, TaskFormModalComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  error: string | null = null;
  
  searchTerm: string = '';
  
  isModalOpen = false;
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filterTasks();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las tareas. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  filterTasks(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTasks = [...this.tasks];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredTasks = this.tasks.filter(task => 
        task.title.toLowerCase().includes(term) || 
        (task.description && task.description.toLowerCase().includes(term))
      );
    }
  }

  onSearchChange(): void {
    this.filterTasks();
  }

  openCreateModal(): void {
    this.taskToEdit = null;
    this.isModalOpen = true;
  }

  openEditModal(task: Task): void {
    this.taskToEdit = task;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.taskToEdit = null;
  }

  onTaskSaved(isEdit: boolean): void {
    this.loadTasks();
    this.closeModal();
    
    Swal.fire({
      title: isEdit ? '¡Tarea actualizada!' : '¡Tarea creada!',
      text: isEdit ? 'La tarea se actualizó exitosamente.' : 'La nueva tarea se guardó exitosamente.',
      icon: 'success',
      confirmButtonColor: '#4f46e5',
      timer: 2000,
      showConfirmButton: false
    });
  }

  onTaskDeleted(taskId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(taskId).subscribe({
          next: () => {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.filterTasks();
            Swal.fire({
              title: '¡Eliminada!',
              text: 'La tarea ha sido eliminada exitosamente.',
              icon: 'success',
              confirmButtonColor: '#4f46e5',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'Ocurrió un error al eliminar la tarea.', 'error');
          }
        });
      }
    });
  }

  onStatusChanged(data: {id: number, status: TaskStatus}): void {
    this.taskService.updateTask(data.id, { status: data.status }).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.filterTasks();
        }
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Estado actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al actualizar el estado',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
}
