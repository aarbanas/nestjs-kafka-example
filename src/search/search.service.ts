import { Injectable } from "@nestjs/common";
import { OpensearchService } from "@jporter-dev/nestjs-opensearch";

@Injectable()
export class SearchService {
  constructor(private readonly openSearchService: OpensearchService) {}

  async createIndex(indexName: string) {
    const settings = {
      settings: {
        index: {
          number_of_shards: 4,
          number_of_replicas: 3,
        },
      },
    };

    const indexExists = await this.openSearchService.indices.exists({
      index: indexName,
    });
    if (indexExists.statusCode !== 200) {
      return this.openSearchService.indices.create({
        index: indexName,
        body: settings,
      });
    }
  }

  async addDocument(indexName: string, data: any) {
    try {
      const res = await this.openSearchService.index({
        index: indexName,
        body: data,
        refresh: true,
      });

      if (res.statusCode >= 300) throw new Error("Document not created");

      console.log("Document added", res.body._id);
    } catch (e) {
      console.error(e);
    }
  }
}
