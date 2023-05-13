import { Controller } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';
import { CreateActivityDto, UpdateActivityDto } from './activity.dto'
import { successRes } from 'src/shared/helper/response';

@Crud({
  model: {
    type: ActivityEntity
  },
  dto: {
    create: CreateActivityDto,
    update: UpdateActivityDto,
  },
  routes: {
    exclude: [
        'replaceOneBase', 'createManyBase'
    ]
  }
})

@Controller('activity-groups')
export class ActivityController implements CrudController<ActivityEntity> {
  constructor(public service: ActivityService) { }

  get base(): CrudController<ActivityEntity> {
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
    @ParsedBody() dto: ActivityEntity
  ) {
    const data = await this.base.createOneBase(req, dto);
    return successRes(data)
  }

  @Override('updateOneBase')
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ActivityEntity
  ) {
    const data = await this.base.updateOneBase(req, dto);
    return successRes(data)
  }
}