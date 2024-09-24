import NoDuplicateEmailError from './errors/NoDuplicateEmailError.js';
import ValidEmailError from './errors/ValidEmailError.js';

const dbErrorMapper = (err: Error): Error => {
  switch (err.message) {
    case 'duplicate key value violates unique constraint "unique_email"':
      return new NoDuplicateEmailError('email is already taken');
    case 'value for domain domain_email violates check constraint "domain_email_check"':
      return new ValidEmailError('invalid email format');
    default:
      return err;
  }
};

export default dbErrorMapper;
