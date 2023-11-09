import { expect } from '@jest/globals';
import { firstValueFrom, Observable, of } from 'rxjs';
import { DataService } from '../../core/data/data.service';
import { PreiseIndexiert } from '../../core/models/preise-indexiert.model';
import { PreiseStromBoerse } from '../../core/models/preise-strom-boerse.model';
import { HistogramLineEntry } from '../../shared/diagrams/histogram/histogram-line/histogram-line.component';
import { PreiseService } from './preise.service';

describe('PreiseService', () => {
    const mockEntries: HistogramLineEntry[] = [
        {
            date: new Date('1995-12-17T03:24:00'),
            values: [42]
        }
    ];

    let service: PreiseService;

    const callServiceMethodTwice = async (func: Observable<any>) => {
        // first call => data service should be called
        await firstValueFrom(func);

        // second call => data should be returned from the cache
        await firstValueFrom(func);
    };

    describe('getPreiseStromBoerse using preisEUR', () => {
        const mockPreisStromBoerse: PreiseStromBoerse = {
            date: '2023-01-01',
            preisEUR: 42
        };

        it('should call DataService only once', async () => {
            const mockDataService = {
                getPreiseStromBoerse: jest.fn(() => of(mockEntries))
            };
            service = new PreiseService(
                (<unknown>mockDataService) as DataService
            );

            await callServiceMethodTwice(service.getPreiseStromBoerse());

            expect(mockDataService.getPreiseStromBoerse).toBeCalledTimes(1);
        });

        it('should map PreiseStromBoerse to HistogramEntry', async () => {
            const mockDataService = {
                getPreiseStromBoerse: jest.fn(() => of([mockPreisStromBoerse]))
            };
            service = new PreiseService(
                (<unknown>mockDataService) as DataService
            );

            const results = await firstValueFrom(
                service.getPreiseStromBoerse()
            );

            expect(results.length).toBe(1);
            expect(results[0].values).toEqual([mockPreisStromBoerse.preisEUR]);
            const resultDate = results[0].date.toISOString().slice(0, 10); // convert parsed date to string yyyy-mm-dd
            expect(resultDate).toEqual(mockPreisStromBoerse.date);
            expect(results[0].band).toBeUndefined();
        });
    });

    describe('methods using preisIndexiert:', () => {
        const mockPreisIndexiert: PreiseIndexiert = {
            date: '2023-01-01',
            preisIndexiert: 42
        };

        const validateIndexierteResults = (
            results: any,
            mockPreisIndexiert: any
        ) => {
            expect(results.length).toBe(1);
            expect(results[0].values).toEqual([
                mockPreisIndexiert.preisIndexiert
            ]);
            const resultDate = results[0].date.toISOString().slice(0, 10); // convert parsed date to string yyyy-mm-dd
            expect(resultDate).toEqual(mockPreisIndexiert.date);
            expect(results[0].band).toBeUndefined();
        };

        describe('getPreiseStromEndverbrauch', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseStromEndverbrauch: jest.fn(() => of(mockEntries))
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseStromEndverbrauch()
                );

                expect(
                    mockDataService.getPreiseStromEndverbrauch
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseStromEndverbrauch to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseStromEndverbrauch: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseStromEndverbrauch()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseGasDayahead', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseGasDayahead: jest.fn(() => of(mockEntries))
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(service.getPreiseGasDayahead());

                expect(mockDataService.getPreiseGasDayahead).toBeCalledTimes(1);
            });

            it('should map getPreiseGasDayahead to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseGasDayahead: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseGasDayahead()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseGasEndverbrauch', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseGasEndverbrauch: jest.fn(() => of(mockEntries))
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseGasEndverbrauch()
                );

                expect(
                    mockDataService.getPreiseGasEndverbrauch
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseGasEndverbrauch to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseGasEndverbrauch: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseGasEndverbrauch()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseHeizoelEntwicklung', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseHeizoelEntwicklung: jest.fn(() => of(mockEntries))
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseHeizoelEntwicklung()
                );

                expect(
                    mockDataService.getPreiseHeizoelEntwicklung
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseHeizoelEntwicklung to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseHeizoelEntwicklung: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseHeizoelEntwicklung()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseTreibstoffBenzin', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseTreibstoffBenzin: jest.fn(() => of(mockEntries))
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseTreibstoffBenzin()
                );

                expect(
                    mockDataService.getPreiseTreibstoffBenzin
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseTreibstoffBenzin to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseTreibstoffBenzin: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseTreibstoffBenzin()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseTreibstoffDiesel', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseTreibstoffDiesel: jest.fn(() => of(mockEntries))
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseTreibstoffDiesel()
                );

                expect(
                    mockDataService.getPreiseTreibstoffDiesel
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseTreibstoffDiesel to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseTreibstoffDiesel: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseTreibstoffDiesel()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseBrennholzEndverbrauch', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseBrennholzEndverbrauch: jest.fn(() =>
                        of(mockEntries)
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseBrennholzEndverbrauch()
                );

                expect(
                    mockDataService.getPreiseBrennholzEndverbrauch
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseBrennholzEndverbrauch to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseBrennholzEndverbrauch: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseBrennholzEndverbrauch()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });

        describe('getPreiseFernwaermeEndverbrauch', () => {
            it('should call DataService only once', async () => {
                const mockDataService = {
                    getPreiseFernwaermeEndverbrauch: jest.fn(() =>
                        of(mockEntries)
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                await callServiceMethodTwice(
                    service.getPreiseFernwaermeEndverbrauch()
                );

                expect(
                    mockDataService.getPreiseFernwaermeEndverbrauch
                ).toBeCalledTimes(1);
            });

            it('should map getPreiseFernwaermeEndverbrauch to HistogramEntry', async () => {
                const mockDataService = {
                    getPreiseFernwaermeEndverbrauch: jest.fn(() =>
                        of([mockPreisIndexiert])
                    )
                };
                service = new PreiseService(
                    (<unknown>mockDataService) as DataService
                );

                const results = await firstValueFrom(
                    service.getPreiseFernwaermeEndverbrauch()
                );

                validateIndexierteResults(results, mockPreisIndexiert);
            });
        });
    });
});
