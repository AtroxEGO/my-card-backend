import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

export type CardVisit = {
  cardID: string;
  requesterID?: string;
  originIP: string;
  countryCode: string;
};

@Injectable()
export class CardAnalyticsService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}
  logger = new Logger(CardAnalyticsService.name);

  async addCardVisit(cardVisitData: CardVisit) {
    await this.prismaService.cardVisit.create({ data: cardVisitData });
    this.logger.debug('Visit was Created!');
  }

  async isOnCooldown({ cardID, originIP, requesterID }: Partial<CardVisit>) {
    const visitCooldown = this.configService.get('analytics.visitCooldown');
    const cooldownDate = new Date();
    cooldownDate.setHours(cooldownDate.getHours() - visitCooldown);

    const visit = await this.prismaService.cardVisit.findFirst({
      where: {
        cardID,
        AND: [{ OR: [{ originIP }, { requesterID }] }],
        createdAt: { gte: cooldownDate },
      },
    });

    return !!visit;
  }
}
