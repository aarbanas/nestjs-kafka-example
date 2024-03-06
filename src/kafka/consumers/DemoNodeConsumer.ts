import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "../services/consumer.service";

@Injectable()
export class DemoNodeConsumer implements OnModuleInit {
  constructor(private consumerService: ConsumerService) {}
  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ["demo_node"], fromBeginning: true },
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
