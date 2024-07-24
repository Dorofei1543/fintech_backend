/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  findAll(): Promise<Currency[]> {
    return this.currencyRepository.find();
  }

  findOne(id: number): Promise<Currency> {
    return this.currencyRepository.findOne({ where: { id } });
  }

  async create(currency: Currency): Promise<Currency> {
    return this.currencyRepository.save(currency);
  }

  async update(id: number, currency: Currency): Promise<void> {
    await this.currencyRepository.update(id, currency);
  }

  async remove(id: number): Promise<void> {
    await this.currencyRepository.delete(id);
  }
}
