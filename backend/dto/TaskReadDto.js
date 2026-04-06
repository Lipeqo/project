class TaskReadDto {
  constructor(task) {
    this.id = task.id;
    this.name = task.name;
  }
}

module.exports = TaskReadDto;