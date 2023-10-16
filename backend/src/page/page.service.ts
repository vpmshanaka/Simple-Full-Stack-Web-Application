import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {}

  private async toSlug(title: string): Promise<string> {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const page = new Page();
    page.title = createPageDto.title;
    page.slug = await this.toSlug(createPageDto.title);
    page.content = createPageDto.content;
    return await this.pageRepository.save(page);
  }


  async findAll(page: number, limit: number, sortOrder: string): Promise<Page[]> {
    const skip = (page - 1) * limit;
    const query = this.pageRepository
      .createQueryBuilder('page')
      .skip(skip)
      .take(limit);

    if (sortOrder === 'desc') {
      query.orderBy('page.id', 'DESC');
    } else {
      query.orderBy('page.id', 'ASC');
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Page> {
    return await this.pageRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updatePageDto: CreatePageDto): Promise<Page> {
    if (updatePageDto.title) {
      updatePageDto.slug = await this.toSlug(updatePageDto.title);
    }

    await this.pageRepository.update(id, updatePageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pageRepository.delete(id);
  }
}
