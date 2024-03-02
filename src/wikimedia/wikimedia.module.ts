import { Module } from "@nestjs/common";
import { WikimediaService } from "./wikimedia.service";
import { KafkaModule } from "../kafka/kafka.module";

@Module({
  imports: [KafkaModule],
  providers: [WikimediaService],
  exports: [WikimediaService],
})
export class WikimediaModule {}
