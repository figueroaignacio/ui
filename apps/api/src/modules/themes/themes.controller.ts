import { Controller, Get, Param } from '@nestjs/common';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly stylesService: ThemesService) {}

  @Get(':theme')
  async getThemeConfig(@Param('theme') theme: string) {
    return await this.stylesService.getThemeConfig(theme);
  }

  @Get()
  async getAllThemes() {
    return await this.stylesService.getAllThemes();
  }
}
