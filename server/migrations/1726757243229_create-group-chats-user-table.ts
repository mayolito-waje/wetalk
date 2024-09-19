import { ColumnDefinitions, MigrationBuilder, PgType } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('group_chat_user', {
    id: {
      type: PgType.UUID,
      primaryKey: true,
      notNull: true,
      default: pgm.func('gen_random_uuid()'),
    },
    userId: {
      type: PgType.UUID,
      notNull: true,
      references: '"user"',
    },
    groupChatId: {
      type: PgType.UUID,
      notNull: true,
      references: '"group_chat"',
      onDelete: 'CASCADE',
    },
    joined: {
      type: PgType.TIMESTAMP,
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  }, { ifNotExists: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('group_chat_user', { ifExists: true });
}
