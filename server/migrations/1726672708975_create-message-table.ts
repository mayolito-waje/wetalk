import { ColumnDefinitions, MigrationBuilder, PgType } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('message', {
    id: {
      type: PgType.UUID,
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
      notNull: true,
    },
    textContent: PgType.VARCHAR,
    imageUrl: PgType.VARCHAR,
    sender: {
      type: PgType.UUID,
      notNull: true,
      references: '"user"',
    },
    parentMessage: {
      type: PgType.UUID,
      references: '"message"',
    },
    createdAt: {
      type: PgType.TIMESTAMP,
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    isDeleted: {
      type: PgType.BOOLEAN,
      notNull: true,
      default: false,
    },
  }, { ifNotExists: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('message', { ifExists: true });
}
