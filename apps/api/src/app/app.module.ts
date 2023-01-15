import { Module } from '@nestjs/common';
import { ApiFeatureConfigModule } from '@chatterly/api/feature-config';

@Module({
  imports: [ApiFeatureConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
