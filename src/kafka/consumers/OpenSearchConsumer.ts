import { Injectable, OnModuleInit } from "@nestjs/common";
import { SearchService } from "../../search/search.service";
import { ConsumerService } from "../services/consumer.service";

@Injectable()
export class OpenSearchConsumer implements OnModuleInit {
  constructor(
    private readonly openSearchService: SearchService,
    private readonly consumerService: ConsumerService,
  ) {}

  async onModuleInit() {
    await this.openSearchService.createIndex("wikimedia");

    await this.consumerService.consume(
      { topics: ["wikimedia.recentchanges"], fromBeginning: true },
      {
        eachMessage: async ({ topic, partition, message }) => {
          await this.openSearchService.addDocument(
            "wikimedia",
            message.value.toString(),
          );
        },
      },
    );
  }
}
