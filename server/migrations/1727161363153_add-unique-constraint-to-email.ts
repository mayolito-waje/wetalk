import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addConstraint('user', 'unique_email', {
    unique: 'email',
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.addConstraint('user', 'unique_email', {
    ifExists: true,
  });
}
