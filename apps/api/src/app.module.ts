import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistryModule } from './registry/registry.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [RegistryModule, ThemesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
