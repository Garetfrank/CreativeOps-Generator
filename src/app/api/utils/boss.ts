type Task = {
  id: string;
  description: string;
  assignedTo: string;
  status: "pending" | "in_progress" | "done" | "review";
  notes?: string;
};

export class Boss {
  private tasks: Task[] = [];
  private recommendations: string[] = [];

  assignTask(description: string, assignedTo: string) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.tasks.push({ id, description, assignedTo, status: "pending" });
    return id;
  }

  updateTaskStatus(id: string, status: Task["status"], notes?: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      if (notes) task.notes = notes;
    }
  }

  reviewTasks() {
    return this.tasks.filter(t => t.status !== "done");
  }

  logRecommendation(rec: string) {
    this.recommendations.push(rec);
  }

  getRecommendations() {
    return this.recommendations;
  }

  reportStatus() {
    return {
      pending: this.tasks.filter(t => t.status === "pending"),
      in_progress: this.tasks.filter(t => t.status === "in_progress"),
      review: this.tasks.filter(t => t.status === "review"),
      done: this.tasks.filter(t => t.status === "done"),
      recommendations: this.recommendations,
    };
  }
} 