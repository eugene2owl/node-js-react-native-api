import { Request, Response } from 'express-serve-static-core';
import { taskService } from "../services/task-service";
import { RequestQueryKeys } from "../middlewares/request-query-middlewares/utils/request-query-keys";

class TaskController {

  async getAll(request: Request, response: Response): Promise<void> {
    const tasks = await taskService.getAll(
      request.query[RequestQueryKeys.PROJECT_ID],
      request.query[RequestQueryKeys.SEARCH_PATTERN],
      request.query[RequestQueryKeys.TASK_STATUS_ID],
      request.query[RequestQueryKeys.EXPIRED_ONLY]
    );
    response.send(tasks);
  }

  async add(request: Request, response: Response): Promise<void> {
    await taskService.add(request.body);
    response.send();
  }

  async getDetails(request: Request, response: Response): Promise<void> {
    const task = await taskService.getDetails(request.params.id);
    response.send(task);
  }

  async getPreCreateData(request: Request, response: Response): Promise<void> {
    const preCreateData = await taskService.getPreCreateData(request.query[RequestQueryKeys.PROJECT_ID]);
    response.send(preCreateData);
  }
}

const taskController = new TaskController();

export { taskController };