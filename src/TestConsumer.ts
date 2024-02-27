import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private consumerService: ConsumerService) {}
  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ["first_topic"], fromBeginning: true },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
