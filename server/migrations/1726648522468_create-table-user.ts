/* eslint-disable no-useless-escape */
import { ColumnDefinitions, MigrationBuilder, PgType } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension('citext', { ifNotExists: true });

  pgm.sql(`
    CREATE DOMAIN domain_email AS citext
      CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );
  `);

  pgm.createTable('user', {
    id: {
      type: PgType.UUID,
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
      notNull: true,
    },
    email: {
      type: 'domain_email',
      notNull: true,
    },
    username: {
      type: PgType.VARCHAR,
      notNull: true,
    },
    passwordHash: {
      type: PgType.VARCHAR,
      notNull: true,
    },
    profilePicture: PgType.VARCHAR,
    createdAt: {
      type: PgType.TIMESTAMP,
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    isActive: {
      type: PgType.BOOLEAN,
      notNull: true,
      default: true,
    },
    isDeleted: {
      type: PgType.BOOLEAN,
      notNull: true,
      default: false,
    },
  }, { ifNotExists: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('user', { ifExists: true });
  pgm.dropDomain('domain_email', { ifExists: true });
  pgm.dropExtension('citext', { ifExists: true });
}
