import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { DocsModule } from './modules/docs/docs.module';
import { RegistryModule } from './modules/registry/registry.module';
import { ThemesModule } from './modules/themes/themes.module';

@Module({
  imports: [RegistryModule, ThemesModule, ChatModule, DocsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
