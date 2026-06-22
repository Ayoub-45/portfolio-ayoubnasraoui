import * as migration_20260622_010610 from './20260622_010610';

export const migrations = [
  {
    up: migration_20260622_010610.up,
    down: migration_20260622_010610.down,
    name: '20260622_010610'
  },
];
