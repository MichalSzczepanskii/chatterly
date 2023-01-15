import { Module } from '@nestjs/common';
import { ApiCoreFeatureModule } from '@chatterly/api/core-module';

@Module({
  imports: [ApiCoreFeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
