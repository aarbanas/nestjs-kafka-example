import { Injectable, OnModuleInit } from "@nestjs/common";
import { SearchService } from "../../search/search.service";
import { ConsumerService } from "../services/consumer.service";

@Injectable()
export class OpenSearchConsumer implements OnModuleInit {
  constructor(
    private readonly openSearchService: SearchService,
    private readonly consumerService: ConsumerService,
  ) {}

  private extractId(data: any): string {
    const dataObj = JSON.parse(data);
    return dataObj.meta.id;
  }

  async onModuleInit() {
    await this.openSearchService.createIndex("wikimedia");

    await this.consumerService.consume(
      { topics: ["wikimedia.recentchanges"], fromBeginning: true },
      {
        eachMessage: async ({ topic, partition, message }) => {
          await this.openSearchService.addDocument(
            this.extractId(message.value.toString()),
            "wikimedia",
            message.value.toString(),
          );
        },
      },
    );
  }
}
