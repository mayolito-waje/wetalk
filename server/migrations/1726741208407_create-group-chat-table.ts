import { ColumnDefinitions, MigrationBuilder, PgType } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('group_chat', {
    id: {
      type: PgType.UUID,
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
      notNull: true,
    },
    name: {
      type: PgType.VARCHAR,
      notNull: true,
    },
    creator: {
      type: PgType.UUID,
      notNull: true,
      references: '"user"',
    },
    createdAt: {
      type: PgType.TIMESTAMP,
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  }, { ifNotExists: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('group_chat', { ifExists: true });
}
