import { Module } from "@nestjs/common";
import { ProducerService } from "./producer.service";
import { ConsumerService } from "./consumer.service";
import { KafkaInstance } from "./kafka.instance";

@Module({
  providers: [ProducerService, ConsumerService, KafkaInstance],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
