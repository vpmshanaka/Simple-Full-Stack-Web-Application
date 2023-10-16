import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.entity';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto): Promise<Page> {
    return this.pageService.create(createPageDto);
  }

  @Get()
  findAll(@Query() query): Promise<Page[]> {
    const { _page, _limit, _sort } = query;
    return this.pageService.findAll(_page, _limit, _sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Page> {
    return this.pageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePageDto: CreatePageDto): Promise<Page> {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.pageService.remove(+id);
  }
}
