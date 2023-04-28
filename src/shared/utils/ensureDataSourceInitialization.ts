import { DataSource } from 'typeorm';

export async function ensureDataSourceInitialization(
  data_source: DataSource,
): Promise<void> {
  if (!data_source.isInitialized) {
    await data_source.initialize();
  }
}
