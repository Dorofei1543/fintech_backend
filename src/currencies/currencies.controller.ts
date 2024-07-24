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
  findAll(): Promise<Currency[]> {
    return this.currencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Currency> {
    return this.currencyService.findOne(id);
  }

  @Post()
  create(@Body() currency: Currency): Promise<Currency> {
    return this.currencyService.create(currency);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() currency: Currency): Promise<void> {
    return this.currencyService.update(id, currency);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.currencyService.remove(id);
  }
}
