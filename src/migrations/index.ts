import * as migration_20260622_170140 from './20260622_170140';
import * as migration_20260622_171324_create_media_table from './20260622_171324_create_media_table';
import * as migration_20260630_142024 from './20260630_142024';

export const migrations = [
  {
    up: migration_20260622_170140.up,
    down: migration_20260622_170140.down,
    name: '20260622_170140',
  },
  {
    up: migration_20260622_171324_create_media_table.up,
    down: migration_20260622_171324_create_media_table.down,
    name: '20260622_171324_create_media_table',
  },
  {
    up: migration_20260630_142024.up,
    down: migration_20260630_142024.down,
    name: '20260630_142024'
  },
];
