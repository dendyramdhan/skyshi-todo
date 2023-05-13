import { Controller, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, ParsedRequest, Override, ParsedBody } from '@nestjsx/crud';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto'
import { successRes } from 'src/shared/helper/response';
import { QueryFailedError } from 'typeorm';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'src/shared/constanta/response';


@Crud({
  model: {
    type: TodoEntity
  },
  dto: {
    create: CreateTodoDto,
    update: UpdateTodoDto
  },
  routes: {
    exclude: [
        'replaceOneBase', 'createManyBase'
    ]
  }
})

@Controller('todo-items')
export class TodoController implements CrudController<TodoEntity> {
  constructor(public service: TodoService) { }

  get base(): CrudController<TodoEntity> {
    return this;
  }

  @Override('getManyBase')
  async getMany(
    @ParsedRequest() req: CrudRequest
  ) {
    const data = await this.base.getManyBase(req);
    return successRes(data)
  }

  @Override('getOneBase')
  async getOne(
    @ParsedRequest() req: CrudRequest
  ) {
    const data = await this.base.getOneBase(req);
    return successRes(data)
  }

  @Override('createOneBase')
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TodoEntity
  ) {
    try {
      const data = await this.base.createOneBase(req, dto);
      return successRes(data)  
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: NOT_FOUND,
          message: `Activity with ID ${error.parameters[0]} Not Found`,
        }, HttpStatus.NOT_FOUND);
      }
      
      throw new InternalServerErrorException({
        status: INTERNAL_SERVER_ERROR,
        message: error.message,
      }); 
    }
  }
}