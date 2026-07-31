import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html'
})
export class TaskFormModalComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saved = new EventEmitter<boolean>();

  taskForm!: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.task?.description || '', [Validators.maxLength(500)]],
      status: [this.task?.status || 'pending', Validators.required]
    });
  }

  get isEditMode(): boolean {
    return !!this.task;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const taskData = this.taskForm.value;

    if (this.isEditMode && this.task) {
      this.taskService.updateTask(this.task.id, taskData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit(true);
        },
        error: (err) => {
          console.error(err);
          this.error = 'Ocurrió un error al actualizar la tarea.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit(false);
        },
        error: (err) => {
          console.error(err);
          this.error = 'Ocurrió un error al crear la tarea.';
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.closeModal.emit();
  }
}
