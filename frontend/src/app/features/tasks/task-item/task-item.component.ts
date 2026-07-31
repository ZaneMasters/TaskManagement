import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './task-item.component.html'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{id: number, status: TaskStatus}>();

  get statusColorClass(): string {
    switch (this.task.status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  get statusLabel(): string {
    switch (this.task.status) {
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En Progreso';
      case 'done': return 'Completada';
      default: return 'Desconocido';
    }
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.statusChange.emit({ id: this.task.id, status: select.value as TaskStatus });
  }
}
