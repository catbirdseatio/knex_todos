import config from './knexfile.cjs';
import knexConfig from 'knex';


export const knex_db = (environment) => knexConfig(config[environment]);

export default { knex_db };