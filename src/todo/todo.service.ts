import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NOT_FOUND } from 'src/shared/constanta/response';

@Injectable()
export class TodoService extends TypeOrmCrudService<TodoEntity>{
  constructor(@InjectRepository(TodoEntity) repo) {
    super(repo)
  }

  async getOneOrFail(req, shallow = false, withDeleted = false) {const { parsed, options } = req;
    const builder = shallow
        ? this.repo.createQueryBuilder(this.alias)
        : await this.createBuilder(parsed, options, true, withDeleted);
    if (shallow) {
        this.setSearchCondition(builder, parsed.search);
    }
    const found = withDeleted
        ? await builder.withDeleted().getOne()
        : await builder.getOne();
    if (!found) {
        this.throwNotFoundException(parsed.paramsFilter[0].value);
    }
    return found;
}

  throwNotFoundException(id: any): HttpException {
    throw new HttpException({
      status: NOT_FOUND,
      message: `Todo with ID ${id} Not Found`,
    }, HttpStatus.NOT_FOUND);
  }
}