import { Module } from "@nestjs/common";
import { ProducerService } from "./producer.service";
import { ConsumerService } from "./consumer.service";
import { KafkaSingleton } from "./kafka.singleton";

@Module({
  providers: [ProducerService, ConsumerService, KafkaSingleton],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
