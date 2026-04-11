import { Controller, Get, Param } from '@nestjs/common';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly stylesService: ThemesService) {}

  @Get(':theme')
  getThemeConfig(@Param('theme') theme: string) {
    return this.stylesService.getThemeConfig(theme);
  }

  @Get()
  getAllThemes() {
    return this.stylesService.getAllThemes();
  }
}
