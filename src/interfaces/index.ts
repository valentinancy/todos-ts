export interface ITask {
  isChecked: boolean;
  description: string;
}

export interface IDirectoryTasks {
  [id: string]: ITask;
}
