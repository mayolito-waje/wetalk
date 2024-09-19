import { ColumnDefinitions, MigrationBuilder, PgType } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('message_recipient', {
    id: {
      type: PgType.UUID,
      primaryKey: true,
      notNull: true,
      default: pgm.func('gen_random_uuid()'),
    },
    messageId: {
      type: PgType.UUID,
      notNull: true,
      references: '"message"',
      onDelete: 'CASCADE',
    },
    recipientId: {
      type: PgType.UUID,
      notNull: true,
      references: '"user"',
    },
    groupChatId: {
      type: PgType.UUID,
      references: '"group_chat"',
      onDelete: 'CASCADE',
    },
    isSeen: {
      type: PgType.BOOLEAN,
      notNull: true,
      default: false,
    },
  }, { ifNotExists: true });

  pgm.createIndex('message_recipient', ['messageId', 'recipientId', 'groupChatId'], {
    ifNotExists: true,
    unique: true,
    name: 'ux_message_recipient_messageId_recipientId_groupChatId',
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex('message_recipient', ['messageId', 'recipientId', 'groupChatId'], {
    ifExists: true,
    name: 'ux_message_recipient_messageId_recipientId_groupChatId',
  });

  pgm.dropTable('message_recipient', { ifExists: true });
}
