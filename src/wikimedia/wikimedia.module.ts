import { Module } from '@nestjs/common';
import { WikimediaService } from './wikimedia.service';

@Module({
  providers: [WikimediaService]
})
export class WikimediaModule {}
