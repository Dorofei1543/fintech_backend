import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';

@Controller('currency')
export class CurrenciesController {
  constructor(private readonly currencyService: CurrenciesService) {}

  @Get()
  async findAll(): Promise<Currency[]> {
    const currencies = await this.currencyService.findAll();
    return currencies.map((currency) => ({
      ...currency,
      icon: currency.icon.toString('base64') as unknown as Buffer,
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Currency> {
    return this.currencyService.findOne(id);
  }

  @Post()
  create(
    @Body()
    createCurrencyDto: {
      icon: string;
      priceChange: number;
      price: number;
      name: string;
    },
  ): Promise<Currency> {
    const { icon, priceChange, price, name } = createCurrencyDto;
    const iconBuffer = Buffer.from(icon, 'base64'); // Конвертируйте Base64 строку в Buffer
    return this.currencyService.create({
      icon: iconBuffer,
      priceChange,
      price,
      name,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    updateCurrencyDto: {
      icon: string;
      priceChange: number;
      price: number;
      name: string;
    },
  ): Promise<void> {
    const { icon, priceChange, price, name } = updateCurrencyDto;
    const iconBuffer = Buffer.from(icon, 'base64'); // Конвертируйте Base64 строку в Buffer
    return this.currencyService.update(id, {
      icon: iconBuffer,
      priceChange,
      price,
      name,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.currencyService.remove(id);
  }
}
