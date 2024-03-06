import { Module } from "@nestjs/common";
import { ProducerService } from "./services/producer.service";
import { ConsumerService } from "./services/consumer.service";
import { KafkaInstance } from "./kafka.instance";
import { OpenSearchConsumer } from "./consumers/OpenSearchConsumer";
import { SearchModule } from "../search/search.module";
import { DemoNodeConsumer } from "./consumers/DemoNodeConsumer";

@Module({
  providers: [
    ProducerService,
    ConsumerService,
    KafkaInstance,
    OpenSearchConsumer,
    DemoNodeConsumer,
  ],
  exports: [ProducerService, ConsumerService],
  imports: [SearchModule],
})
export class KafkaModule {}
